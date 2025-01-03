import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNavbar from "@/components/TopNavbar";
import MiddleNavbar from "@/components/MiddleNavbar";
import BottomNavbar from "@/components/BottomNavbar";
import Footer from "@/components/Footer";
import  CartProvider from "@/components/Provider";
import ShoppingCartModal from "@/components/ShoppingCartModel";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Comforty E-commerce website",
  description: "Created by using Nextjs, Tailwind css, and Sanity",
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
        <CartProvider>
          <TopNavbar/>
        <MiddleNavbar/>
        <BottomNavbar/>
        <ShoppingCartModal/>
        {children}
        <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}

