import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { getProjectBySlug, getAllProjects } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-foreground-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <article>
        <header className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
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
          <p className="mb-4 text-xl text-foreground-secondary">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
            <span>{formatDate(project.date)}</span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-gray-100 px-2 py-1 dark:bg-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-6 flex gap-4">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  variant="primary"
                  asLink
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live Site
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  variant="secondary"
                  asLink
                  className="inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              )}
            </div>
          )}
        </header>

        {project.thumbnail && (
          <div className="mb-8 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg mx-auto max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap text-foreground-secondary">
            {project.content}
          </div>
        </div>
      </article>
    </div>
  );
}

