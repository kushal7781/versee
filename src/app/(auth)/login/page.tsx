"use client";

import { useState, type FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import InputField from "@/components/ui/GlassField"; // Kept filename for compatibility
import SubmitButton from "@/components/ui/SubmitButton";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="spinner text-primary" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <AuthShell
      title={
        <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(239,68,68,0.8)]">
          READY FOR DISTRUCTION
        </span>
      }
      subtitle="Sign in to your account to continue"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="flex items-center gap-2 rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <InputField
          id="email"
          label="Email address"
          icon={Mail}
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputField
          id="password"
          label="Password"
          icon={Lock}
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between mt-2 drop-shadow-md">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary cursor-pointer"
            />
            <span>Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
            Forgot password?
          </Link>
        </div>

        <SubmitButton loading={loading} className="mt-4 drop-shadow-lg">
          Sign In
        </SubmitButton>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-sm drop-shadow-md">
            <span className="bg-black/30 px-2 text-gray-300 font-medium backdrop-blur-md rounded-md">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 drop-shadow-lg">
          <button
            type="button"
            onClick={() => signIn("google")}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-white/20 transition-colors"
          >
            <svg className="h-5 w-5 drop-shadow" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => signIn("apple")}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-white/20 transition-colors"
          >
            <svg className="h-5 w-5 fill-current drop-shadow" viewBox="0 0 24 24">
              <path d="M12.15 4.54c0-1.89 1.4-3.54 3.39-3.54C16 2.76 17 4.19 17 5.75c0 2-1.48 3.59-3.52 3.59-.6 0-1.33-.21-1.33-.21s-.01-.01-.01-.01c0 0 .01-.02.01-.05zm.36 1.83c-1.36-.08-2.65.65-3.32.65-.67 0-1.83-.58-2.9-.58-1.46 0-2.8.84-3.56 2.12-1.55 2.65-.4 6.55 1.1 8.68.73 1.04 1.59 2.21 2.73 2.16 1.09-.04 1.5-.7 2.81-.7 1.3 0 1.69.7 2.83.68 1.15-.02 1.89-1.07 2.61-2.12.83-1.19 1.17-2.35 1.19-2.42-.03-.01-2.28-.86-2.31-3.41-.03-2.13 1.76-3.17 1.84-3.23-1.02-1.48-2.59-1.68-3.16-1.74-1.29-.12-2.52.74-3.21.74-.69 0-1.68-.74-2.65-.83z" />
            </svg>
            Apple
          </button>
        </div>
      </div>
    </AuthShell>
  );
}
