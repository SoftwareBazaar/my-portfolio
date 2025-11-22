import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ShowcaseCarousel } from "@/components/sections/ShowcaseCarousel";
import { FeaturedCompanies } from "@/components/sections/FeaturedCompanies";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { Skills } from "@/components/sections/Skills";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Services } from "@/components/sections/Services";
import { getFeaturedProjects } from "@/lib/content";
import { getFeaturedCompanies } from "@/lib/content";
import { getLatestArticles } from "@/lib/content";

export const revalidate = 0; // Disable caching for this page

export default async function Home() {
  const featuredProjects = await getFeaturedProjects(4);
  const featuredCompanies = await getFeaturedCompanies(3);
  const latestArticles = await getLatestArticles(4);

  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <ShowcaseCarousel />
      <FeaturedCompanies companies={featuredCompanies} />
      <LatestArticles articles={latestArticles} />
      <Services />
      <Skills />
      <ContactCTA />
    </div>
  );
}

