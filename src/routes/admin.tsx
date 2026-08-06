import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { getAdminData, toggleInquiryStatus } from "@/lib/admin";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowCard } from "@/components/ui/GlowCard";
import { toast } from "sonner";
import { Mail, MessageCircle, Clock, Trash2, LogOut, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Admin Dashboard — AARRKKAA" }],
  }),
});

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-ink">
        <span className="animate-pulse font-semibold tracking-widest uppercase">Loading...</span>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={() => setLoading(true)} />;
  }

  return <AdminDashboard onLogout={() => supabase.auth.signOut()} session={session} />;
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setBusy(false);
    } else {
      toast.success("Welcome back!");
      // The onAuthStateChange listener will automatically flip the UI
    }
  }

  return (
    <div className="min-h-screen bg-background text-ink flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 pt-32">
        <GlowCard className="w-full max-w-md">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass text-center">
            Restricted Area
          </div>
          <h2 className="mt-2 font-display text-2xl font-black leading-tight tracking-tight text-ink text-center sm:text-3xl">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aarrkkaa.com"
              isRequired
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              isRequired
            />
            <Button
              type="submit"
              disabled={busy}
              className="w-full mt-4 bg-ink text-background hover:bg-ink/90 rounded-full h-12 uppercase tracking-[0.1em] font-bold text-xs"
            >
              {busy ? "Authenticating..." : "Access Dashboard"}
            </Button>
          </form>
        </GlowCard>
      </main>
      <Footer />
    </div>
  );
}

function AdminDashboard({ onLogout, session }: { onLogout: () => void; session: any }) {
  const [activeTab, setActiveTab] = useState<"inquiries" | "subscribers">("inquiries");
  const [data, setData] = useState<{ inquiries: any[]; subscribers: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.access_token) {
      fetchData(session.access_token);
    }
  }, [session]);

  async function fetchData(token: string) {
    try {
      const result = await getAdminData({ data: { token } });
      setData(result);
    } catch (error) {
      toast.error("Failed to load data. Are you logged in?");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleStatus(id: string, currentStatus: string) {
    if (!session?.access_token) return;
    
    const newStatus = currentStatus === "Completed" ? "Active" : "Completed";
    const previousData = data;
    
    // Optimistic UI update
    setData((prev: any) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq: any) => 
        inq.id === id ? { ...inq, status: newStatus } : inq
      )
    }));

    try {
      await toggleInquiryStatus({
        data: { token: session.access_token, id, status: newStatus }
      });
      toast.success(`Inquiry marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
      setData(previousData); // Revert on failure
    }
  }

  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="pt-28 sm:pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" /> Secured
            </div>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-black tracking-tight text-ink">
              Command Center
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-red-500 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        {/* Metrics */}
        {data && (
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="rounded-[1.25rem] border border-hairline bg-surface p-6 shadow-soft flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Total Inquiries</div>
                <div className="mt-2 text-4xl font-display font-black text-ink">{data.inquiries.length}</div>
              </div>
              <div className="h-12 w-12 rounded-full border border-brass/30 bg-brass/10 flex items-center justify-center text-brass">
                <MessageCircle className="h-5 w-5" />
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-hairline bg-surface p-6 shadow-soft flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Newsletter Subscribers</div>
                <div className="mt-2 text-4xl font-display font-black text-ink">{data.subscribers.length}</div>
              </div>
              <div className="h-12 w-12 rounded-full border border-brass/30 bg-brass/10 flex items-center justify-center text-brass">
                <Mail className="h-5 w-5" />
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-hairline mb-8">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === "inquiries" ? "border-brass text-ink" : "border-transparent text-muted-foreground hover:text-ink"
            }`}
          >
            Inquiries
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === "subscribers" ? "border-brass text-ink" : "border-transparent text-muted-foreground hover:text-ink"
            }`}
          >
            Subscribers
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-20 text-center text-sm font-medium text-muted-foreground uppercase tracking-widest animate-pulse">
            Syncing Data...
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "inquiries" && (
              <div className="overflow-x-auto rounded-2xl border border-hairline bg-surface shadow-soft">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="border-b border-hairline bg-ink/5">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Date</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Email</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Category</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Subject</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Message</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {data?.inquiries.map((inq) => (
                      <tr key={inq.id} className="transition-colors hover:bg-ink/[0.02]">
                        <td className="px-6 py-4 text-muted-foreground">{new Date(inq.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-medium text-ink">{inq.name}</td>
                        <td className="px-6 py-4">
                          <a href={`mailto:${inq.email}`} className="text-brass hover:underline">{inq.email}</a>
                        </td>
                        <td className="px-6 py-4">
                          {inq.category ? (
                            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-ink/5 rounded-full text-ink">
                              {inq.category}
                            </span>
                          ) : "-"}
                        </td>
                        <td className="px-6 py-4 font-medium">{inq.subject}</td>
                        <td className="px-6 py-4">
                          <div className="max-w-[200px] sm:max-w-xs truncate text-muted-foreground cursor-help" title={inq.message}>
                            {inq.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleToggleStatus(inq.id, inq.status || "Active")}
                            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md transition-colors ${
                              (inq.status || "Active") === "Completed"
                                ? "text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20"
                                : "text-amber-600 bg-amber-500/10 hover:bg-amber-500/20"
                            }`}
                          >
                            {(inq.status || "Active") === "Completed" ? (
                              <><CheckCircle2 className="h-3 w-3" /> Completed</>
                            ) : (
                              <><Clock className="h-3 w-3" /> Active</>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data?.inquiries.length === 0 && (
                  <div className="py-20 text-center">
                    <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">No inquiries yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "subscribers" && (
              <div className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-soft">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-hairline bg-ink/5">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Email Address</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Subscribed On</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {data?.subscribers.map((sub) => (
                      <tr key={sub.id} className="transition-colors hover:bg-ink/[0.02]">
                        <td className="px-6 py-4 font-medium text-ink">{sub.email}</td>
                        <td className="px-6 py-4 text-muted-foreground">{new Date(sub.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-md">
                            <CheckCircle2 className="h-3 w-3" /> Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data?.subscribers.length === 0 && (
                  <div className="py-20 text-center">
                    <Mail className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">No subscribers yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
