"use client";

import { Suspense, useState } from "react";
import { Menu, X } from "lucide-react";

import Link from "next/link";

import Logo from "../svg/Logo";
import { Button } from "../ui/Button";
import ActiveLink from "../ActiveLink";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Sell", href: "/sell" },
  { title: "Buy", href: "/buy" },
  { title: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" aria-label="Logo">
          <Logo />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Suspense fallback={<p>Loading</p>}>
                  <ActiveLink
                    href={item.href}
                    className="text-text-default text-base  transition-colors hover:text-text-active"
                    activeClassName="text-text-active font-semibold"
                  >
                    {item.title}
                  </ActiveLink>
                </Suspense>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Button>Contact Me</Button>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <ActiveLink
                  href={item.href}
                  className="block px-6 py-4 hover:bg-gray-100 text-base "
                  activeClassName="text-text-active font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </ActiveLink>
              </li>
            ))}

            <Button asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </ul>
        </div>
      )}
    </header>
  );
}
