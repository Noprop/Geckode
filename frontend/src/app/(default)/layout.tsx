import Header from "@/components/Header/Header";
import HeaderRHSBtns from "@/components/HeaderRHSBtns";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header rhs={<HeaderRHSBtns />} />
      <main
        className="flex-1 flex flex-col bg-light-secondary dark:bg-dark-secondary"
        id="app"
      >
        {children}
      </main>
    </>
  );
}
