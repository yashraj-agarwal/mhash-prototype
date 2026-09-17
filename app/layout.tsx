import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { SystemProviders } from "@/components/providers/SystemProviders";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { AIAssistant } from "@/components/ai/AIAssistant";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anvaya - Post-Award Intelligence",
  description: "See whether a public works project is still aligned with what was approved.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased h-full w-full`}
    >
      <body className="h-[100dvh] w-full flex bg-background text-foreground overflow-hidden font-sans">
        <SystemProviders>
          <AuthProvider>
            <CommandPalette />
            <AIAssistant />
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0 h-[100dvh]">
              <TopNavigation />
              <main className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 relative">
                {children}
              </main>
            </div>
          </AuthProvider>
        </SystemProviders>
      </body>
    </html>
  );
}
