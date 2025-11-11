import { Button } from "@/components/ui/Button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-foreground">Developer,</span>
          <br />
          <span className="text-primary">Founder,</span>
          <br />
          <span className="text-foreground">Writer</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground-secondary sm:text-xl">
          Building innovative solutions, founding companies, and sharing insights
          through code and words.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button href="/projects" variant="primary">
            View Projects
          </Button>
          <Button href="/contact" variant="secondary">
            Get in Touch
          </Button>
        </div>
        <div className="mt-16 flex justify-center">
          <a
            href="#featured"
            className="animate-bounce text-foreground-secondary transition-colors hover:text-primary"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}

