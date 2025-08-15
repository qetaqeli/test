import Sidebar from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-0 md:ml-64 w-full min-h-screen bg-[#0c0e10] text-white">
        {children}
      </main>
    </div>
  );
}
