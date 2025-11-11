import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FeaturedCompanies } from "@/components/sections/FeaturedCompanies";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { Skills } from "@/components/sections/Skills";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getFeaturedProjects } from "@/lib/content";
import { getFeaturedCompanies } from "@/lib/content";
import { getLatestArticles } from "@/lib/content";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects(4);
  const featuredCompanies = await getFeaturedCompanies(3);
  const latestArticles = await getLatestArticles(4);

  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <FeaturedCompanies companies={featuredCompanies} />
      <LatestArticles articles={latestArticles} />
      <Skills />
      <ContactCTA />
    </div>
  );
}

