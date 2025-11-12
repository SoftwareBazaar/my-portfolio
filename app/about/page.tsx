import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background, experience, and approach",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">About Me</h1>
      </div>

      <div className="prose prose-lg mx-auto dark:prose-invert">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground">Professional Story</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
            I&apos;m an algorithmic trader, fintech engineer, and writer crafting institutional-grade
            tooling for multi-asset desks. I began in agricultural education and extension—designing
            knowledge systems for rural producers—before pivoting into finance technologies. Today I
            architect platforms like SmartAlgos, build MT5 expert advisors, and document the journey
            through thoughtful research and actionable articles.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Background & Experience
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
            My cross-disciplinary background combines agricultural systems thinking with quantitative
            analysis. Over the years I&apos;ve evolved from education programmes to trading floors—leading
            engineering and research for algorithmic desks, consulting for fintech startups, and
            creating machine learning trading agents that adapt to market microstructure.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground">Skills & Expertise</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Frontend</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-foreground-secondary">
                <li>React & Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS & Design Systems</li>
                <li>Electron desktop integrations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Backend</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-foreground-secondary">
                <li>Node.js & Express</li>
                <li>Python data pipelines</li>
                <li>MongoDB, PostgreSQL & Redis</li>
                <li>RESTful & WebSocket APIs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground">Values & Approach</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
            I balance quantitative rigour with empathy for the operators using the tools.
            Every build starts with risk management, observability, and documentation baked in.
            Writing is central to my process—I craft investor briefs, product manuals, and academic
            pieces that demystify complex technology for stakeholders.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Button
            href="/resume.pdf"
            variant="primary"
            asLink
            className="inline-flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </Button>
        </div>
      </div>
    </div>
  );
}

