const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "Supabase", "PostgreSQL", "REST APIs"],
  },
  {
    name: "Investment & Finance",
    skills: ["Stock Analysis", "Portfolio Management", "Risk Assessment", "Market Research", "Financial Planning"],
  },
  {
    name: "Tools & Content",
    skills: ["Git", "Vercel", "Technical Writing", "Research", "Documentation"],
  },
];

export function Skills() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-foreground">Skills & Technologies</h2>
        <p className="mt-4 text-lg text-foreground-secondary">
          Technologies I work with and love
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category) => (
          <div key={category.name} className="text-center">
            <h3 className="mb-4 text-xl font-semibold text-foreground">
              {category.name}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

