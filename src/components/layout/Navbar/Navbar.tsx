"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Materials", path: "/materials" },
  { name: "Booking", path: "/book" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 mb-8 bg-blue-600 text-white dark:bg-gray-800">
      <nav>
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold tracking-tight text-white drop-shadow">
            Iyo Sensei
          </div>
          <ul className="hidden items-center gap-6 sm:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={clsx(
                    "rounded px-2 py-1 font-medium transition",
                    pathname === link.path
                      ? "bg-white/20 text-yellow-200 underline"
                      : "text-white hover:bg-blue-500 hover:text-yellow-200 dark:hover:bg-gray-700",
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="foucus:outline-none fixed top-3 right-6 z-[60] flex h-10 w-10 flex-col items-center justify-center rounded bg-blue-700/80 transition focus:ring-2 focus:ring-white sm:hidden dark:bg-gray-700/80"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={handleDrawerToggle}
        >
          <div className="relative flex h-7 w-7 flex-col items-center justify-center">
            <span className="absolute top-2 h-0.5 w-7 rounded bg-white"></span>
            <span className="absolute top-3.5 h-0.5 w-7 rounded bg-white"></span>
            <span className="absolute top-5 h-0.5 w-7 rounded bg-white"></span>
          </div>
        </button>
        <div
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xl transition-opacity duration-300 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        ></div>
        <ul
          className={`fixed top-0 right-0 z-50 flex h-full w-4/5 transform flex-col gap-6 bg-blue-700 px-8 py-28 transition-transform duration-300 dark:bg-gray-900 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={clsx(
                  "block rounded px-3 py-2 text-xl font-semibold transition",
                  pathname === link.path
                    ? "bg-white/20 text-yellow-200 underline"
                    : "text-white hover:bg-blue-500 hover:text-yellow-200 dark:hover:bg-gray-700",
                )}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
