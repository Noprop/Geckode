import { useEffect } from "react";
import * as Y from "yjs";
import { useGeckodeStore } from "@/stores/geckodeStore";
import { Tileset } from "@/stores/slices/types";
import { useYjs } from "./useYjs";
import { getYDoc } from "./useWorkspaceSync";

type YTileset = Y.Map<any>;
type YTilesetRows = Y.Array<Y.Array<string | null>>;

const createYRow = (row: (string | null)[]) => {
  const yRow = new Y.Array<string | null>();
  if (row.length) yRow.push(row);
  return yRow;
};

const ensureYRows = (tilesetMap: YTileset): YTilesetRows => {
  const existing = tilesetMap.get("data");
  if (existing instanceof Y.Array) return existing as YTilesetRows;

  const rows = new Y.Array<Y.Array<string | null>>();
  tilesetMap.set("data", rows);
  return rows;
};

const writeTilesetRows = (rows: YTilesetRows, data: (string | null)[][]) => {
  if (rows.length) rows.delete(0, rows.length);
  data.forEach((row) => rows.push([createYRow(row)]));
};

const writeTilesetMeta = (tilesetMap: YTileset, tileset: Tileset) => {
  tilesetMap.set("id", tileset.id);
  tilesetMap.set("name", tileset.name);
  tilesetMap.set("base64Preview", tileset.base64Preview);
};

const toYTileset = (tileset: Tileset): YTileset => {
  const tilesetMap = new Y.Map<any>();
  writeTilesetMeta(tilesetMap, tileset);
  const rows = ensureYRows(tilesetMap);
  writeTilesetRows(rows, tileset.data);
  return tilesetMap;
};

const readTilesetFromY = (tilesetMap: YTileset): Tileset | null => {
  const rows = tilesetMap.get("data");
  if (!(rows instanceof Y.Array)) return null;

  const data = rows.toArray().map((row) => (
    row instanceof Y.Array
      ? row.toArray() as (string | null)[]
      : []
  ));

  return {
    id: String(tilesetMap.get("id") ?? ""),
    name: String(tilesetMap.get("name") ?? ""),
    base64Preview: String(tilesetMap.get("base64Preview") ?? ""),
    data,
  };
};

const readTilesetsFromY = (tilesetsArray: Y.Array<YTileset>): Tileset[] => (
  tilesetsArray
    .toArray()
    .map((item) => (item instanceof Y.Map ? readTilesetFromY(item as YTileset) : null))
    .filter((item): item is Tileset => item !== null)
);

const normalizeTilesetsArray = (tilesetsArray: Y.Array<YTileset>) => {
  const firstById = new Map<string, number>();

  for (let i = 0; i < tilesetsArray.length; i++) {
    const value = tilesetsArray.get(i);
    if (!(value instanceof Y.Map)) continue;

    const id = String(value.get("id") ?? "");
    if (!id) continue;

    // Deduplicate by id, keep first instance for stable order.
    if (!firstById.has(id)) {
      firstById.set(id, i);
      continue;
    }

    tilesetsArray.delete(i, 1);
    i--;
  }
};

export const useTilesetSync = (documentName: string) => {
  const { doc, isSynced, onSynced } = useYjs(documentName);
  const tilesetsArray = doc.getArray<YTileset>("tilesets");

  useEffect(() => {
    if (!tilesetsArray) return;

    const handleSync = () => {
      if (tilesetsArray.length > 0) {
        doc.transact(() => {
          normalizeTilesetsArray(tilesetsArray);
        }, doc.clientID);

        useGeckodeStore.setState({ tilesets: readTilesetsFromY(tilesetsArray) });
      }

      const observer = (events: Y.YEvent<any>[], transaction: Y.Transaction) => {
        if (transaction.origin === doc.clientID) return;
        if (!events.length) return;
        useGeckodeStore.setState({ tilesets: readTilesetsFromY(tilesetsArray) });
      };

      tilesetsArray.observeDeep(observer);
      return () => tilesetsArray.unobserveDeep(observer);
    };

    const cleanup = onSynced(handleSync);

    if (isSynced()) {
      const observerCleanup = handleSync();
      return () => {
        cleanup();
        observerCleanup?.();
      };
    }

    return cleanup;
  }, [tilesetsArray, doc, isSynced, onSynced]);
};

export const upsertTilesetSync = (tileset: Tileset) => {
  const doc = getYDoc();
  if (!doc) return;

  const tilesetsArray = doc.getArray<YTileset>("tilesets");
  if (!tilesetsArray) return;

  doc.transact(() => {
    let index = -1;
    const duplicateIndexes: number[] = [];
    for (let i = 0; i < tilesetsArray.length; i++) {
      const item = tilesetsArray.get(i);
      if (item instanceof Y.Map && item.get("id") === tileset.id) {
        if (index === -1) index = i;
        else duplicateIndexes.push(i);
      }
    }

    if (index === -1) {
      tilesetsArray.push([toYTileset(tileset)]);
      return;
    }

    const tilesetMap = tilesetsArray.get(index);
    if (!(tilesetMap instanceof Y.Map)) return;
    writeTilesetMeta(tilesetMap, tileset);
    const rows = ensureYRows(tilesetMap);
    writeTilesetRows(rows, tileset.data);

    for (let i = duplicateIndexes.length - 1; i >= 0; i--) {
      tilesetsArray.delete(duplicateIndexes[i], 1);
    }
  }, doc.clientID);
};

export const deleteTilesetSync = (id: string) => {
  const doc = getYDoc();
  if (!doc) return;

  const tilesetsArray = doc.getArray<YTileset>("tilesets");
  if (!tilesetsArray) return;

  doc.transact(() => {
    for (let i = 0; i < tilesetsArray.length; i++) {
      const item = tilesetsArray.get(i);
      if (item instanceof Y.Map && item.get("id") === id) {
        tilesetsArray.delete(i, 1);
        break;
      }
    }
  }, doc.clientID);
};

export const setTilesetPreviewSync = (id: string, base64Preview: string) => {
  const doc = getYDoc();
  if (!doc) return;

  const tilesetsArray = doc.getArray<YTileset>("tilesets");
  if (!tilesetsArray) return;

  doc.transact(() => {
    for (let i = 0; i < tilesetsArray.length; i++) {
      const item = tilesetsArray.get(i);
      if (item instanceof Y.Map && item.get("id") === id) {
        item.set("base64Preview", base64Preview);
        break;
      }
    }
  }, doc.clientID);
};
