"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const totalSeconds = 30 * 24 * 60 * 60;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Target date: 30 days from now
    const targetDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });

      // Calculate progress percentage (filling up as we get closer)
      const elapsed = totalSeconds - difference / 1000;
      setProgress((elapsed / totalSeconds) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 font-mono text-zinc-400 selection:bg-emerald-500/30">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Brand Header */}
        <div className="mb-12 flex items-center gap-3">
          <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
          <span className="text-xl font-bold tracking-tighter text-white">
            codernex.dev
          </span>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Initializing <span className="text-emerald-500">v1.0</span>
          </h1>
          <p className="mb-10 text-zinc-500">
            A new digital experience is being compiled. Deploying in...
          </p>

          {/* Countdown Clock */}
          <div className="mb-12 flex justify-center gap-4 sm:gap-8">
            {[
              { label: "DD", value: timeLeft.days },
              { label: "HH", value: timeLeft.hours },
              { label: "MM", value: timeLeft.minutes },
              { label: "SS", value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <span className="text-4xl font-black text-white sm:text-6xl">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-500/60">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-12 w-full max-w-md mx-auto">
            <div className="flex justify-between text-[10px] mb-2 uppercase tracking-widest">
              <span>Build Progress</span>
              <span>{Math.max(0, progress).toFixed(2)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800">
              <div
                className="h-full bg-emerald-500 transition-all duration-1000 ease-linear shadow-[0_0_15px_#10b981]"
                style={{ width: `${Math.max(2, progress)}%` }}
              />
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="w-full rounded-md bg-white px-8 py-3 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95 sm:w-auto">
              GET EARLY ACCESS
            </button>
            <a
              href="https://github.com/codernex/portfolio-web"
              className="group flex items-center gap-2 text-sm font-medium hover:text-white transition-colors"
            >
              <span className="h-[1px] w-4 bg-zinc-700 transition-all group-hover:w-8 group-hover:bg-emerald-500" />
              VIEW SOURCE
            </a>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-8 left-0 flex w-full justify-between px-8 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          <span>Status: Building</span>
          <span className="hidden sm:inline">
            Stack: Next.js + Tailwind + Framer
          </span>
          <span>©2024 CODERNEX</span>
        </div>
      </main>
    </div>
  );
}
