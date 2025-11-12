import { Button } from "@/components/ui/Button";
import { CalendarClock, PenTool, LineChart, Bot, MessageCircle } from "lucide-react";

const offerings = [
  {
    icon: Bot,
    title: "Algorithmic Trading Systems",
    description:
      "Designing MT5 expert advisors, high-frequency bots, and machine learning agents aligned with your risk appetite.",
  },
  {
    icon: LineChart,
    title: "Quant & Fintech Strategy",
    description:
      "Advisory on platform architecture, brokerage integrations, and market data automation for trading desks.",
  },
  {
    icon: PenTool,
    title: "Article & Academic Writing",
    description:
      "Thought leadership, research-backed articles, and academic deliverables for finance and agri-tech audiences.",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-foreground">Consulting & Writing Services</h2>
        <p className="mt-4 text-lg text-foreground-secondary">
          Book time for trading automation, fintech product strategy, or bespoke writing engagements.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {offerings.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-sm uppercase tracking-wide text-foreground-secondary">
          Consulting rate — $10/hour (remote or hybrid engagements)
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            href="https://calendly.com/johnwanyaga37/30min"
            variant="primary"
            className="inline-flex items-center gap-2"
            asLink
          >
            <CalendarClock className="h-4 w-4" />
            Schedule via Calendly
          </Button>
          <Button
            href="https://wa.me/254746054224"
            variant="secondary"
            className="inline-flex items-center gap-2"
            asLink
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}


