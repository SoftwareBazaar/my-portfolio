import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-foreground">Featured Projects</h2>
        <p className="mt-4 text-lg text-foreground-secondary">
          Production-ready trading platforms, research tools, and retail intelligence products
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const imageSrc = project.thumbnail || "/images/placeholders/project-placeholder.svg";
          return (
          <Card key={project.slug} href={`/projects/${project.slug}`}>
            <div className="flex h-full flex-col">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <Image
                  src={imageSrc}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      project.status === "Live"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : project.status === "In Development"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="mb-4 flex-1 text-sm text-foreground-secondary">
                  {project.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs text-foreground-secondary dark:bg-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground-secondary">
                    {formatDate(project.date)}
                  </span>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground-secondary transition-colors hover:text-primary"
                        aria-label="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground-secondary transition-colors hover:text-primary"
                        aria-label="Live site"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );})}
      </div>

      <div className="mt-12 text-center">
        <Button href="/projects" variant="secondary" asLink>
          View All Projects
        </Button>
      </div>
    </section>
  );
}

