"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // update path if needed

const links = [
  { name: "Users", href: "/admin/users" },
  { name: "KYC", href: "/admin/kyc" },
  { name: "Payouts", href: "/admin/payouts" },
  { name: "Profit Calculator", href: "/admin/profit-calculator" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#0f0f0f] border-r border-[#1c1f1e] p-6 space-y-4 text-white">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "block px-4 py-2 rounded hover:bg-[#1c1f1e] transition",
            pathname === link.href && "bg-[#1c1f1e] text-green-400"
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
