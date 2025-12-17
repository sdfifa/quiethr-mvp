import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "QuietHR - Simulation Active",
  description: "Quietly Hire the Top 1%",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body 
        className={cn(
          "min-h-screen bg-[#0F0F0F] font-sans antialiased text-white",
          inter.variable
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

