import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import CreditCard from "@/components/shared-assets/credit-card/credit-card";
import { ShieldCheck, Globe, Smartphone, Landmark } from "lucide-react";

export const Route = createFileRoute("/payments")({
  component: PaymentsPage,
});

function PaymentsPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main className="overflow-x-clip pt-28 sm:pt-36 pb-20">
        <section className="mx-auto max-w-7xl px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display font-black leading-[1.1] tracking-tight text-ink text-4xl sm:text-5xl md:text-6xl text-balance">
              Seamless global <br className="hidden sm:block" />
              <span className="text-brass italic">payments.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              We accept a wide range of secure international and domestic payment methods 
              to ensure your procurement process is as smooth as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Visuals - Credit Cards */}
            <div className="relative flex flex-col items-center justify-center gap-8 py-10">
              {/* Decorative background blur */}
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brass/10 via-background to-background blur-2xl" />
              
              <div className="relative transform transition-all duration-700 hover:-translate-y-2 hover:rotate-1 z-10 w-full flex justify-center">
                <CreditCard
                  type="brand-dark"
                  company="AARRKKAA"
                  cardNumber="•••• •••• •••• 1234"
                  cardHolder="JOHN DOE"
                  cardExpiration="06/28"
                  className="shadow-2xl shadow-brass/5"
                />
              </div>
              
              <div className="relative transform transition-all duration-700 hover:translate-y-2 hover:-rotate-1 -mt-16 sm:-mt-24 z-20 w-full flex justify-center sm:ml-20">
                <CreditCard
                  type="apple-titanium"
                  company="Titanium"
                  cardNumber="•••• •••• •••• 8765"
                  cardHolder="INDUSTRIAL BUYER"
                  cardExpiration="03/29"
                />
              </div>
            </div>

            {/* Content - Payment Methods */}
            <div className="flex flex-col gap-8">
              
              <div className="flex items-start gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-background shadow-md">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">International Cards</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    We accept all major credit and debit cards globally, including Visa, MasterCard, and American Express, with secure 3D-Secure authentication.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-background shadow-md">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">Netbanking & Wire</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Direct bank transfers and SWIFT wire transfers available for high-value corporate orders. Supports 50+ global banks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-background shadow-md">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">UPI & Mobile Wallets</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Fast and seamless payments via UPI (Google Pay, PhonePe, Paytm) and popular mobile wallets for instant processing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brass/10 text-brass shadow-sm border border-brass/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-brass">Bank-Grade Security</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    All transactions are encrypted with 256-bit SSL and processed through PCI-DSS compliant gateways. We never store your card details.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
