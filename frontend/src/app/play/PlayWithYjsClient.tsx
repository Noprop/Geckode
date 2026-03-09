"use client";

import { useContext, useEffect, useState } from "react";
import { YjsContext } from "@/contexts/YjsContext";
import { YjsProvider } from "@/contexts/YjsContext";
import { ShareGameLoader, SHARE_DOC_PREFIX } from "./ShareGameLoader";

/**
 * Client-only wrapper for Yjs-based share play. Registers the share doc then mounts ShareGameLoader.
 * This file (and ShareGameLoader → useWorkspaceSync → EditorScene → Phaser) must be dynamically imported
 * with ssr: false so Phaser/window are never touched on the server.
 */
export default function PlayWithYjsClient({
  token,
  yjsBlobBase64,
  onError,
}: {
  token: string;
  yjsBlobBase64: string;
  onError: (message: string) => void;
}) {
  return (
    <YjsProvider>
      <SharePlayWithYjs
        token={token}
        yjsBlobBase64={yjsBlobBase64}
        onError={onError}
      />
    </YjsProvider>
  );
}

function SharePlayWithYjs({
  token,
  yjsBlobBase64,
  onError,
}: {
  token: string;
  yjsBlobBase64: string;
  onError: (message: string) => void;
}) {
  const context = useContext(YjsContext);
  const [docReady, setDocReady] = useState(false);

  useEffect(() => {
    if (!context?.registerShareDoc) return;
    context.registerShareDoc(`${SHARE_DOC_PREFIX}${token}`, yjsBlobBase64);
    setDocReady(true);
  }, [context, token, yjsBlobBase64]);

  if (!docReady) return null;

  return (
    <ShareGameLoader
      documentName={`${SHARE_DOC_PREFIX}${token}`}
      onError={onError}
    />
  );
}
