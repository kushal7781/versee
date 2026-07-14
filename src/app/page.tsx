import Link from "next/link";
import { auth } from "@/auth";
import Navbar from "@/components/layout/Navbar";
import { Cpu, HardDrive, Monitor, ShieldCheck, Zap } from "lucide-react";

const CATEGORIES = [
  { name: "Processors", icon: Cpu, count: "124 Products" },
  { name: "Graphics Cards", icon: Monitor, count: "86 Products" },
  { name: "Storage", icon: HardDrive, count: "203 Products" },
];

export default async function HomePage() {
  await auth();

  return (
    <div className="relative flex min-h-screen flex-col text-white">
      {/* Background Video */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/forza.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Premium PC Parts.
                <br />
                Uncompromised Quality.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Build your ultimate workstation or gaming rig with our curated selection of high-performance components. Fast shipping, secure checkout, and expert support.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/products"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Shop Components
                </Link>
                <Link
                  href="/configurator"
                  className="text-sm font-semibold leading-6 text-foreground hover:text-muted-foreground transition-colors"
                >
                  Open PC Builder <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Shop by Category</h2>
              <Link href="/categories" className="text-sm font-medium text-primary hover:underline">
                View all categories
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((category) => (
                <div
                  key={category.name}
                  className="group relative flex flex-col items-center justify-center rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-12 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <category.icon className="h-12 w-12 mb-6 text-white/70 group-hover:text-white transition-colors" />
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <p className="mt-2 text-sm text-white/50 group-hover:text-white/80">{category.count}</p>
                  <Link href={`/category/${category.name.toLowerCase()}`} className="absolute inset-0">
                    <span className="sr-only">View {category.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-white/10 bg-black/40 backdrop-blur-md py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-white">Secure Payments</h3>
                <p className="mt-2 text-sm text-white/70">All transactions are secured with industry-leading encryption.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-white">Fast Shipping</h3>
                <p className="mt-2 text-sm text-white/70">Orders placed before 2PM are dispatched the same day.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-white">Expert Support</h3>
                <p className="mt-2 text-sm text-white/70">Need help picking parts? Our tech team is here for you.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 bg-black/50 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} PCVerse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
