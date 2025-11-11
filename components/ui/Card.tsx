import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function Card({ children, className, href, onClick }: CardProps) {
  const baseStyles =
    "rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900";

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, className)}>
        {children}
      </Link>
    );
  }

  return (
    <div
      className={cn(baseStyles, onClick && "cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

