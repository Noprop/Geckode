'use client';

import Header from '@/components/Header/Header';
import HeaderRHSBtns from '@/components/Header/HeaderRHSBtns';
import api from '@/lib/api/axios';
import { useSnackbar } from '@/hooks/useSnackbar';
import {
  EnterFullScreenIcon,
  PlayIcon,
  StopIcon,
} from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Y from 'yjs';

/** Loaded only on client to avoid pulling in Phaser/EditorScene (useWorkspaceSync) on the server. */
const PlayWithYjsClient = dynamic(
  () => import('../PlayWithYjsClient'),
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);

  const visitorId = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const key = 'geckode_visitor_id';
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
        const url = `share/${token}/?visitor_id=${encodeURIComponent(
          visitorId
        )}`;
        const res = await api.get<PublicShareResponse>(url);
        if (cancelled) return;
        setData(res.data);
      } catch (err: any) {
        if (cancelled) return;
        const message =
          err?.response?.data?.detail ||
          err?.message ||
          'Failed to load shared game.';
        setError(message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, visitorId]);

  // Decode the project name from the yjs blob
  useEffect(() => {
    if (!data?.yjs_blob) return;

    try {
      const binary = Uint8Array.from(atob(data.yjs_blob), (c) =>
        c.charCodeAt(0)
      );
      const doc = new Y.Doc();
      Y.applyUpdate(doc, binary);
      const meta = doc.getMap<any>('meta');
      const name = meta.get('name');
      if (typeof name === 'string') {
        setProjectName(name);
      }
    } catch {
      // Ignore project name decode errors
    }
  }, [data?.yjs_blob]);

  const handleStartPlay = () => {
    if (!canPlay) return;
    setIsPlaying(true);
  };

  const handleStopPlay = () => {
    setIsPlaying(false);
  };

  const handleToggleFullscreen = () => {
    if (typeof document === 'undefined') return;

    if (!document.fullscreenElement) {
      void containerRef.current
        ?.requestFullscreen()
        .catch(() => {
          // Ignore fullscreen errors
        });
    } else {
      void document
        .exitFullscreen()
        .catch(() => {
          // Ignore fullscreen errors
        });
    }
  };

  const handlePlayError = useCallback(
    (message: string) => {
      showSnackbar(message, 'error');
      setIsPlaying(false);
    },
    [showSnackbar]
  );

  const canPlay = Boolean(data?.yjs_blob);
  const useYjsPlay = isPlaying && canPlay;

  const shareLinkName = data?.name ?? '';
  const hasProjectName = projectName && projectName.trim().length > 0;
  const title = hasProjectName
    ? projectName
    : shareLinkName || 'Loading game...';
  const buildLabel = hasProjectName && shareLinkName ? shareLinkName : null;
  const subtitle =
    data && `${data.unique_visits} unique · ${data.total_visits} total plays`;

  if (error) {
    return (
      <div className='min-h-screen bg-light-secondary dark:bg-dark-secondary'>
        <Header
          middle={
            <div className='min-w-0 text-center'>
              <div className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white/90 ring-1 ring-white/15'>
                Shared Game
              </div>
            </div>
          }
          rhs={<HeaderRHSBtns />}
        />
        <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-10'>
          <div className='w-full rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-dark-tertiary/60'>
            <div className='text-sm font-semibold text-rose-700 dark:text-rose-300'>Couldn’t load this shared game</div>
            <div className='mt-2 text-sm text-slate-700 dark:text-slate-200'>{error}</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className='flex h-screen flex-col'>
      <Header
        lhs={
          <div className='flex items-center gap-2 ml-6'>
            <button
              type='button'
              onClick={handleToggleFullscreen}
              className='header-btn'
              title='Toggle fullscreen'
            >
              <EnterFullScreenIcon className='h-4 w-4' />
            </button>
            {isPlaying ? (
              <button
                type='button'
                onClick={handleStopPlay}
                className='header-btn'
                title='Stop game'
              >
                <StopIcon className='h-4 w-4' />
              </button>
            ) : null}
          </div>
        }
        middle={
          <div className="min-w-0 max-w-md text-center">
            <div className="mt-0.5 truncate text-lg font-bold text-white">
              {title}
            </div>
            {buildLabel ? (
              <div className="mt-0.5 truncate text-xs font-medium text-white/70">
                {buildLabel}
              </div>
            ) : null}
          </div>
        }
        rhs={<HeaderRHSBtns />}
      />

      <main className='flex flex-1 min-h-0 flex-col bg-light-secondary dark:bg-dark-secondary' id='app'>
        {useYjsPlay && data?.yjs_blob && token ? (
          <PlayWithYjsClient
            token={token}
            yjsBlobBase64={data.yjs_blob}
            onError={handlePlayError}
          />
        ) : null}

        <div className='flex flex-1 min-h-0 items-stretch px-4 py-4'>
          <div ref={containerRef} className='relative h-full w-full'>
            {!isPlaying && (
              <div className='pointer-events-auto absolute inset-0 z-10 flex flex-col items-center justify-center gap-4'>
                <div className='text-center'>
                  <div className='text-xs font-semibold uppercase tracking-wide text-white/80'>
                    Shared Game
                  </div>
                  <div className='mt-1 text-2xl font-extrabold text-white'>
                    {title}
                  </div>
                  {buildLabel ? (
                    <div className='mt-0.5 text-sm font-medium text-white/80'>
                      {buildLabel}
                    </div>
                  ) : null}
                </div>

                {subtitle ? (
                  <div className='text-xs text-white/80'>
                    {subtitle}
                  </div>
                ) : null}

                <button
                  type='button'
                  onClick={handleStartPlay}
                  disabled={!canPlay}
                  className={[
                    'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_0_0_#1a5c3a] transition-all cursor-pointer',
                    'bg-primary-green hover:bg-primary-green/90',
                    'hover:translate-y-px hover:shadow-[0_4px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none',
                    'border border-white/10 backdrop-blur',
                    'disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-[0_6px_0_0_#1a5c3a] disabled:cursor-not-allowed',
                  ].join(' ')}
                  title={canPlay ? 'Play game' : 'This shared game is missing play data.'}
                >
                  <PlayIcon className='h-4 w-4' />
                  <span>Play Game</span>
                </button>
              </div>
            )}
            <div
              id='phaser-container'
              className='h-full w-full overflow-hidden rounded-lg outline-none ring-0'
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayPage;

