import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-900/20 dark:text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new opportunities
          </div>
          <p className="mt-6 text-lg font-medium uppercase tracking-[0.3em] text-foreground-secondary">
            Hi, I&apos;m John Wanyaga
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Algorithmic Trader,
            <br />
            <span className="text-primary">Fintech Builder,</span>
            <br />
            Writer &amp; Article Author
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground-secondary sm:text-xl">
            I design MT5 expert advisors, machine learning trading agents, and full-stack fintech platforms—then
            document every system through investor decks, product manuals, and long-form articles.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/projects" variant="primary" asLink>
              View My Work
            </Button>
            <Button href="/contact" variant="secondary" asLink>
              Book a Discovery Call
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 text-sm text-foreground-secondary">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
              <Sparkles className="h-4 w-4" />
              MT5 &amp; ML Trading Agents
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
              Quant Research &amp; Writing
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
              Fintech Product Architecture
            </div>
          </div>
          <div className="mt-16 hidden lg:flex">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 text-foreground-secondary transition-colors hover:text-primary"
              aria-label="Scroll down"
            >
              <ArrowDown className="h-5 w-5" />
              Explore featured work
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm -translate-y-6">
          <div className="absolute inset-0 -translate-y-6 rounded-[36px] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-gray-50 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <Image
              src="/images/profile/profile-placeholder.jpg"
              alt="John Wanyaga"
              width={640}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-center lg:hidden">
        <a
          href="#featured"
          className="inline-flex items-center gap-2 text-foreground-secondary transition-colors hover:text-primary"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5" />
          Explore featured work
        </a>
      </div>
    </section>
  );
}
