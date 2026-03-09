"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useSnackbar } from "@/hooks/useSnackbar";
import api from "@/lib/api/axios";

/** Loaded only on client to avoid pulling in Phaser/EditorScene (useWorkspaceSync) on the server. */
const PlayWithYjsClient = dynamic(
  () => import("../PlayWithYjsClient"),
  { ssr: false }
);

interface PublicShareResponse {
  name: string;
  token: string;
  total_visits: number;
  unique_visits: number;
  yjs_blob?: string | null;
}

const PlayPage = () => {
  const { token } = useParams<{ token: string }>();
  const showSnackbar = useSnackbar();
  const [data, setData] = useState<PublicShareResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const visitorId = useMemo(() => {
    if (typeof window === "undefined") return "";
    const key = "geckode_visitor_id";
    const existing = window.localStorage.getItem(key);
    if (existing) return existing;
    const id = crypto.randomUUID();
    window.localStorage.setItem(key, id);
    return id;
  }, []);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    (async () => {
      try {
        // Public share endpoint lives at /api/share/<token>/ (see backend projects.urls)
        const url = `share/${token}/?visitor_id=${encodeURIComponent(
          visitorId,
        )}`;
        const res = await api.get<PublicShareResponse>(url);
        if (cancelled) return;
        setData(res.data);
      } catch (err: any) {
        if (cancelled) return;
        const message =
          err?.response?.data?.detail ||
          err?.message ||
          "Failed to load shared game.";
        setError(message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, visitorId]);

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handlePlayError = useCallback(
    (message: string) => {
      showSnackbar(message, "error");
      setIsPlaying(false);
    },
    [showSnackbar]
  );

  const useYjsPlay =
    isPlaying && data?.yjs_blob;

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Shared Game
          </span>
          <span className="text-lg font-bold">
            {data?.name ?? "Loading game..."}
          </span>
          {data && (
            <span className="text-xs text-white/50 mt-1">
              {data.unique_visits} unique · {data.total_visits} total plays
            </span>
          )}
        </div>
        <button
          onClick={handleTogglePlay}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
            isPlaying
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-white" />
          {isPlaying ? "Stop" : "Play"}
        </button>
      </header>
      <main
        className="flex-1 flex items-center justify-center min-h-0 bg-black"
        style={{ containerType: "size" }}
      >
        {useYjsPlay && data?.yjs_blob && token ? (
          <PlayWithYjsClient
            token={token}
            yjsBlobBase64={data.yjs_blob}
            onError={handlePlayError}
          />
        ) : null}
        <div
          className="flex min-w-0 min-h-0 shrink-0"
          style={{
            width: "min(100cqw, 100cqh * 4 / 3)",
            height: "min(100cqh, 100cqw * 3 / 4)",
          }}
        >
          <div
            id="phaser-container"
            className="w-full h-full rounded-sm overflow-hidden outline-none ring-0"
          />
        </div>
      </main>
    </div>
  );
};

export default PlayPage;

