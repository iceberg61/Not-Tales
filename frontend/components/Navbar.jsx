"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-ink/10 bg-cream sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-brown-dark inline-block" />
          <span className="font-display text-xl font-semibold">Not Tales</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-brown-dark transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Hide Search on very small screens */}
          <button
            aria-label="Search"
            className="hidden sm:block hover:text-brown-dark transition-colors"
          >
            <Search size={20} />
          </button>

          <Link
            href="/cart"
            aria-label="Cart"
            className="hover:text-brown-dark transition-colors"
          >
            <ShoppingCart size={20} />
          </Link>

          <Link
            href="/login"
            aria-label="Account"
            className="hover:text-brown-dark transition-colors"
          >
            <User size={20} />
          </Link>

          {/* Hamburger - only on mobile */}
          <button
            className="md:hidden p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-cream px-4 py-6 flex flex-col gap-5 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-1"
            >
              {l.label}
            </Link>
          ))}
          
          {/* Mobile-only Search */}
          <button
            className="sm:hidden flex items-center gap-3 py-1 text-left hover:text-brown-dark transition-colors"
            onClick={() => setOpen(false)}
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </nav>
      )}
    </header>
  );
}