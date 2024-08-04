import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "../components/SideBar";
import NotificationBanner from "@/components/NotificationBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Syncra Backend Documentation",
  description: "Tech documentation for Syncra Backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex items-start justify-between`}>
        <SideBar />
        <main className="relative w-full h-full min-h-screen p-10 overflow-x-hidden">
          <NotificationBanner />
          {children}
        </main>
      </body>
    </html>
  );
}
