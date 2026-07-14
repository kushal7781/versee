"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  ChevronDown,
  LogOut,
  User as UserIcon,
  Package,
  ShoppingCart,
  Menu,
  X,
  Search,
} from "lucide-react";
import Logo from "@/components/shared/Logo";

const NAV_LINKS = [
  { href: "/products", label: "Components" },
  { href: "/configurator", label: "PC Builder" },
  { href: "/peripherals", label: "Peripherals" },
  { href: "/support", label: "Support" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-black/40 backdrop-blur-md text-white transition-all duration-300">
      <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-8">
        {/* Left Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo size={28} />
            <span className="font-display text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-white/90">
              PCVerse
            </span>
          </Link>
        </div>

        {/* Center Section */}
        <div className="hidden md:flex items-center gap-[36px]">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="group relative text-[15px] font-medium text-[#d4d4d4] transition-colors duration-300 hover:text-white whitespace-nowrap"
            >
              {label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-[18px]">
          <div className="hidden items-center lg:flex relative group">
            <Search className="absolute left-3 h-4 w-4 text-[#888] transition-colors duration-300 group-focus-within:text-white" />
            <input 
              type="text" 
              placeholder="Search components..." 
              className="h-[42px] w-[280px] rounded-xl border border-[#333] bg-[#1a1a1a] px-10 py-1 text-sm text-white placeholder:text-[#888] transition-all duration-300 focus-visible:outline-none focus-visible:border-white/30 focus-visible:ring-1 focus-visible:ring-white/20"
            />
          </div>

          <Link
            href="/cart"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/[0.08]"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>

          {status === "loading" ? (
            <div className="hidden h-9 w-20 animate-pulse rounded-md bg-muted md:block" />
          ) : session ? (
            <div className="relative hidden md:block" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-xl p-1 pr-2 transition-all duration-300 hover:bg-white/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {initials}
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-56 rounded-md border border-white/10 bg-black/60 backdrop-blur-md p-1 text-white shadow-md animate-in fade-in zoom-in-95">
                  <div className="border-b border-white/10 px-2 py-2">
                    <p className="truncate text-sm font-medium">{session.user?.name}</p>
                    <p className="truncate text-xs text-white/60">{session.user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      <UserIcon className="h-4 w-4" /> Profile
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      <Package className="h-4 w-4" /> Orders
                    </Link>
                  </div>
                  <div className="border-t border-white/10 pt-1">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-red-400 hover:bg-white/10"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-[18px]">
              <Link
                href="/login"
                className="inline-flex h-[42px] items-center justify-center px-4 text-[15px] font-medium text-white transition-all duration-300 hover:text-white/80"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex h-[42px] items-center justify-center rounded-xl bg-white px-5 text-[15px] font-semibold text-black transition-all duration-300 hover:bg-gray-200"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute left-0 top-16 w-full border-b border-white/10 bg-black/60 backdrop-blur-md px-4 py-4 md:hidden shadow-lg text-white">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="h-9 w-full rounded-md border border-white/20 bg-black/20 px-9 py-1 text-sm text-white placeholder:text-white/50 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
              />
            </div>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-white/10 pt-4">
              {session ? (
                <div className="flex flex-col gap-2">
                  <div className="px-3 pb-2">
                    <p className="text-sm font-medium">{session.user?.name}</p>
                    <p className="text-xs text-white/60">{session.user?.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-accent"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
