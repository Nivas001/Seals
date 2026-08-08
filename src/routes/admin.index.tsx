import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/site/Footer";
import { toast } from "sonner";
import { ArkaLogo } from "@/components/ui/ArkaLogo";
import { Shield, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminGate,
  head: () => ({
    meta: [{ title: "Admin Login — AARRKKAA" }],
  }),
});

function AdminGate() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const supabase = createClient();

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem("adminTheme");
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === "dark");
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate({ to: "/admin/dashboard" });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-950' : 'bg-background'} flex items-center justify-center`}>
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'admin-theme ' : ''}min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300`}>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setBusy(false);
    } else {
      toast.success("Welcome back!");
      navigate({ to: "/admin/dashboard" });
    }
  }

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Back link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground backdrop-blur-md transition-all hover:border-muted-foreground/30 hover:text-foreground"
        >
          ← Back to Site
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-20 w-20 rounded-2xl bg-surface border border-border flex items-center justify-center mb-4 shadow-lg overflow-hidden">
              <img src="/images/admin_logo.png" className="w-full h-full object-cover" alt="Admin Logo" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
              <Shield className="h-3 w-3" /> Restricted Area
            </div>
            <h1 className="font-display text-2xl font-black tracking-tight text-foreground">Admin Login</h1>
            <p className="mt-1 text-xs text-muted-foreground">AARRKKAA Command Center</p>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aarrkkaa.com"
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={busy}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
              >
                {busy ? (
                  <>
                    <div className="h-3 w-3 rounded-full border-2 border-zinc-900/40 border-t-zinc-900 animate-spin" />
                    Authenticating...
                  </>
                ) : "Access Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
