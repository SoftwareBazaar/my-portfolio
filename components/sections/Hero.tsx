import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function Hero() {
  // Fetch hero settings from database
  const supabase = createSupabaseServerClient();
  const { data: hero } = await supabase
    .from("hero_settings")
    .select("*")
    .single();

  // Fallback to default values if no hero settings exist
  const title = hero?.title || "Full-Stack Developer, Investment Advisor & Technical Writer";
  const subtitle = hero?.subtitle || "Hi, I'm John Wanyaga";
  const description = hero?.description || "I build modern web applications, provide stock and investment advisory services, and create in-depth technical content. Passionate about fintech, trading systems, and helping clients grow their wealth.";
  const primaryButtonText = hero?.primary_button_text || "View Projects";
  const primaryButtonLink = hero?.primary_button_link || "/projects";
  const secondaryButtonText = hero?.secondary_button_text || "Book a Discovery Call";
  const secondaryButtonLink = hero?.secondary_button_link || "https://calendly.com/johnwanyaga";
  const heroImageUrl = hero?.hero_image_url || "/images/profile/profile-placeholder.jpg";
  const backgroundImageUrl = hero?.background_image_url;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-background/50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {backgroundImageUrl && (
        <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]">
          <Image
            src={backgroundImageUrl}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600 backdrop-blur-sm dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </div>

            {/* Name - Bold and prominent */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-blue-600 bg-clip-text text-transparent">
                  John Wanyaga
                </span>
              </h2>
            </div>

            {/* Title */}
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title.split(',').map((line: string, i: number) => {
                const trimmedLine = line.trim();
                return (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        {trimmedLine}
                      </span>
                    ) : (
                      trimmedLine
                    )}
                    {i < title.split(',').length - 1 && ','}
                  </span>
                );
              })}
            </h1>

            {/* Description */}
            {description && (
              <p className="mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
                {description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {primaryButtonText && primaryButtonLink && (
                <a
                  href={primaryButtonLink}
                  className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                >
                  {primaryButtonText}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <a
                  href={secondaryButtonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border-2 border-foreground/10 bg-background px-6 py-3 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
                >
                  <Calendar className="h-5 w-5" />
                  {secondaryButtonText}
                </a>
              )}
            </div>

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Full-Stack Development
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                Investment Advisory
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                Technical Writing
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
              {/* Subtle glow effect */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-60 blur-3xl dark:opacity-40" />
              
              {/* Image container - clean and minimal */}
              <div className="relative aspect-square overflow-hidden rounded-full border border-foreground/5 bg-background shadow-xl dark:border-foreground/10 dark:shadow-2xl">
                <Image
                  src={heroImageUrl}
                  alt={subtitle || "John Wanyaga"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Subtle decorative elements */}
              <div className="absolute -right-8 top-1/4 h-32 w-32 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
              <div className="absolute -left-8 bottom-1/4 h-40 w-40 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
