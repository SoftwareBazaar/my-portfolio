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
            I'm a developer, founder, and writer passionate about building impactful
            solutions. With years of experience in software development, I've worked on
            everything from small startups to large-scale applications. My journey has
            been driven by curiosity, continuous learning, and the desire to solve
            real-world problems through technology.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Background & Experience
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
            I've spent the last several years honing my skills across the full stack,
            from frontend frameworks like React and Next.js to backend systems using
            Node.js and Python. Along the way, I've founded multiple companies, each
            teaching me valuable lessons about product development, team building, and
            business strategy.
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
                <li>Tailwind CSS</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Backend</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-foreground-secondary">
                <li>Node.js & Express</li>
                <li>Python & Django</li>
                <li>PostgreSQL & MongoDB</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground">Values & Approach</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
            I believe in writing clean, maintainable code and building products that
            truly serve their users. My approach combines technical excellence with
            user-centric design, always keeping the end goal in mind. I'm passionate
            about sharing knowledge through writing and contributing to the open-source
            community.
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

