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
  BarChart,
  Menu,
  X,
  Home,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";

export const Route = createFileRoute("/admin/_layout")({
  component: AdminLayoutShell,
});

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart },
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
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const supabase = createClient();

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem("adminTheme");
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === "dark");
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    localStorage.setItem("adminTheme", newValue ? "dark" : "light");
  };

  const onLogout = () => supabase.auth.signOut();

  if (authLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-950' : 'bg-background'} flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Authenticating</span>
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
      <div className={`${isDarkMode ? 'admin-theme ' : ''}min-h-screen bg-background text-foreground flex transition-colors duration-300`}>
        {/* ── Mobile Overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ── */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-surface border-r border-border transition-transform duration-300 ease-out md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:sticky md:top-0 md:h-screen`}
        >
          {/* Logo area */}
          <div className="flex h-16 items-center gap-3 px-5 border-b border-border shrink-0">
            <img src="/images/admin_logo.png" className="w-8 h-8 object-contain" alt="Admin Logo" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">AARRKKAA</div>
              <div className="text-xs font-bold text-foreground">Admin Panel</div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto md:hidden text-muted-foreground hover:text-foreground transition-colors"
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
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  {label}
                  {isActive && <ChevronRight className="ml-auto h-3 w-3 text-primary/60" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom area */}
          <div className="shrink-0 border-t border-border p-3 space-y-1">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <div className="flex items-center gap-3">
                {isDarkMode ? <Moon className="h-4 w-4 shrink-0" /> : <Sun className="h-4 w-4 shrink-0" />}
                Theme
              </div>
              <div className="flex h-5 w-8 items-center rounded-full bg-muted-foreground/30 p-0.5 transition-colors">
                <div className={`h-4 w-4 rounded-full bg-foreground transition-transform ${isDarkMode ? "translate-x-3" : "translate-x-0"}`} />
              </div>
            </button>
            <div className="h-px w-full bg-border my-1" />
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4 shrink-0" />
              Back to Site
            </Link>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 transition-colors duration-300">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex-1">
              <h1 className="text-sm font-bold text-foreground tracking-tight">{activeLabel}</h1>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
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
