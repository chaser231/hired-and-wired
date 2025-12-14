import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HR Assist",
  description: "Внутренняя HR платформа для автоматизации процессов онбординга и найма",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
