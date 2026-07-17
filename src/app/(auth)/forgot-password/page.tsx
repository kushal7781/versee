"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import InputField from "@/components/ui/GlassField";
import SubmitButton from "@/components/ui/SubmitButton";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simulate API call for sending reset link
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <AuthShell
      title={
        <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(239,68,68,0.8)]">
          RECOVER ACCESS
        </span>
      }
      subtitle="Enter your email to receive a password reset link"
      footer={
        <>
          Remembered your password?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Back to Sign in
          </Link>
        </>
      }
    >
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <SubmitButton loading={loading} className="mt-4 drop-shadow-lg">
            Send Reset Link
          </SubmitButton>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">Check your email</h3>
          <p className="text-sm text-gray-300">
            If an account exists with <span className="font-semibold text-white">{email}</span>, we&apos;ve sent instructions to reset your password.
          </p>
          <Link 
            href="/login" 
            className="mt-6 flex w-full items-center justify-center rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 transition-colors"
          >
            Return to Login
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
