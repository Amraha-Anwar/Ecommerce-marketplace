import type { Metadata } from "next";
import "./globals.css";
import TopNavbar from "@/components/TopNavbar";
import MiddleNavbar from "@/components/MiddleNavbar";
import BottomNavbar from "@/components/BottomNavbar";
import Footer from "@/components/Footer";
import CartProvider from "@/components/Provider";
import ShoppingCartModal from "@/components/ShoppingCartModel";
import { Toaster } from "react-hot-toast";
import { Montserrat } from "next/font/google";
// import TidioChat from "@/components/TidioChat"; 

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
    <CartProvider>
      <html lang="en" className={montserrat.className}>
        <body>
          {/* Adding Toaster globally */}
          <Toaster position="top-center" reverseOrder={false} />

          {/* Navbar components */}
          <TopNavbar />
          <MiddleNavbar />
          <BottomNavbar />

          {/* Shopping cart modal */}
          <ShoppingCartModal />

          {/* Main content */}
          {children}
          {/* Tidio Chatbot Script */}
          {/* <TidioChat /> */}
          {/* Footer */}
          <Footer />

          
          
        </body>
      </html>
    </CartProvider>
  );
}