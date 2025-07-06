import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lamberto Tamayo - Portfolio",
  description: "NestJS Backend Specialist & Full-Stack Developer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
