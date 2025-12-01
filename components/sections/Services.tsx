import { Button } from "@/components/ui/Button";
import { CalendarClock, PenTool, LineChart, Bot, MessageCircle, TrendingUp } from "lucide-react";

const offerings = [
  {
    icon: Bot,
    title: "Web Application Development",
    description:
      "Custom web applications built with React, Next.js, and modern technologies. From MVPs to full-scale platforms.",
  },
  {
    icon: TrendingUp,
    title: "Stock & Investment Advisory",
    description:
      "Personalized investment analysis, risk management, and long-term wealth strategies tailored to your financial goals.",
  },
  {
    icon: PenTool,
    title: "Technical Writing & Content",
    description:
      "Clear, research-backed articles, documentation, and technical content for tech and finance audiences.",
  },
  {
    icon: LineChart,
    title: "Trading System Consultation",
    description:
      "Guidance on trading strategies, fintech concepts, and market analysis. Learning and exploring algorithmic trading together.",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-foreground">Services & Consulting</h2>
        <p className="mt-4 text-lg text-foreground-secondary">
          Professional services in web development, investment advisory, and technical content creation.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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


