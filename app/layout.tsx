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
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <div style={{flex: 1}}>
          {children}
        </div>
        <div className='footer'>© 2024 COINMARKETJOB</div>
      </body>
    </html>
  );
}
