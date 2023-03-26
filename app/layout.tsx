import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Wishes for Baby Luna",
  description: "Send wishes for Baby Luna",
  icons: [
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  ],
  manifest: "/site.webmanifest",
  themeColor: "#151e26",
  robots: { index: false },
  openGraph: {
    images: [
      { url: `https://${process.env.VERCEL_URL ?? ""}/images/open-graph.jpg` },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.clouds} />
        <div className={styles.content}>{children}</div>
      </body>
    </html>
  );
}
