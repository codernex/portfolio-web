"use client";

import { CheckCircle2, Terminal } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      company: "EWWFL (Remote)",
      role: "Software Engineer II",
      location: "Tampa, FL",
      period: "Jan 2025 - Present",
      responsibilities: [
        "Led end-to-end migration and integration of payment systems using Stripe and multiple third-party financing APIs.",
        "Designed and implemented high-performance backend services with TypeScript, TypeORM, Redis, and MongoDB aggregations.",
        "Automated data ingestion and synchronization pipelines using Gmail API, SFTP, and AWS S3 with robust cron scheduling.",
        "Optimized frontend performance through SSR conversion, Next.js caching, and RTK Query data fetching.",
        "Integrated e-commerce workflows with Zoho CRM and internal APIs to maintain data consistency.",
      ],
      achievements: [
        "Improved Lighthouse performance score by 140% (from 45 to 95+).",
        "Built a fraud-resistant payment validation system, significantly reducing chargeback incidents.",
        "Developed a session-based abandoned cart recovery system that increased checkout completion rates by over 30%.",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "TypeORM",
        "Redis",
        "Stripe",
        "AWS S3",
        "RTK Query",
      ],
    },
    {
      company: "Softronixs System LTD",
      role: "Lead Fullstack Developer",
      location: "Khulna, BD",
      period: "Feb 2024 - Dec 2024",
      responsibilities: [
        "Designed and developed scalable backend architecture for multi-vendor e-commerce and POS systems using Node.js.",
        "Integrated frontend with Redux and RTK Query to optimize state management and data performance.",
      ],
      achievements: [
        "Improved platform uptime to 99.9% while handling thousands of daily transactions.",
        "Automated delivery workflows via Ecourier API, reducing manual effort by 40%.",
      ],
      technologies: [
        "Node.js",
        "RESTful APIs",
        "Redux",
        "RTK Query",
        "Express",
      ],
    },
    {
      company: "Borno IT",
      role: "Full-stack Developer",
      location: "Jashore, BD",
      period: "Jun 2021 - Jan 2024",
      responsibilities: [
        "Developed APIs using Node.js and Express for data integration with MySQL databases.",
        "Created SPAs with React and Redux for seamless user experience and performance optimization.",
        "Built and maintained employee management systems covering attendance, performance, and HR workflows.",
        "Implemented secure authentication and role-based access control for internal applications.",
      ],
      achievements: [
        "Boosted site speed by 20% and client satisfaction by 30% through WordPress optimization.",
        "Reduced administrative workload by 25% through workflow automation.",
        "Enhanced HR efficiency by 20% with improved UI/UX and responsive design.",
      ],
      technologies: [
        "React",
        "Node.js",
        "MySQL",
        "WordPress",
        "Express",
        "Redux",
      ],
    },
  ];

  return (
    <section className="relative border-t border-zinc-800 bg-zinc-950 px-6 py-24">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16">
          <div className="flex items-center gap-2 font-mono text-sm text-emerald-500">
            <Terminal size={16} />
            <span className="opacity-60">system@codernex:~$</span>
            <span>ls ./experience/history</span>
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Professional <span className="text-emerald-500">Journey</span>
          </h2>
        </div>

        <div className="relative space-y-12 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-10px)] before:w-[1px] before:bg-zinc-800 sm:before:left-1/2">
          {experiences.map((exp, index) => (
            <div key={index} className="group relative">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 z-10 h-6 w-6 -translate-x-[1px] rounded-full border-4 border-zinc-950 bg-emerald-500 transition-transform group-hover:scale-125 sm:left-1/2 sm:-ml-3" />

              <div
                className={`relative flex flex-col ${
                  index % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"
                } items-center`}
              >
                <div className="w-full sm:w-1/2" />

                <div className="mt-8 w-full sm:mt-0 sm:w-1/2 sm:px-8">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-900/60">
                    <div className="mb-4">
                      <span className="font-mono text-xs font-medium uppercase tracking-widest text-emerald-500">
                        {exp.period}
                      </span>
                      <h3 className="mt-1 text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-lg text-zinc-300">
                        {exp.company} <span className="text-zinc-600">|</span>{" "}
                        <span className="text-sm text-zinc-500">
                          {exp.location}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Responsibilities */}
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-sm text-zinc-400"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500/50" />
                            {resp}
                          </li>
                        ))}
                      </ul>

                      {/* Achievements */}
                      <div className="rounded-lg bg-emerald-500/5 p-3">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-500">
                          Key Achievements
                        </p>
                        <ul className="space-y-2">
                          {exp.achievements.map((ach, i) => (
                            <li
                              key={i}
                              className="flex gap-2 text-xs text-zinc-300"
                            >
                              <CheckCircle2
                                size={14}
                                className="mt-0.5 shrink-0 text-emerald-500"
                              />
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[10px] font-medium text-zinc-500 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
