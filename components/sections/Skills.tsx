const skillCategories = [
  {
    name: "Trading & Automation",
    skills: ["MT5 Expert Advisors", "MQL5", "Algorithmic Strategies", "Backtesting", "Live Execution"],
  },
  {
    name: "Machine Learning & Quant",
    skills: ["TensorFlow", "PyTorch", "Reinforcement Learning", "Time Series Analysis", "Statistical Modeling"],
  },
  {
    name: "Fintech Stack",
    skills: ["React", "Next.js", "Node.js", "PostgreSQL", "Real-time Data Pipelines"],
  },
  {
    name: "Research & Advisory",
    skills: ["Quantitative Research", "Risk Management", "Portfolio Optimization", "Market Analysis", "Technical Writing"],
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

