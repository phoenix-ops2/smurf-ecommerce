"use client";

import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r dark:from-orange-600 dark:via-red-400 dark:to-pink-500 from-cyan-500 to-purple-500">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-gray-600 dark:text-gray-300">Thank you for shopping with Smurf.</p>

      <Link href="/" className="text-blue-500 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
