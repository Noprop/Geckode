import { useEffect, useRef } from "react";
import * as Y from "yjs";
import { useGeckodeStore } from "@/stores/geckodeStore";
import { Tilemap } from "@/stores/slices/types";
import { useYjs } from "./useYjs";
import { getYDoc } from "./useWorkspaceSync";
import { EventBus } from "@/phaser/EventBus";

type YTilemap = Y.Map<any>;
type YTilemapRows = Y.Array<Y.Array<string | null>>;

const createYRow = (row: (string | null)[]) => {
  const yRow = new Y.Array<string | null>();
  if (row.length) yRow.push(row);
  return yRow;
};

const ensureYRows = (tilemapMap: YTilemap): YTilemapRows => {
  const existing = tilemapMap.get("data");
  if (existing instanceof Y.Array) return existing as YTilemapRows;

  const rows = new Y.Array<Y.Array<string | null>>();
  tilemapMap.set("data", rows);
  return rows;
};

const writeTilemapRows = (rows: YTilemapRows, data: (string | null)[][]) => {
  if (rows.length) rows.delete(0, rows.length);
  data.forEach((row) => rows.push([createYRow(row)]));
};

const upsertTilemapMap = (tilemapsMap: Y.Map<YTilemap>, tilemapId: string): YTilemap => {
  const existing = tilemapsMap.get(tilemapId);
  if (existing instanceof Y.Map) return existing as YTilemap;

  const created = new Y.Map<any>();
  tilemapsMap.set(tilemapId, created);
  return created;
};

const toYTilemap = (tilemapId: string, tilemap: Tilemap): YTilemap => {
  const tilemapMap = new Y.Map<any>();
  writeTilemapMeta(tilemapMap, tilemapId, tilemap);
  const rows = ensureYRows(tilemapMap);
  writeTilemapRows(rows, tilemap.data);
  return tilemapMap;
};

const isLegacyTilemap = (value: unknown): value is Tilemap => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Tilemap>;
  return Array.isArray(candidate.data) && typeof candidate.tilesetId === "string";
};

const writeTilemapMeta = (
  tilemapMap: YTilemap,
  tilemapId: string,
  tilemap: Pick<Tilemap, "id" | "name" | "width" | "height" | "tilesetId" | "base64">,
) => {
  tilemapMap.set("id", tilemap.id ?? tilemapId);
  tilemapMap.set("name", tilemap.name);
  tilemapMap.set("width", tilemap.width);
  tilemapMap.set("height", tilemap.height);
  tilemapMap.set("tilesetId", tilemap.tilesetId);
  tilemapMap.set("base64", tilemap.base64);
};

const readTilemapFromY = (tilemapId: string, tilemapMap: YTilemap): Tilemap | null => {
  const dataRows = tilemapMap.get("data");
  if (!(dataRows instanceof Y.Array)) return null;

  const data = dataRows.toArray().map((row) => (
    row instanceof Y.Array
      ? row.toArray() as (string | null)[]
      : []
  ));

  return {
    id: String(tilemapMap.get("id") ?? tilemapId),
    name: String(tilemapMap.get("name") ?? tilemapId),
    width: Number(tilemapMap.get("width") ?? 0),
    height: Number(tilemapMap.get("height") ?? data.length),
    tilesetId: String(tilemapMap.get("tilesetId") ?? ""),
    base64: String(tilemapMap.get("base64") ?? ""),
    data,
  };
};

const readTilemapsFromY = (tilemapsMap: Y.Map<YTilemap>): Record<string, Tilemap> => {
  const tilemaps: Record<string, Tilemap> = {};
  tilemapsMap.forEach((value, key) => {
    if (!(value instanceof Y.Map)) return;
    const tilemap = readTilemapFromY(key, value as YTilemap);
    if (!tilemap) return;
    tilemaps[key] = tilemap;
  });
  return tilemaps;
};

