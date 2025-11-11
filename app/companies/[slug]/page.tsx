import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { getCompanyBySlug, getAllCompanies } from "@/lib/content";
import Link from "next/link";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const companies = await getAllCompanies();
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) {
    return {
      title: "Company Not Found",
    };
  }

  return {
    title: company.name,
    description: company.tagline,
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/companies"
        className="mb-8 inline-flex items-center gap-2 text-foreground-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Companies
      </Link>

      <article>
        <header className="mb-8">
          {company.logo && (
            <div className="mb-6 flex h-20 items-center">
              <img
                src={company.logo}
                alt={company.name}
                className="h-full object-contain"
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-2">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {company.name}
            </h1>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                company.status === "Active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : company.status === "Acquired"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              }`}
            >
              {company.status}
            </span>
          </div>
          <p className="mb-4 text-xl text-foreground-secondary">
            {company.tagline}
          </p>
          <div className="mb-6 flex items-center gap-4 text-sm text-foreground-secondary">
            <span>{company.role}</span>
            <span>•</span>
            <span>Founded {company.founded}</span>
          </div>
          {company.website && (
            <Button
              href={company.website}
              variant="primary"
              asLink
              className="inline-flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </Button>
          )}
        </header>

        <div className="prose prose-lg mx-auto max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap text-foreground-secondary">
            {company.content}
          </div>
        </div>
      </article>
    </div>
  );
}

