"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Mail, Hash, Lock } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import AuthInput from "@/components/AuthInput";

// Reads ?email=... to prefill the field when arriving from Forgot Password —
// still fully usable on its own if someone navigates here directly.
function ResetPasswordForm() {
  const router = useRouter();
  const prefillEmail = useSearchParams().get("email") || "";

  const [form, setForm] = useState({ email: prefillEmail, otp: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.otp) {
      setError("Email and reset code are required.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        email: form.email,
        otp: form.otp,
        password: form.password,
      });
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Enter your reset code"
      subtitle="Check your email for a 6-digit code, then set a new password."
      footer={
        <Link href="/login" className="font-medium text-brown-dark hover:underline">
          Back to login
        </Link>
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
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />

        <AuthInput
          icon={Hash}
          label="6-digit code"
          name="otp"
          inputMode="numeric"
          maxLength={6}
          value={form.otp}
          onChange={handleChange}
          placeholder="123456"
        />

        <AuthInput
          icon={Lock}
          label="New password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="At least 8 characters"
        />

        <AuthInput
          icon={Lock}
          label="Confirm new password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-cream rounded-pill py-3 font-medium hover:bg-brown-dark transition-colors disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}