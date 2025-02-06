import type { Metadata } from "next";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";
import CartProvider from "@/components/Provider";
import ShoppingCartModal from "@/components/ShoppingCartModel";
import { Toaster } from "react-hot-toast";
import { Montserrat } from "next/font/google";
import TidioChat from "@/components/TidioChat";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <ClerkProvider>
      <CartProvider>
        <html lang="en" className={montserrat.className}>
          <body>

            {/* Tidio Chat */}
            <TidioChat />

            {/* Toaster for notifications */}
            <Toaster position="top-center" reverseOrder={false} />

            {/* Shopping cart modal */}
            <ShoppingCartModal />

            {/* Main content */}
            {children}
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}