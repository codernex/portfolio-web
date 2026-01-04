"use client";

import {
  ChevronDown,
  Cpu,
  Globe,
  LayoutDashboard,
  Lock,
  LogOut,
  Menu,
  Terminal,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const navLinks = [
    { name: "About", path: "/about", label: "whoami" },
    { name: "Projects", path: "/projects", label: "ls_projects" },
    { name: "Blog", path: "/blog", label: "cat_blog" },
    { name: "Contact", path: "/contact", label: "ssh_contact" },
  ];

  return (
    <nav
      className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
        scrolled || isOpen
          ? "border-b border-zinc-800 bg-zinc-950"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group relative z-[110]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded bg-emerald-500 text-black">
              <Terminal size={20} strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-base font-bold tracking-tighter text-white">
                CODER<span className="text-emerald-500">NEX</span>
              </span>
              <span className="font-mono text-[11px] text-zinc-500 leading-none">
                v1.0.0-stable
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 font-mono text-sm font-medium transition-colors ${
                    isActive
                      ? "text-emerald-400"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span className="opacity-50 mr-1.5">$</span>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                  )}
                </Link>
              );
            })}

            <div className="mx-2 h-4 w-[1px] bg-zinc-800" />

            {/* Login Button - Desktop */}
            {session.status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-emerald-500/50 bg-emerald-500/10 font-mono text-xs text-emerald-400 hover:bg-emerald-500/20 transition-all outline-none cursor-pointer">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{session.data?.user?.name || "ADMIN"}</span>
                  <ChevronDown size={12} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-950 border-zinc-800 text-zinc-400 font-mono text-xs w-48">
                  <DropdownMenuLabel className="text-zinc-500">
                    SESSION_CONTROLS
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="hover:bg-zinc-900 hover:text-emerald-400 cursor-pointer gap-2">
                    <Link
                      href="/dashboard/projects"
                      className="flex items-center gap-2 w-full"
                    >
                      <LayoutDashboard size={14} /> ./open_dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer gap-2"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut size={14} /> terminate_session
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/5 font-mono text-xs font-bold text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all"
              >
                sudo login
              </Link>
            )}

            {/* System Status Mockup */}
            <div className="ml-4 hidden lg:flex items-center gap-4 font-mono text-xs text-zinc-600">
              <div className="flex items-center gap-1.5">
                <Cpu size={12} className="text-emerald-500/50" />
                <span>CPU: 2.4%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={12} className="text-cyan-500/50" />
                <span>PING: 24ms</span>
              </div>
            </div>
          </div>

          <button
            className="md:hidden relative z-[110] text-zinc-400 hover:text-white p-2"
            onClick={toggleMenu}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-[105] w-full bg-zinc-950 transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full pt-28 pb-12 px-8">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-4 mb-8">
            Terminal_Navigation_Menu
          </div>

          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="group flex items-center justify-between font-mono text-2xl text-zinc-100 hover:text-emerald-400 transition-colors"
              >
                <span className="flex items-center">
                  <span className="text-emerald-500 mr-4">{">"}</span>
                  {link.name}
                </span>
                <span className="text-xs text-zinc-600 italic">
                  {link.label}
                </span>
              </Link>
            ))}

            <div className="pt-4">
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-emerald-500 py-4 font-mono text-lg font-bold text-black"
              >
                <Lock size={20} />
                INITIALIZE_LOGIN
              </Link>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-zinc-900 font-mono text-xs text-zinc-500 space-y-2">
            <p>Engineer: Borhan Uddin [cite: 1]</p>
            <p>Base_Loc: Khulna, Bangladesh [cite: 2]</p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Status: SESSION_ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
