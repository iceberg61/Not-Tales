"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Wraps any page that should be gated behind login. Renders nothing while
// checking (avoids a flash of protected content) and nothing while
// redirecting — the redirect target remembers where you were headed, so
// login can send you right back after signing in.
export default function RequireAuth({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setAllowed(true);
    }
  }, [pathname, router]);

  if (!allowed) return null;
  return children;
}
