import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { ExternalLink, Github } from "lucide-react";
import { getAllProjects } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of my projects and side work",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Projects</h1>
        <p className="mt-4 text-lg text-foreground-secondary">
          A collection of my work, from side projects to full-scale applications
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-foreground-secondary">
            No projects yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.slug} href={`/projects/${project.slug}`}>
              <div className="flex h-full flex-col">
                {project.thumbnail && (
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
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
                    {project.tags.map((tag) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

