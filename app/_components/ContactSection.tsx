"use client";
import { Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="relative border-t border-zinc-800 px-6 py-24">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <span className="font-mono text-sm text-emerald-500">
            <span className="opacity-60">$ </span>./init_handshake.sh
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white">Contact Me</h2>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2 text-[10px] font-mono text-zinc-500">
            <span className="text-emerald-500">STDOUT:</span> READY FOR INPUT
          </div>
          <form className="p-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="Name"
                className="w-full bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-300 focus:border-emerald-500/50 focus:outline-none transition-all"
              />
              <input
                placeholder="Email"
                className="w-full bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-300 focus:border-emerald-500/50 focus:outline-none transition-all"
              />
            </div>
            <textarea
              placeholder="Message Payload..."
              rows={5}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-300 focus:border-emerald-500/50 focus:outline-none transition-all"
            />
            <button className="flex w-full items-center justify-center gap-2 rounded bg-emerald-500 py-3 font-mono text-sm font-bold text-black hover:bg-emerald-400 transition-colors">
              <Send className="h-4 w-4" /> SEND_MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
