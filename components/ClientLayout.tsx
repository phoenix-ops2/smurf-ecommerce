"use client";

import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="bottom-right" duration={2500} closeButton />
        <header>
          <Navbar />
        </header>
        <main className="p-4">{children}</main>
      </CartProvider>
    </AuthProvider>
  );
};

export default ClientLayout;
