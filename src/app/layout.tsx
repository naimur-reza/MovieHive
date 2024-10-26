import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/Providers/NextThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MovieHive",
  description: "MoiviHive  - search movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div>Loading...</div>}> {children}</Suspense>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
