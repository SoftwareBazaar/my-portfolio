import { Button } from "@/components/ui/Button";
import { CalendarClock, PenTool, LineChart, Bot, MessageCircle, TrendingUp } from "lucide-react";

const offerings = [
  {
    icon: Bot,
    title: "Algorithmic Trading Systems",
    description:
      "Design and deploy MT5 expert advisors, machine learning trading agents, and rule-based strategies tailored to your risk profile and execution requirements.",
  },
  {
    icon: LineChart,
    title: "Fintech Platform Development",
    description:
      "Build production-grade trading platforms, brokerage integrations, and market data pipelines with modern web technologies and real-time architecture.",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory & Analysis",
    description:
      "Customized portfolio analysis, risk management frameworks, and long-term wealth strategies backed by quantitative research and market intelligence.",
  },
  {
    icon: PenTool,
    title: "Quant Research & Writing",
    description:
      "Deep-dive research articles, strategy backtests, and technical documentation for trading desks, fintech teams, and institutional audiences.",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-foreground">Consulting & Advisory Services</h2>
        <p className="mt-4 text-lg text-foreground-secondary">
          End-to-end solutions for trading automation, fintech infrastructure, and quantitative strategy development.
        </p>
        <p className="mt-3 text-sm font-medium text-primary">
          Ideal for small prop desks, boutique advisory firms, and fintech startups
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
          Project-based & retainer engagements available — Starting at $500
        </p>
        <p className="text-xs text-foreground-secondary">
          Hourly consulting: $10/hour for strategy sessions and code reviews
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            href="https://calendly.com/johnwanyaga37/30min"
            variant="primary"
            className="inline-flex items-center gap-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
            asLink
          >
            <CalendarClock className="h-4 w-4" />
            Schedule Discovery Call
          </Button>
          <Button
            href="https://wa.me/254746054224"
            variant="secondary"
            className="inline-flex items-center gap-2 shadow-md hover:shadow-lg"
            asLink
          >
            <MessageCircle className="h-4 w-4" />
            Quick Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}


