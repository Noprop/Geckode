import EditorFooter from '@/components/EditorFooter';
import { SnackbarProvider } from '@/providers/SnackbarProvider';

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider>
      <main
        className="flex-1 flex flex-col bg-light-secondary dark:bg-dark-secondary"
        id="app"
      >
        {children}
      </main>
      <EditorFooter />
    </SnackbarProvider>
  );
}
