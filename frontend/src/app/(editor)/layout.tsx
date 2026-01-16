export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col bg-light-secondary dark:bg-dark-secondary" id="app">
      {children}
    </main>
  );
}
