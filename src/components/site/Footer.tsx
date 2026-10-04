import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getContactInfo } from "@/lib/catalog";
import { DownloadCatalog } from "@/components/site/DownloadCatalog";

export function Footer() {
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: () => getCategories() });
  const { data: contactInfo } = useQuery({ queryKey: ["contactInfo"], queryFn: () => getContactInfo() });
  const phones = contactInfo?.phones?.length ? contactInfo.phones : ["+91 78069 36475"];
  const emails = contactInfo?.emails?.length ? contactInfo.emails : ["aarrkkaainternational@gmail.com"];
  const address = contactInfo?.address || { line1: "#3/334, 11C, Surya Nagar", line2: "5th Cross, Arasanatti", city: "Hosur", state: "Tamil Nadu", pincode: "635 126" };
  return (
    <footer className="arka-footer">
      <div className="arka-container">
        <div className="arka-footer-catalog">
          <div><span className="arka-overline">The AARRKKAA product catalog</span><h2>Your next part starts here.</h2><p>Product ranges and technical information in one downloadable brochure.</p></div>
          <DownloadCatalog variant="solid" label="Download catalog (PDF)" />
        </div>
        <div className="arka-footer-grid">
          <div>
            <Link to="/" className="arka-footer-brand">
              <img src="/logo.png" alt="" width={64} height={56} />
              <span><strong>AARRKKAA</strong><small>INTERNATIONAL</small></span>
            </Link>
            <p>Industrial pumps, seals and precision components. Technical support from Hosur to process plants worldwide.</p>
            <a href="https://wa.me/917806936475" target="_blank" rel="noopener noreferrer" className="arka-footer-contact-link">Chat on WhatsApp</a>
          </div>
          <div><h3>Products</h3>{categories.slice(0, 6).map((category: any) => <Link key={category.slug} to="/products/$category" params={{ category: category.slug }}>{category.name}</Link>)}<Link to="/catalog">Full product catalog</Link></div>
          <div><h3>Company</h3><Link to="/about">About AARRKKAA</Link><Link to="/industries">Industries served</Link><Link to="/about/payments">Payment options</Link><Link to="/wizard">Product finder</Link><Link to="/contact">Contact our team</Link></div>
          <div><h3>Let’s talk</h3>{phones.map((phone: string) => <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>)}{emails.map((email: string) => <a key={email} href={`mailto:${email}`} className="break-all">{email}</a>)}<p>{address.line1}, {address.line2},<br />{address.city}, {address.state} — {address.pincode}</p></div>
        </div>
        <div className="arka-footer-bottom"><p>© {new Date().getFullYear()} AARRKKAA International. All rights reserved.</p><p>Hosur, India · Service available globally</p></div>
      </div>
    </footer>
  );
}
