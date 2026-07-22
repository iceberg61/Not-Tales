"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Mail } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import AuthInput from "@/components/AuthInput";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle={`If an account exists for ${email}, we've sent a 6-digit code.`}
        footer={
          <Link href="/login" className="font-medium text-brown-dark hover:underline">
            Back to login
          </Link>
        }
      >
        <p className="text-sm text-ink/50 text-center mb-6">
          Didn&apos;t get it? Check your spam folder, or try again in a minute.
        </p>
        <Link
          href={`/reset-password?email=${encodeURIComponent(email)}`}
          className="block w-full text-center bg-ink text-cream rounded-pill py-3 font-medium hover:bg-brown-dark transition-colors"
        >
          I have my code
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a 6-digit reset code."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-brown-dark hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <AuthInput
          icon={Mail}
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-cream rounded-pill py-3 font-medium hover:bg-brown-dark transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send code"}
        </button>
      </form>
    </AuthLayout>
  );
}