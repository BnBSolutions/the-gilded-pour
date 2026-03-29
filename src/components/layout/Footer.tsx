import { Link } from "react-router-dom";
import { Wine, Instagram, Facebook, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

export default function Footer() {
  const { lang, t } = useLanguage();

  const shopItems = translations.footer.shopItems[lang];
  const clubItems = translations.footer.clubItems[lang];
  const helpItems = translations.footer.helpItems[lang];

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Wine className="text-primary" size={22} />
              <span className="font-serif text-xl tracking-wider text-foreground">MAISON<span className="text-primary">·</span>ÉLITE</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t("footer.desc")}</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-foreground mb-6">{t("footer.shopTitle")}</h4>
            <ul className="space-y-3">
              {shopItems.map((item) => (
                <li key={item}><Link to="/shop" className="text-muted-foreground text-sm hover:text-primary transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-foreground mb-6">{t("footer.clubTitle")}</h4>
            <ul className="space-y-3">
              {clubItems.map((item) => (
                <li key={item}><Link to="/subscriptions" className="text-muted-foreground text-sm hover:text-primary transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-widest uppercase text-foreground mb-6">{t("footer.helpTitle")}</h4>
            <ul className="space-y-3">
              {helpItems.map((item) => (
                <li key={item}><Link to="/about" className="text-muted-foreground text-sm hover:text-primary transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">{t("footer.copyright")}</p>
          <p className="text-muted-foreground text-xs">Chișinău, Moldova · Str. Cărbunari 2</p>
        </div>
      </div>
    </footer>
  );
}
