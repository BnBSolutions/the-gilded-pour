import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, Wine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";

const navLinks = [
  { labelKey: "nav.shop", href: "/shop" },
  { labelKey: "nav.collections", href: "/collections" },
  { labelKey: "nav.subscriptions", href: "/subscriptions" },
  { labelKey: "nav.gifting", href: "/gifting" },
  { labelKey: "nav.about", href: "/about" },
];

const langLabels: Record<Lang, string> = { en: "EN", ro: "RO", ru: "RU" };
const langOptions: Lang[] = ["ro", "en", "ru"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(2);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <Wine className="text-primary" size={24} />
              <span className="font-serif text-xl lg:text-2xl tracking-wider text-foreground">
                MAISON<span className="text-primary">·</span>ÉLITE
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm tracking-widest uppercase transition-colors hover:text-primary ${
                    location.pathname === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="hidden sm:flex items-center border border-border rounded-sm overflow-hidden">
                {langOptions.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2 py-1 text-[10px] tracking-wider font-sans transition-colors ${
                      lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </div>
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Search size={18} />
              </button>
              <Link to="/account" className="p-2 text-muted-foreground hover:text-primary transition-colors hidden sm:block">
                <User size={18} />
              </Link>
              <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
            >
              <div className="container mx-auto px-4 lg:px-8 py-4">
                <input
                  type="text"
                  placeholder={t("nav.search")}
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-lg outline-none font-sans"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-20"
          >
            <nav className="flex flex-col items-center gap-6 pt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-serif text-2xl tracking-wider text-foreground hover:text-primary transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <Link to="/account" className="font-serif text-2xl tracking-wider text-foreground hover:text-primary transition-colors">
                {t("nav.account")}
              </Link>
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 mt-4">
                {langOptions.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-2 text-sm tracking-wider font-sans rounded-sm transition-colors ${
                      lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground border border-border"
                    }`}
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
