const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    name: "Tools & Others",
    skills: ["Git", "Docker", "AWS", "CI/CD", "Figma"],
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

      <div className="grid gap-8 md:grid-cols-3">
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

