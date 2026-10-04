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
    <div className="revamp-page revamp-payments min-h-screen bg-background text-ink">
      <Navbar />
      <main className="arka-page-main">
        <section className="arka-container">
          <div className="arka-page-heading"><span className="arka-overline">Payment options</span><h1>Built for business.<br />Simple to settle.</h1><p>Flexible domestic and international payment methods for your procurement process.</p></div>
          <div className="arka-payment-grid">
            {methods.map((method, index) => <article className="arka-payment-method" key={method.name}>
              <div className="arka-payment-top"><method.icon className="h-7 w-7" aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <h2>{method.name}</h2><p>{method.description}</p><span className="arka-payment-detail">{method.detail}</span>
            </article>)}
          </div>
          <div className="arka-payment-support"><div><h2>Discuss payment arrangements.</h2><p>Our sales team can confirm the available method for your order and provide the invoice details.</p></div><Link to="/contact" className="arka-button arka-button-primary">Contact sales</Link></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
