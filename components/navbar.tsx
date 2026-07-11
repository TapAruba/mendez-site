"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Properties", href: "/the-property" },
  { label: "Car Rental", href: "/car-rental" },
  { label: "Experiences", href: "/experiences" },
  { label: "About", href: "/about" },
  { label: "Book Now", href: "/book-now" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const isServiceRoute =
    pathname.startsWith("/experiences/") ||
    pathname.startsWith("/book-now") ||
    pathname.startsWith("/car-rental") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/the-property") ||
    pathname.startsWith("/policies");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navBg =
    isHome && !scrolled && !open
      ? "bg-transparent"
      : "bg-navy/95 backdrop-blur-sm shadow-sm";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="shrink-0">
          <Image
            src="images/logo-white.png"
            alt="Méndez Estates Aruba"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                pathname === href ? "text-gold" : "text-white/80 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="bg-navy px-6 pb-6 pt-2 md:hidden">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 font-sans text-[12px] uppercase tracking-[0.16em] text-white/80 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
