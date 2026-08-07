import { createFileRoute, Link, Outlet, redirect, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { AdminContext } from "@/components/admin/AdminContext";
import { ArkaLogo } from "@/components/ui/ArkaLogo";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  MessageCircle,
  Mail,
  Image,
  PhoneCall,
  LogOut,
  Menu,
  X,
  Home,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/admin/_layout")({
  component: AdminLayoutShell,
});

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: FolderOpen },
  { to: "/admin/inquiries", label: "Inquiries", icon: MessageCircle },
  { to: "/admin/subscribers", label: "Subscribers", icon: Mail },
  { to: "/admin/hero", label: "Hero Carousel", icon: Image },
  { to: "/admin/contact", label: "Contact Info", icon: PhoneCall },
];

function AdminLayoutShell() {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const onLogout = () => supabase.auth.signOut();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-brass border-t-transparent animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Authenticating</span>
        </div>
      </div>
    );
  }

  if (!session) {
    // Redirect to login
    if (typeof window !== "undefined") window.location.href = "/admin";
    return null;
  }

  const activeLabel = NAV_ITEMS.find(n => pathname.startsWith(n.to))?.label ?? "Admin";

  return (
    <AdminContext.Provider value={{ session, onLogout }}>
      <div className="admin-theme min-h-screen bg-zinc-950 text-zinc-100 flex">
        {/* ── Mobile Overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ── */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-zinc-900 border-r border-zinc-800 transition-transform duration-300 ease-out md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:sticky md:top-0 md:h-screen`}
        >
          {/* Logo area */}
          <div className="flex h-16 items-center gap-3 px-5 border-b border-zinc-800 shrink-0">
            <img src="/images/admin_logo.png" className="w-8 h-8 object-contain" alt="Admin Logo" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">AARRKKAA</div>
              <div className="text-xs font-bold text-zinc-100">Admin Panel</div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto md:hidden text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
              const isActive = pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-brass/15 text-brass"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? "text-brass" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                  {label}
                  {isActive && <ChevronRight className="ml-auto h-3 w-3 text-brass/60" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom area */}
          <div className="shrink-0 border-t border-zinc-800 p-3 space-y-1">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            >
              <Home className="h-4 w-4 shrink-0" />
              Back to Site
            </Link>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex-1">
              <h1 className="text-sm font-bold text-zinc-100 tracking-tight">{activeLabel}</h1>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
              {session.user?.email}
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}
