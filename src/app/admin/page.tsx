"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaFileAlt, FaMoneyCheckAlt, FaCalculator, FaShieldAlt } from "react-icons/fa";

const links = [
  { href: "/admin/users", label: "Users", icon: <FaUsers /> },
  { href: "/admin/kyc", label: "KYC", icon: <FaShieldAlt /> },
  { href: "/admin/payouts", label: "Payouts", icon: <FaMoneyCheckAlt /> },
  { href: "/admin/profit-calculator", label: "Profit Calculator", icon: <FaCalculator /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#0a0a0a] border-r border-[#1c1f1e] text-white h-screen w-64 fixed top-0 left-0 flex flex-col">
      <div className="px-6 py-6 text-2xl font-bold border-b border-[#1c1f1e]">
        Admin Panel
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-[#1a1a1a] ${
              pathname.startsWith(href) ? "bg-[#1c1f1e]" : ""
            }`}
          >
            <span className="text-green-400">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
