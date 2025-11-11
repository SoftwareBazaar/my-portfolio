import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-foreground">
        Page Not Found
      </h2>
      <p className="mt-4 text-foreground-secondary">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary" asLink className="inline-flex items-center gap-2">
          <Home className="h-4 w-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
}

