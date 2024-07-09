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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
