"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

const linkHover = "hover:text-brown-dark transition-colors";

function NavLinks({ className, onLinkClick }) {
  return links.map((l) => (
    <Link key={l.href} href={l.href} onClick={onLinkClick} className={className}>
      {l.label}
    </Link>
  ));
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="border-b border-ink/10 bg-cream sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-brown-dark inline-block" />
          <span className="font-display text-xl font-semibold">Not Tales</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLinks className={linkHover} />
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <button aria-label="Search" className={`hidden sm:block ${linkHover}`}>
            <Search size={20} />
          </button>
          <Link href="/cart" aria-label="Cart" className={linkHover}>
            <ShoppingCart size={20} />
          </Link>
          <Link href="/login" aria-label="Account" className={linkHover}>
            <User size={20} />
          </Link>
          <button className="md:hidden p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-cream px-4 py-6 flex flex-col gap-5 text-sm font-medium">
          <NavLinks className="py-1" onLinkClick={closeMenu} />
          <button
            className={`sm:hidden flex items-center gap-3 py-1 text-left ${linkHover}`}
            onClick={closeMenu}
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </nav>
      )}
    </header>
  );
}