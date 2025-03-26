"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

type AuthFormProps = {
  type: "login" | "signup";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/auth/${type}`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      login(data); // save user info in context
      toast.success(`✅ ${type === "signup" ? "Account created" : "Logged in"}!`);
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 space-y-6 bg-white dark:bg-zinc-900 p-8 rounded shadow"
    >
      <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r dark:from-orange-600 dark:via-red-400 dark:to-pink-500 from-cyan-500 to-purple-500">
        {type === "signup" ? "Create Account" : "Login to Smurf"}
      </h2>

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded hover:bg-opacity-80 transition"
      >
        {isSubmitting
          ? type === "signup"
            ? "Creating..."
            : "Logging in..."
          : type === "signup"
          ? "Sign Up"
          : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
