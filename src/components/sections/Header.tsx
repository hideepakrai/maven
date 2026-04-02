"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteNavigation } from "@/lib/homepage-data";

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const ctaHref = "/contact";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d9d9d9] md:bg-white bg-white backdrop-blur-sm transition-colors duration-300">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 px-4 py-3 md:px-8 lg:px-10">
          <Link href="/" className="shrink-0">
            <img
              src="/assets/Image/mp-dark-logo.svg"
              alt="Maven Projects"
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <nav className="hidden items-center gap-7 xl:flex">
            {siteNavigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "font-editorial text-[10px] uppercase tracking-[0.22em] transition duration-300 md:text-xs",
                  pathname === item.href
                    ? "text-[#6c63ff]"
                    : "text-[#111111] hover:text-[#6c63ff]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center bg-[#6c63ff] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#584cf6] md:text-xs"
            >
              Contact us
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center border border-[#d8d8d8] text-[#111111]"
              aria-label="Open menu"
            >
              <Menu size={17} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center border border-[#d8d8d8] text-[#111111] md:hidden"
            aria-label="Open menu"
          >
            <Menu size={17} />
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-[70] w-full max-w-sm border-l border-[#e2e2e2] bg-white px-6 py-6 shadow-[0_35px_90px_rgba(12,8,6,0.28)] transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl text-[#111111]">Maven Projects</p>
            <p className="font-editorial mt-2 text-sm text-[#666666]">
              Architecture, interiors, and modern residences.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center border border-[#d8d8d8] text-[#111111]"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="mt-12 space-y-5">
          {siteNavigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "font-display block text-[1.75rem]",
                pathname === item.href ? "text-[#6c63ff]" : "text-[#111111]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Header;
