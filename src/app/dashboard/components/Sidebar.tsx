"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "New Challenge", href: "/dashboard/challenge" },
  { name: "Rankings", href: "/dashboard/rankings" },
  { name: "Certificates", href: "/dashboard/certificates" },
  { name: "Rewards", href: "/dashboard/rewards" },
  { name: "Affiliate Section", href: "/dashboard/affiliate" },
  { name: "Platforms", href: "/dashboard/platforms" },
  { name: "Get Fast Help", href: "/dashboard/help" },
  { name: "Billing & accounts", href: "/dashboard/billing" },
  { name: "News Calendar", href: "/dashboard/news-calendar" },
  { name: "Live News Feed", href: "/dashboard/live-news-feed" },
  { name: "Settings", href: "/dashboard/settings" },
  { name: "FAQ", href: "/dashboard/faq" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-black/60 rounded-full"
        >
          <MenuIcon className="text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-40 h-full w-64 p-5 bg-black/50 backdrop-blur-lg text-white flex flex-col justify-between transition-transform",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Top section */}
        <div>
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            <Image src="/logo.png" alt="Atomic" width={32} height={32} />
            <span className="text-lg font-semibold text-green-400">Atomic</span>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm hover:bg-green-500/10 transition",
                  pathname === item.href && "bg-green-400 text-black font-semibold"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom CTA */}
        <div className="mt-4">
          <Link
            href="/dashboard/challenge"
            className="block w-full text-center bg-green-400 hover:bg-green-300 text-black font-bold rounded-full py-2 shadow-lg"
          >
            Start Challenge
          </Link>
        </div>
      </aside>
    </>
  );
}
