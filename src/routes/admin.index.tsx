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

  useEffect(() => {
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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-brass border-t-transparent animate-spin" />
      </div>
    );
  }

  return <LoginForm />;
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Back link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 backdrop-blur-md transition-all hover:border-zinc-700 hover:text-zinc-100"
        >
          ← Back to Site
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 shadow-lg">
              <ArkaLogo size={36} variant="mark" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brass mb-2">
              <Shield className="h-3 w-3" /> Restricted Area
            </div>
            <h1 className="font-display text-2xl font-black tracking-tight text-white">Admin Login</h1>
            <p className="mt-1 text-xs text-zinc-500">AARRKKAA Command Center</p>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aarrkkaa.com"
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-brass/50 focus:outline-none focus:ring-1 focus:ring-brass/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 pr-10 text-sm text-zinc-100 placeholder-zinc-600 focus:border-brass/50 focus:outline-none focus:ring-1 focus:ring-brass/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={busy}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-brass px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-950 transition-all hover:bg-brass/90 disabled:opacity-60"
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
