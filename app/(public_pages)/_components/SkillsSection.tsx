"use client";

export default function SkillsSection() {
  const skills = {
    Frontend: [
      "React",
      "Next.js",
      "Redux.js / Redux Toolkit",
      "RTK Query",
      "React(TanStack) Query",
      "TanStack Rounter",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    Backend: [
      "Node.js",
      "NestJS",
      "Express",
      "Apache Kafka",
      "Redis",
      "TypeORM",
      "PrismaORM",
      "PostgreSQL",
      "MongoDB",
      "OAuth",
      "JWT",
    ],
    Tools: [
      "Git",
      "Docker",
      "AWS",
      "Vercel",
      "GitHub Actions",
      "Postman",
      "Linux",
    ],
    Other: ["REST APIs", "GraphQL", "WebSockets", "Testing", "CI/CD"],
  };

  return (
    <section className="relative border-t border-zinc-800 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-sm text-emerald-500">
            <span className="opacity-60">$ </span>ls skills/
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white">
            Skills & Technologies
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <h3 className="mb-4 font-mono text-sm text-emerald-500">
                {category}/
              </h3>
              <ul className="space-y-2">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-zinc-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
