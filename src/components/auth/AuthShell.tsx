import type { ReactNode } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source src="/videos/sekiro.mp4" type="video/mp4" />
      </video>
      
      {/* Lighter dark overlay so the video shines through */}
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* Highly Transparent Glass Card */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-lg border border-white/20 bg-black/30 backdrop-blur-[6px] p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          <Link href="/" className="mb-6 flex items-center gap-2 drop-shadow-lg">
            <Logo size={32} />
            <span className="font-display text-xl font-bold tracking-tight text-white">PCVerse</span>
          </Link>
          <h2 className="text-center text-2xl font-bold tracking-tight text-white uppercase drop-shadow-md">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm font-medium text-white drop-shadow-md">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 drop-shadow-md">
          {children}
        </div>

        <div className="mt-6 text-center text-sm font-medium text-white drop-shadow-md">
          {footer}
        </div>
      </div>
    </div>
  );
}
