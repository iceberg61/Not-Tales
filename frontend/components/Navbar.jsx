"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Menu, X, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

// text-ink is explicit here on purpose — Tailwind's preflight doesn't
// override the browser's default link color, so without it these render
// as default blue/visited-purple instead of the brand ink color.
const linkHover = "text-ink hover:text-brown-dark transition-colors";

function NavLinks({ className, onLinkClick }) {
  return links.map((l) => (
    <Link key={l.href} href={l.href} onClick={onLinkClick} className={className}>
      {l.label}
    </Link>
  ));
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const closeMenu = () => setOpen(false);
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  // Read after mount, not during render — localStorage isn't available
  // during SSR and reading it at render time would cause a hydration
  // mismatch between server and client markup.
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user") || "null");
      setIsAdmin(stored?.role === "admin");
    } catch {
      setIsAdmin(false);
    }
  }, []);

  return (
    <header className="border-b border-ink/10 bg-cream sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-brown-dark inline-block" />
          <span className="font-display text-xl font-semibold">Not Tales</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLinks className={linkHover} />
          {isAdmin && (
            <Link href="/admin" className={`flex items-center gap-1.5 ${linkHover}`}>
              <ShieldCheck size={15} /> Admin
            </Link>
          )}
        </nav>

        {/* Icon cluster — full set on desktop (with a divider separating
            "your stuff" from "your account"), pared down to just Cart on
            mobile since Search/Wishlist/Account move into the drawer. */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className={`hidden sm:block ${linkHover}`}
          >
            <Search size={20} />
          </button>

          <Link href="/wishlist" aria-label="Wishlist" className={`hidden sm:block relative ${linkHover}`}>
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brown-dark text-cream text-[10px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            className={`relative ${linkHover}`}
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brown-dark text-cream text-[10px] flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <span className="hidden sm:block w-px h-5 bg-ink/10" />

          <Link href="/login" aria-label="Account" className={`hidden sm:block ${linkHover}`}>
            <User size={20} />
          </Link>

          <button className="md:hidden p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-cream px-4 py-6 flex flex-col gap-1 text-sm font-medium">
          <div className="flex flex-col gap-1 pb-4 mb-4 border-b border-ink/10">
            <NavLinks className={`py-2.5 ${linkHover}`} onLinkClick={closeMenu} />
            {isAdmin && (
              <Link href="/admin" onClick={closeMenu} className={`flex items-center gap-3 py-2.5 ${linkHover}`}>
                <ShieldCheck size={18} /> Admin
              </Link>
            )}
          </div>

          <button
            className={`sm:hidden flex items-center gap-3 py-2.5 text-left ${linkHover}`}
            onClick={() => {
              closeMenu();
              setSearchOpen(true);
            }}
          >
            <Search size={18} />
            <span>Search</span>
          </button>

          <Link
            href="/wishlist"
            onClick={closeMenu}
            className={`sm:hidden flex items-center justify-between py-2.5 ${linkHover}`}
          >
            <span className="flex items-center gap-3">
              <Heart size={18} /> Wishlist
            </span>
            {wishlistCount > 0 && <span className="text-ink/40 text-xs">{wishlistCount}</span>}
          </Link>

          <Link
            href="/login"
            onClick={closeMenu}
            className={`sm:hidden flex items-center gap-3 py-2.5 ${linkHover}`}
          >
            <User size={18} /> Account
          </Link>
        </nav>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}