import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Exchange",
  description: "Project Exchange is a marketplace for buying and selling projects, including college main projects, mini projects, and personal projects. Easily post your project details, set your price, and connect with buyers. A small ₹200 service fee is added to each transaction. Buyers can also request expert developer support to understand or modify their purchased projects, with developers earning up to ₹400 for a 30-minute support session. Streamline your project exchange experience with secure payments and expert guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
