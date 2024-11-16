import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import ReactQueryProvider from "@/lib/react-query-provider";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"]
})

export const metadata: Metadata = {
  title: "News Aggregator",
  description: "Stay up to date on your state's news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased flex justify-center`}
      >
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
