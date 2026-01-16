import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { WorkspaceViewProvider } from "@/contexts/WorkspaceViewContext";
import { ThemeProvider } from "next-themes";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { authApi } from "@/lib/api/auth";
import { UserProvider } from "@/contexts/UserContext";
import LayoutProvider from "@/contexts/LayoutProvider";

export const metadata: Metadata = {
  title: "Geckode",
  description: "A coding platform for kids",
  authors: [{ name: "Geckode", url: "https://geckode.com" }],
  creator: "Geckode",
  publisher: "Geckode",
  applicationName: "Geckode",
  keywords: ["coding", "platform", "kids", "education"],
  robots: "index, follow",

  // TODO: Add metadata
  // icons: {
  //   icon: '/favicon.ico',
  // },
  // metadataBase: new URL('https://geckode.com'),
  // openGraph: {
  //   title: 'Geckode',
  //   description: 'A coding platform for kids',
  //   url: 'https://geckode.com',
  //   siteName: 'Geckode',
  //   images: ['/og-image.png'],
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Geckode',
  //   description: 'A coding platform for kids',
  //   images: ['/og-image.png'],
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user;

  try {
    user = await authApi.getUserDetails();
  } catch (error: any) {
    user = null;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider user={user}>
            <SnackbarProvider>
              <WorkspaceViewProvider>
                <LayoutProvider>{children}</LayoutProvider>
              </WorkspaceViewProvider>
            </SnackbarProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
