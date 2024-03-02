import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maniy Financial",
  description: "Made by Andrew",
};

const manrope = Manrope({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" />
        {children}
        </body>
    </html>
  );
}
