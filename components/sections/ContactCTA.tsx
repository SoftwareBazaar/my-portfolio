import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-primary/5 px-8 py-12 text-center dark:bg-primary/10">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Ready to Start Your Next Project?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
          Whether you need a web application, investment guidance, or technical content—let&apos;s discuss how I can help.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/contact" variant="primary" asLink>
            Get in Touch
          </Button>
          <Button href="https://calendly.com/johnwanyaga37/30min" variant="secondary" asLink>
            Book a Call
          </Button>
        </div>
      </div>
    </section>
  );
}

