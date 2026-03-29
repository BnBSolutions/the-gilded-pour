import { Link } from "react-router-dom";
import { Wine, Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Wine className="text-primary" size={22} />
              <span className="font-serif text-xl tracking-wider text-foreground">MAISON<span className="text-primary">·</span>ÉLITE</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Curated premium bottles for elevated moments. Luxury sparkling wines, champagne, spirits, and aged divin — delivered to your door.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-foreground mb-6">Shop</h4>
            <ul className="space-y-3">
              {["Sparkling & Prosecco", "Champagne", "Premium Spirits", "Aged Divin", "Magnum Bottles", "Gift Sets", "Premium Water"].map((item) => (
                <li key={item}><Link to="/shop" className="text-muted-foreground text-sm hover:text-primary transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-foreground mb-6">Club</h4>
            <ul className="space-y-3">
              {["Discovery Box", "Luxury Club", "Celebration Box", "Build Your Box", "Gift a Subscription"].map((item) => (
                <li key={item}><Link to="/subscriptions" className="text-muted-foreground text-sm hover:text-primary transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-foreground mb-6">Help</h4>
            <ul className="space-y-3">
              {["Shipping & Delivery", "Returns", "FAQ", "Contact Us", "About Us", "Terms & Conditions", "Privacy Policy"].map((item) => (
                <li key={item}><Link to="/about" className="text-muted-foreground text-sm hover:text-primary transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">© 2026 Maison Élite. All rights reserved. Must be 18+ to purchase.</p>
          <p className="text-muted-foreground text-xs">Chișinău, Moldova · Str. Cărbunari 2</p>
        </div>
      </div>
    </footer>
  );
}
