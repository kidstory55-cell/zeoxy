import { Link, useNavigate } from "@tanstack/react-router";
import { Moon, Sun, ShieldCheck, LogOut, LogIn, Receipt } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { HamburgerButton } from "@/components/MobileMenu";

export function SiteHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, toggle } = useTheme();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="relative z-10 flex items-center justify-between gap-3 px-4 pt-5 sm:px-6">
      <div className="flex items-center gap-2">
        {/* Hamburger — mobile only */}
        <HamburgerButton onClick={onMenuClick} />
        <Link to="/" className="flex items-center gap-2">
          <div className="brand-gradient grid size-9 place-items-center rounded-xl font-display font-bold text-ink">
            R
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-none tracking-tight">Recharge</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-faint">Instant Top-Up</p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/* ...everything below is exactly your existing code... */}
        <Link
          to="/how-it-works"
          className="glass-panel hidden items-center rounded-xl px-3 py-2 text-xs text-subtle sm:flex"
        >
          How It Works
        </Link>
        <Link
          to="/contact"
          className="glass-panel hidden items-center rounded-xl px-3 py-2 text-xs text-subtle sm:flex"
        >
          Contact Us
        </Link>
        <Link
          to="/about"
          className="glass-panel hidden items-center rounded-xl px-3 py-2 text-xs text-subtle sm:flex"
        >
          About Us
        </Link>
        {user ? (
          <Link
            to="/orders"
            className="glass-panel hidden items-center gap-2 rounded-xl px-3 py-2 text-xs text-subtle sm:flex"
          >
            <Receipt className="size-4" /> Orders
          </Link>
        ) : null}
        {user ? (
          <Link
            to="/orders"
            aria-label="My orders"
            className="glass-panel grid size-10 place-items-center rounded-xl text-subtle sm:hidden"
          >
            <Receipt className="size-4" />
          </Link>
        ) : null}
        {isAdmin ? (
          <Link
            to="/admin"
            className="glass-panel grid size-10 place-items-center rounded-xl text-cyan sm:w-auto sm:gap-2 sm:px-3"
            aria-label="Admin panel"
          >
            <ShieldCheck className="size-4" />
            <span className="hidden text-xs sm:inline">Admin</span>
          </Link>
        ) : null}
        {user ? (
          <button
            onClick={signOut}
            aria-label="Sign out"
            className="glass-panel grid size-10 place-items-center rounded-xl text-subtle"
          >
            <LogOut className="size-4" />
          </button>
        ) : (
          <Link
            to="/auth"
            aria-label="Sign in"
            className="glass grid size-10 place-items-center rounded-xl text-subtle sm:w-auto sm:gap-2 sm:px-3"
          >
            <LogIn className="size-4" />
            <span className="hidden text-xs sm:inline">Sign in</span>
          </Link>
        )}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="glass-panel grid size-10 place-items-center rounded-xl text-subtle"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { user, isAdmin } = useAuth();
  return (
    <footer className="relative z-10 mt-12 px-4 pb-8 sm:px-6">
      <div className="glass-panel rounded-3xl p-5 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="brand-gradient grid size-9 place-items-center rounded-xl font-display font-bold text-ink">
                R
              </div>
              <div>
                <p className="font-display text-sm font-semibold leading-none">Recharge</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-faint">
                  Instant Top-Up
                </p>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-faint">
              Fast, secure game top-ups delivered straight to your player ID.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[10px] uppercase tracking-wider text-faint">Explore</p>
            <div className="flex flex-col gap-1.5">
              <Link to="/" className="text-xs text-subtle">
                Home
              </Link>
              <Link to="/how-it-works" className="text-xs text-subtle">
                How It Works
              </Link>
              <Link to="/about" className="text-xs text-subtle">
                About Us
              </Link>
              <Link to="/contact" className="text-xs text-subtle">
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[10px] uppercase tracking-wider text-faint">Account</p>
            <div className="flex flex-col gap-1.5">
              {user ? (
                <Link to="/orders" className="text-xs text-subtle">
                  My Orders
                </Link>
              ) : (
                <Link to="/auth" className="text-xs text-subtle">
                  Sign in
                </Link>
              )}
              {isAdmin ? (
                <Link to="/admin" className="text-xs text-cyan">
                  Admin panel
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4">
          <p className="text-[11px] text-faint">© 2026 Recharge. All rights reserved.</p>
          <p className="text-[11px] text-faint">Instant delivery · Secure payments</p>
        </div>
      </div>
    </footer>
  );
}

