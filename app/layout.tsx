import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "<c/acc> Career accelerator platform.",
  description: "CoinMarketJob",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
