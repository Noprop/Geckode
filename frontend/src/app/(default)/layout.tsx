import { SnackbarProvider } from "@/providers/SnackbarProvider";
import Link from "next/link";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main
        className="flex-1 flex flex-col bg-light-secondary dark:bg-dark-secondary"
        id="app"
      >
        <SnackbarProvider>{children}</SnackbarProvider>
      </main>

      {/* TODO: Finish footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-14 bg-light-secondary dark:bg-dark-secondary border-t border-slate-300 dark:border-slate-600 flex items-center justify-between px-4 z-49">
        <div className="flex gap-2">
          <Link href="/projects">Projects</Link>
        </div>
      </footer>
    </>
  );
}

