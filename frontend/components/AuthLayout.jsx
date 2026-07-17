import Link from "next/link";

// Shared shell for Login / Register / Forgot / Reset Password pages
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <span className="w-6 h-6 rounded-full bg-brown-dark inline-block" />
          <span className="font-display text-xl font-semibold">Not Tales</span>
        </Link>

        <div className="bg-cream-2 rounded-3xl p-8 md:p-10 shadow-sm">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-center">{title}</h1>
          {subtitle && (
            <p className="text-ink/60 text-sm text-center mt-2">{subtitle}</p>
          )}
          <div className="mt-8">{children}</div>
        </div>

        {footer && <p className="text-center text-sm text-ink/60 mt-6">{footer}</p>}
      </div>
    </div>
  );
}