export const useTilemapSync = (documentName: string) => {
  const { doc, isSynced, onSynced } = useYjs(documentName);
  const tilemapsMap = doc.getMap<YTilemap>("tilemaps");
  const remoteEmitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!tilemapsMap) return;
    const REMOTE_TILEMAP_EMIT_DEBOUNCE_MS = 150;

    const emitRemoteTilemapUpdateDebounced = () => {
      if (remoteEmitTimeoutRef.current) {
        clearTimeout(remoteEmitTimeoutRef.current);
      }
      remoteEmitTimeoutRef.current = setTimeout(() => {
        remoteEmitTimeoutRef.current = null;
        EventBus.emit("update-tilemap");
      }, REMOTE_TILEMAP_EMIT_DEBOUNCE_MS);
    };

    const handleSync = () => {
      const storeState = useGeckodeStore.getState();

      // If remote tilemaps already exist, they become source of truth.
      if (tilemapsMap.size > 0) {
        doc.transact(() => {
          tilemapsMap.forEach((value, id) => {
            if (value instanceof Y.Map) return;
            if (!isLegacyTilemap(value)) return;
            tilemapsMap.set(id, toYTilemap(id, value));
          });
        }, doc.clientID);

        useGeckodeStore.setState({ tilemaps: readTilemapsFromY(tilemapsMap) });
        EventBus.emit("update-tilemap");
      } else {
        // Seed current local defaults to shared doc once.
        doc.transact(() => {
          Object.entries(storeState.tilemaps).forEach(([id, tilemap]) => {
            tilemapsMap.set(id, toYTilemap(id, tilemap));
          });
        }, doc.clientID);
      }

      const observer = (events: Y.YEvent<any>[], transaction: Y.Transaction) => {
        if (transaction.origin === doc.clientID) return;
        if (!events.length) return;
        useGeckodeStore.setState({ tilemaps: readTilemapsFromY(tilemapsMap) });
        emitRemoteTilemapUpdateDebounced();
      };

      tilemapsMap.observeDeep(observer);

      return () => {
        tilemapsMap.unobserveDeep(observer);
        if (remoteEmitTimeoutRef.current) {
          clearTimeout(remoteEmitTimeoutRef.current);
          remoteEmitTimeoutRef.current = null;
        }
      };
    };

    const cleanup = onSynced(handleSync);

    if (isSynced()) {
      const observerCleanup = handleSync();
      return () => {
        cleanup();
        observerCleanup?.();
      };
    }

    return () => {
      cleanup();
      if (remoteEmitTimeoutRef.current) {
        clearTimeout(remoteEmitTimeoutRef.current);
        remoteEmitTimeoutRef.current = null;
      }
    };
  }, [tilemapsMap, doc, isSynced, onSynced]);
};

export const setTilemapMetaSync = (
  tilemapId: string,
  updates: Partial<Pick<Tilemap, "id" | "name" | "width" | "height" | "tilesetId" | "base64">>,
) => {
  const doc = getYDoc();
  if (!doc) return;

  const tilemapsMap = doc.getMap<YTilemap>("tilemaps");
  if (!tilemapsMap) return;

  doc.transact(() => {
    const tilemapMap = upsertTilemapMap(tilemapsMap, tilemapId);
    if (!(tilemapMap.get("data") instanceof Y.Array)) {
      const local = useGeckodeStore.getState().tilemaps[tilemapId];
      const rows = ensureYRows(tilemapMap);
      if (local) {
        writeTilemapMeta(tilemapMap, tilemapId, local);
        writeTilemapRows(rows, local.data);
      }
    }
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) tilemapMap.set(key, value);
    });
  }, doc.clientID);
};

export const setTilemapCellSync = (
  tilemapId: string,
  row: number,
  col: number,
  tileKey: string | null,
) => {
  const doc = getYDoc();
  if (!doc) return;

  const tilemapsMap = doc.getMap<YTilemap>("tilemaps");
  if (!tilemapsMap) return;

  doc.transact(() => {
    const tilemapMap = upsertTilemapMap(tilemapsMap, tilemapId);
    const local = useGeckodeStore.getState().tilemaps[tilemapId];
    if (local) writeTilemapMeta(tilemapMap, tilemapId, local);
    const rows = ensureYRows(tilemapMap);
    if (rows.length === 0 && local) writeTilemapRows(rows, local.data);

    while (rows.length <= row) rows.push([new Y.Array<string | null>()]);
    const yRow = rows.get(row);
    if (!(yRow instanceof Y.Array)) return;

    while (yRow.length <= col) yRow.push([null]);
    yRow.delete(col, 1);
    yRow.insert(col, [tileKey]);
  }, doc.clientID);
};

export const setTilemapDataSync = (tilemapId: string, tilemap: Tilemap) => {
  const doc = getYDoc();
  if (!doc) return;

  const tilemapsMap = doc.getMap<YTilemap>("tilemaps");
  if (!tilemapsMap) return;

  doc.transact(() => {
    const tilemapMap = upsertTilemapMap(tilemapsMap, tilemapId);
    writeTilemapMeta(tilemapMap, tilemapId, tilemap);
    const rows = ensureYRows(tilemapMap);
    writeTilemapRows(rows, tilemap.data);
  }, doc.clientID);
};
