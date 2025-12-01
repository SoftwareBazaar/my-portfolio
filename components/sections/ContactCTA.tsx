import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-primary/5 px-8 py-12 text-center dark:bg-primary/10">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Build Your Next Trading Edge
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
          Partner with me to design MT5 expert advisors, fintech platforms, or quantitative research that drives real alpha.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/contact" variant="primary" asLink className="shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40">
            Get in Touch
          </Button>
          <Button href="https://calendly.com/johnwanyaga37/30min" variant="secondary" asLink className="shadow-md hover:shadow-lg">
            Book a Call
          </Button>
        </div>
      </div>
    </section>
  );
}

