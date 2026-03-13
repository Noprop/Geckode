'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import HeaderRHSBtns from '@/components/Header/HeaderRHSBtns';
import { ClientsDisplay } from '@/components/ui/ClientsDisplay';
import TabSelector from '@/components/ui/selectors/TabSelector';
import { useWorkspaceView, WorkspaceView } from '@/contexts/WorkspaceViewContext';
import { DrawingPinFilledIcon, ImageIcon } from '@radix-ui/react-icons';
import ProjectControls from '@/components/Header/ProjectControls';
import { PROJECT_SAVE_STATUS_EVENT, PROJECT_WEBSOCKET_STATUS_EVENT } from '@/contexts/YjsContext';
import { useParams } from 'next/navigation';
import { ConnectionStatus, SaveStatus } from '@/lib/types/yjs/provider';


function SaveStatusIndicator() {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const params = useParams();

  useEffect(() => {
    const saveHandler = (event: Event) => {
      const detail = (event as CustomEvent<{
        type: 'project_save_status';
        status: 'saving' | 'saved';
      }>).detail;

      if (!detail) return;

      setStatus(detail.status === 'saving' ? 'saving' : 'saved');
    };

    const wsHandler = (event: Event) => {
      const detail = (event as CustomEvent<{
        type: 'project_websocket_status';
        status: ConnectionStatus;
      }>).detail;

      if (!detail) return;
      setConnectionStatus(detail.status);
    };

    window.addEventListener(PROJECT_SAVE_STATUS_EVENT, saveHandler as EventListener);
    window.addEventListener(PROJECT_WEBSOCKET_STATUS_EVENT, wsHandler as EventListener);

    return () => {
      window.removeEventListener(PROJECT_SAVE_STATUS_EVENT, saveHandler as EventListener);
      window.removeEventListener(PROJECT_WEBSOCKET_STATUS_EVENT, wsHandler as EventListener);
    };
  }, []);

  // If we don't have a project id, don't render anything in the header.
  if (!params.projectID) return null;

  let label = 'Saved';
  if (connectionStatus === 'disconnected') label = 'Disconnected';
  else if (connectionStatus === 'connecting') label = 'Connecting…';
  else if (status === 'saving') label = 'Saving changes…';

  const dotClassName =
    connectionStatus === 'disconnected'
      ? 'bg-rose-300'
      : connectionStatus === 'connecting' || status === 'saving'
        ? 'bg-amber-300 animate-pulse'
        : status === 'saved'
          ? 'bg-emerald-300'
          : 'bg-emerald-200/80';

  return (
    <div className='ml-3 hidden items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/90 ring-1 ring-white/15 shadow-sm md:flex'>
      <span className={`inline-flex h-2 w-2 rounded-full ${dotClassName}`} aria-hidden='true' />
      <span aria-live='polite'>{label}</span>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { view, setView } = useWorkspaceView();

  return (
    <>
      <Header
        lhs={
          <div className='flex items-center gap-3'>
            <ProjectControls />
            <SaveStatusIndicator />
          </div>
        }
        middle={
          <TabSelector<WorkspaceView>
            tab={view}
            setTab={setView}
            options={[
              {
                value: 'blocks',
                label: 'Blocks',
                icon: DrawingPinFilledIcon,
              },
              { value: 'assets', label: 'My Assets', icon: ImageIcon },
              { value: 'tilemap', label: 'Tilemap', icon: ImageIcon },
            ]}
          />
        }
        rhs={
          <>
            <ClientsDisplay />
            <HeaderRHSBtns />
          </>
        }
      />
      <main className='flex-1 flex flex-col bg-light-secondary dark:bg-dark-secondary' id='app'>
        {children}
      </main>
    </>
  );
}
