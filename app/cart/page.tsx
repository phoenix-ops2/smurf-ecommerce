"use client";

import { useCart } from "@/context/CartContext";
import Button from "@/components/Button";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const CartPage = () => {
  const { user } = useAuth();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const router = useRouter();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please log in to place an order.");
      return;
    }

    try {
      setIsPlacingOrder(true);

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // ✅ Send token
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Checkout failed");
      }

      toast.success(`✅ Order placed! Order ID: ${data.order.id}`);
      clearCart();
      router.push("/success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(`❌ ${message}`);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      {/* Gradient Header */}
      <div className="flex justify-center gap-2 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r dark:from-orange-600 dark:via-red-400 dark:to-pink-500 from-cyan-500  to-purple-500">
        <h1>Your Cart</h1>
        <span>🛒</span>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          Your cart is currently empty.
        </p>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white/50 dark:bg-zinc-900/60 backdrop-blur-md border border-neutral-200 dark:border-zinc-700 p-4 rounded shadow"
              >
                <div className="flex items-center gap-4 w-full">
                  {/* Product Thumbnail */}
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-md border border-gray-200 dark:border-zinc-700"
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center text-xs text-gray-500 bg-gray-200 dark:bg-zinc-700 rounded-md border border-gray-300 dark:border-zinc-600">
                      No image
                    </div>
                  )}

                  {/* Item Info */}
                  <div className="flex flex-col flex-grow">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-semibold text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button variant="outline" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Total + Clear Cart */}
          <div className="text-center space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-nero dark:text-white">
              Total: <span className="font-bold">${total.toFixed(2)}</span>
            </h2>

            <div className="flex justify-center gap-4">
              {/* Checkout Button */}
              <Button variant="primary" disabled={isPlacingOrder} onClick={handlePlaceOrder}>
                {isPlacingOrder ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    Placing...
                  </span>
                ) : (
                  "Place Order"
                )}
              </Button>

              {/* Clear Cart Button */}
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
