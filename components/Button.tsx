"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const Button = ({
  children,
  className,
  variant = "primary",
  fullWidth,
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium transition-transform duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variants = {
    primary: "bg-black text-white dark:bg-white dark:text-black hover:bg-opacity-80",
    secondary: "bg-gray-300 text-black dark:bg-zinc-700 dark:text-white hover:bg-opacity-70",
    outline:
      "border border-black dark:border-white text-black dark:text-white bg-transparent hover:bg-black/10 dark:hover:bg-white/10",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], fullWidth && "w-full", className)}
      {...props}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
};

export default Button;
