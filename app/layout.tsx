import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/redux/providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Find jobs via Weekday (YC W21)",
  description: "jobs.weekday.works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
    <body className="overflow-x-hidden">
      <Providers>
      {children}
      </Providers>
      <Toaster />
      </body>
  </html>
  );
}
