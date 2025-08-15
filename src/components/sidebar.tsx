"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuIcon, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "New Challenge", href: "/dashboard/new-challenge" },
  { name: "Rankings", href: "/dashboard/rankings" },
  { name: "Certificates", href: "/dashboard/certificates" },
  { name: "Rewards", href: "/dashboard/rewards" },
  { name: "Affiliate Section", href: "/dashboard/affiliate" },
  { name: "Platforms", href: "/dashboard/platforms" },
  { name: "Get Fast Help", href: "/dashboard/get-fast-help" },
  { name: "Billing & accounts", href: "/dashboard/billing-accounts" },
  { name: "News Calendar", href: "/dashboard/news-calendar" },
  { name: "Live News Feed", href: "/dashboard/news" },
  { name: "Settings", href: "/dashboard/settings" },
  { name: "KYC", href: "/dashboard/kyc" },
  { name: "FAQ", href: "/dashboard/faq" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-black/60 rounded-full"
          aria-label="Toggle menu"
        >
          <MenuIcon className="text-white" />
        </button>
      </div>

      <aside
        className={cn(
          "fixed z-40 h-full w-64 p-5 bg-black/60 backdrop-blur-lg text-white flex flex-col justify-between transition-transform",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div>
          <div className="mb-6 flex items-center gap-2">
            <Image src="/logo.png" alt="Atomic" width={32} height={32} />
            <span className="text-lg font-semibold text-green-400">Atomic</span>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm hover:bg-green-500/10 transition",
                  pathname === item.href &&
                    "bg-green-400 text-black font-semibold"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <Link
            href="/dashboard/new-challenge"
            className="block w-full text-center bg-green-400 hover:bg-green-300 text-black font-bold rounded-full py-2 shadow"
          >
            Start Challenge
          </Link>

          {user && (
            <div className="flex items-center justify-between bg-green-900/40 px-3 py-2 rounded-lg text-sm">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="bg-green-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {(user.user_metadata?.full_name
                    ? user.user_metadata.full_name[0]
                    : user.email?.[0]
                  )?.toUpperCase() || "U"}
                </div>
                <div className="truncate">
                  <p className="font-medium">
                    {user.user_metadata?.full_name || user.email || "User"}
                  </p>
                  <p className="text-xs text-gray-300 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-green-400 hover:text-red-500"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
