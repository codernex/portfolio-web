"use client";

export default function ExperienceSection() {
  const experiences = [
    {
      company: "Tech Corp",
      role: "Senior Full Stack Developer",
      period: "2022 - Present",
      description:
        "Leading development of microservices architecture and mentoring junior developers.",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      company: "Digital Agency",
      role: "Full Stack Developer",
      period: "2020 - 2022",
      description:
        "Built and maintained multiple client projects with focus on performance and scalability.",
      technologies: ["Next.js", "Express", "MongoDB", "Docker"],
    },
    {
      company: "Startup Inc",
      role: "Frontend Developer",
      period: "2019 - 2020",
      description:
        "Developed responsive web applications and improved user experience.",
      technologies: ["React", "TypeScript", "Tailwind", "Firebase"],
    },
  ];

  return (
    <section className="relative border-t border-zinc-800 bg-zinc-900/20 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-sm text-emerald-500">
            <span className="opacity-60">$ </span>cat experience.log
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white">Experience</h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-emerald-500/50"
            >
              <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-emerald-500">{exp.company}</p>
                </div>
                <span className="font-mono text-sm text-zinc-500">
                  {exp.period}
                </span>
              </div>

              <p className="mb-4 text-zinc-400">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
