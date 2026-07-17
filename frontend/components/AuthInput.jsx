"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Reusable labeled input with a leading icon, and an automatic
// show/hide toggle when type="password". Spreads any other props
// (name, value, onChange, placeholder, required...) onto the <input>.
export default function AuthInput({ icon: Icon, label, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block">{label}</label>
      <div className="relative">
        <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          type={isPassword && show ? "text" : type}
          className={`w-full bg-cream rounded-pill pl-11 ${
            isPassword ? "pr-11" : "pr-4"
          } py-3 text-sm outline-none border border-ink/10 focus:border-brown-dark transition-colors`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
