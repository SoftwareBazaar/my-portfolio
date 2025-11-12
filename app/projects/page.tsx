import type { Metadata } from "next";
import Image from "next/image";
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

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-foreground">Portfolio Snapshot</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
            <thead className="bg-gray-50 uppercase tracking-wide text-xs font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">Project</th>
                <th scope="col" className="px-4 py-3 text-left">Description</th>
                <th scope="col" className="px-4 py-3 text-left">Frontend</th>
                <th scope="col" className="px-4 py-3 text-left">Backend</th>
                <th scope="col" className="px-4 py-3 text-left">Database</th>
                <th scope="col" className="px-4 py-3 text-left">Notable Integrations</th>
                <th scope="col" className="px-4 py-3 text-left">AI/ML</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="px-4 py-4 font-medium text-foreground">SmartAlgos Platform</td>
                <td className="px-4 py-4 text-foreground-secondary">
                  Algorithmic trading and AI hub for equities, forex, and crypto desks.
                </td>
                <td className="px-4 py-4 text-foreground-secondary">React 18, Tailwind, Framer Motion</td>
                <td className="px-4 py-4 text-foreground-secondary">
                  Node.js/Express, Socket.io, WebSockets
                </td>
                <td className="px-4 py-4 text-foreground-secondary">MongoDB, Redis</td>
                <td className="px-4 py-4 text-foreground-secondary">
                  Electron desktop, Paystack, Stripe, Chart.js, Multisig Escrow
                </td>
                <td className="px-4 py-4 text-foreground-secondary">TensorFlow, PyTorch, NLP</td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-medium text-foreground">Thrift Shop Inventory</td>
                <td className="px-4 py-4 text-foreground-secondary">
                  Retail and donation inventory intelligence with channel integrations.
                </td>
                <td className="px-4 py-4 text-foreground-secondary">React (Vercel), Tailwind</td>
                <td className="px-4 py-4 text-foreground-secondary">
                  Node.js serverless APIs
                </td>
                <td className="px-4 py-4 text-foreground-secondary">MongoDB (assumed)</td>
                <td className="px-4 py-4 text-foreground-secondary">
                  Vercel deployments, barcode/SKU, Stripe, REST automations
                </td>
                <td className="px-4 py-4 text-foreground-secondary">Extensible (planned)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {projects.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-foreground-secondary">
            No projects yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
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
          );})}
        </div>
      )}
    </div>
  );
}

