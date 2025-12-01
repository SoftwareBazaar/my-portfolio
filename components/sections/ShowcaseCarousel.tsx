"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CarouselItem {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  badges: string[];
}

const slides: CarouselItem[] = [
  {
    title: "Algorithmic Trading Systems",
    subtitle: "MT5 Expert Advisors & ML Agents",
    description:
      "Custom-built trading algorithms tailored to your risk profile. From rule-based EAs to reinforcement learning agents—backtested, optimized, and ready for live execution.",
    ctaLabel: "Book Consultation",
    ctaHref: "https://calendly.com/johnwanyaga37/30min",
    image: "/images/placeholders/carousel-strategy.svg",
    badges: ["MT5", "Machine Learning", "Live Trading"],
  },
  {
    title: "Fintech Platform Development",
    subtitle: "Production-Grade Trading Infrastructure",
    description:
      "Build scalable trading platforms with real-time data pipelines, brokerage integrations, and modern web technologies. From MVP to institutional-grade systems.",
    ctaLabel: "View Projects",
    ctaHref: "/projects",
    image: "/images/placeholders/project-placeholder.svg",
    badges: ["React", "Real-time", "WebSockets"],
  },
  {
    title: "Investment Advisory",
    subtitle: "Quantitative Portfolio Management",
    description:
      "Personalized investment analysis backed by quantitative research. Risk management frameworks, portfolio optimization, and long-term wealth strategies for serious investors.",
    ctaLabel: "Schedule Call",
    ctaHref: "https://calendly.com/johnwanyaga37/30min",
    image: "/images/placeholders/article-placeholder.svg",
    badges: ["Portfolio Analysis", "Risk Management", "Alpha Generation"],
  },
  {
    title: "Quant Research & Writing",
    subtitle: "Strategy Analysis & Technical Content",
    description:
      "Deep-dive research articles, strategy backtests, and technical documentation for trading desks and fintech teams. Transform complex systems into actionable insights.",
    ctaLabel: "Read Articles",
    ctaHref: "/articles",
    image: "/images/placeholders/article-placeholder.svg",
    badges: ["Backtesting", "Market Analysis", "Documentation"],
  },
];

export function ShowcaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(activeIndex + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const goTo = (index: number) => {
    setActiveIndex(((index % slides.length) + slides.length) % slides.length);
  };

  const activeSlide = slides[activeIndex];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white shadow-xl dark:border-gray-800">
        <div className="grid gap-8 md:grid-cols-[3fr_2fr]">
          <div className="flex flex-col justify-between p-8 sm:p-12">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Professional Services
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{activeSlide.title}</h2>
              <p className="mt-4 text-lg text-slate-200">{activeSlide.subtitle}</p>
              <p className="mt-6 text-base leading-relaxed text-slate-300">{activeSlide.description}</p>
            </div>
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                {activeSlide.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-slate-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <Button href={activeSlide.ctaHref} variant="primary" asLink className="inline-flex items-center gap-2">
                {activeSlide.ctaLabel}
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex h-full w-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={slide.title} className="relative h-[360px] min-w-full md:h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={index === activeIndex}
                  />
                </div>
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`h-2 w-8 rounded-full transition ${
                        index === activeIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex - 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex + 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


