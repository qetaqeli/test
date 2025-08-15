import AdminSidebar from "@/components/AdminSidebar"; // adjust path

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 min-h-screen bg-black text-white p-6">
        {children}
      </div>
    </div>
  );
}
