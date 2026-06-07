import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jisat CRM | Шаштараз",
  description: "Шаштараздарға арналған кіші CRM жүйесі"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk">
      <body>{children}</body>
    </html>
  );
}
