import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  asLink = false,
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark focus:ring-primary hover:scale-105 active:scale-100",
    secondary:
      "bg-gray-200 text-foreground hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring-gray-500 hover:scale-105 active:scale-100",
    ghost:
      "text-foreground-secondary hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800 focus:ring-gray-500",
  };

  if (asLink && href) {
    return (
      <Link
        href={href}
        className={cn(baseStyles, variants[variant], className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

