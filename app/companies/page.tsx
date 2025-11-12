import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "lucide-react";
import { getAllCompanies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Companies",
  description: "Companies I&apos;ve founded and built",
};

export default async function CompaniesPage() {
  const companies = await getAllCompanies();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Companies</h1>
        <p className="mt-4 text-lg text-foreground-secondary">
          Ventures I&apos;ve founded and built throughout my career
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-foreground-secondary">
            No companies yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => {
            const logoSrc = company.logo || "/images/placeholders/company-placeholder.svg";
            return (
            <Card key={company.slug} href={`/companies/${company.slug}`}>
              <div className="flex h-full flex-col">
                <div className="relative mb-4 flex h-16 w-full items-center">
                  <Image
                    src={logoSrc}
                    alt={company.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {company.name}
                  </h3>
                  <p className="mb-4 text-sm text-foreground-secondary">
                    {company.tagline}
                  </p>
                  <div className="mb-4 flex items-center gap-2 text-sm text-foreground-secondary">
                    <span>{company.role}</span>
                    <span>•</span>
                    <span>Founded {company.founded}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        company.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : company.status === "Acquired"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {company.status}
                    </span>
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground-secondary transition-colors hover:text-primary"
                        aria-label="Website"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
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

