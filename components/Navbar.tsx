"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex items-center justify-around px-6 py-4 bg-gray-100 dark:bg-zinc-900 shadow">
      {/* Logo */}
      <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r dark:from-orange-600 dark:via-red-400 dark:to-pink-500 from-cyan-500 to-purple-500">
        SMURF
      </h1>

      {/* Nav Links */}
      <div className="flex items-center space-x-6">
        <Link
          href="/"
          className={`transform transition-transform duration-300 hover:scale-[1.05] dark:text-gray-200 ${
            pathname === "/" ? "font-semibold" : ""
          }`}
        >
          Home
        </Link>

        {user ? (
          <>
            <span className="text-sm dark:text-gray-300">Hi, {user.email}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-500 transform transition-transform duration-300 hover:scale-[1.05]"
            >
              Logout
              <FiLogOut />
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`transform transition-transform duration-300 hover:scale-[1.05] dark:text-gray-200 ${
                pathname === "/login" ? "font-semibold" : ""
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`transform transition-transform duration-300 hover:scale-[1.05] dark:text-gray-200 ${
                pathname === "/signup" ? "font-semibold" : ""
              }`}
            >
              Sign Up
            </Link>
          </>
        )}

        {/* Cart Icon */}
        <Link
          href="/cart"
          className={`relative inline-block transform transition-transform duration-300 hover:scale-[1.05] ${
            pathname === "/cart" ? "font-semibold" : ""
          }`}
        >
          <span className="flex items-center justify-center">
            <FaShoppingCart size={20} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
