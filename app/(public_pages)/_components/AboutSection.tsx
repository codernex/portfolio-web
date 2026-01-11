export default function AboutSection() {
  return (
    <section className="relative border-t border-zinc-800 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-sm text-emerald-500">
            <span className="opacity-60">$ </span>whoami
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white">About Me</h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4 text-zinc-400">
            <p>
              {` I'm a passionate developer with 4+ years of experience building
              web applications that users love. My journey started with a simple
              "Hello World" and evolved into architecting complex distributed
              systems.`}
            </p>
            <p>
              {`When I'm not coding, you'll find me contributing to open source,
              writing technical articles, or exploring new technologies. I
              believe in continuous learning and sharing knowledge with the
              community.`}
            </p>
            <p>
              Currently focused on building scalable applications with React,
              Next.js, and Node.js, while exploring the exciting world of AI and
              machine learning.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="mb-4 flex items-center gap-2 text-xs">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-zinc-600">stats.json</span>
            </div>

            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-emerald-500">{'"experience":'}</span>
                <span className="text-white">{'"4+ years"'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-500">{'"projects":'}</span>
                <span className="text-white">{'"50+ completed"'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-500">{'"clients":'}</span>
                <span className="text-white">{'"30+ satisfied"'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-500">{'"coffee":'}</span>
                <span className="text-white">{'"∞ cups"'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
