import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toaster";

export function Layout() {
  return (
    <div className="flex h-screen">
      <Toaster />
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1  overflow-y-auto p-6 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
