import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CreditCard, Landmark, Smartphone } from "lucide-react";

export const Route = createFileRoute("/about_/payments")({
  component: PaymentsPage,
  head: () => ({ meta: [{ title: "Payment Options — AARRKKAA International" }, { name: "description", content: "International cards, bank transfers and UPI payment options for AARRKKAA orders." }] }),
});

function PaymentsPage() {
  const methods = [
    { name: "International cards", icon: CreditCard, description: "Major credit and debit cards, including Visa, Mastercard and American Express.", detail: "For domestic and international orders" },
    { name: "Bank & wire transfers", icon: Landmark, description: "Direct bank transfers and SWIFT wire transfers for corporate procurement.", detail: "For corporate and international payments" },
    { name: "UPI & mobile wallets", icon: Smartphone, description: "UPI payments through Google Pay, PhonePe, Paytm and supported mobile wallets.", detail: "For domestic payments" },
  ];
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="overflow-x-clip pt-28 sm:pt-36 pb-20">
        <section className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display font-black leading-[1.1] tracking-tight text-ink text-4xl sm:text-5xl md:text-6xl text-balance">
              Built for business. <br className="hidden sm:block" />
              <span className="text-brass italic">Simple to settle.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Flexible domestic and international payment methods for your procurement process.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {methods.map((method, index) => (
              <article key={method.name} className="flex flex-col rounded-3xl border border-hairline bg-surface p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-background shadow-md">
                    <method.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="mt-6 font-display text-xl font-bold tracking-tight">{method.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{method.description}</p>
                <span className="mt-auto pt-6 text-sm font-semibold text-brass">{method.detail}</span>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-3xl border border-hairline bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Discuss payment arrangements.</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">
                Our sales team can confirm the available method for your order and provide the invoice details.
              </p>
            </div>
            <Link to="/contact" className="inline-flex h-12 shrink-0 items-center rounded-full bg-brass px-6 text-sm font-semibold text-white transition hover:bg-brass/90">
              Contact sales
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
