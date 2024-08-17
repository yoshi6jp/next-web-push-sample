import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebPushProvider } from "@/components/WebPushProvider";
import { JotaiProvider } from "@/components/JotaiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Push Sample",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <JotaiProvider>
          <WebPushProvider>{children}</WebPushProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
