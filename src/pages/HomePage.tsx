import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Gift, Truck, Wine, Crown, Sparkles, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import heroMobile from "@/assets/hero-mobile.jpg";
import subscriptionHero from "@/assets/subscription-hero.jpg";
import lifestyleImg from "@/assets/lifestyle-1.jpg";
import giftingImg from "@/assets/gifting.jpg";
import ProductCard from "@/components/shop/ProductCard";
import { products, categories, getFeaturedProducts } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Premium bottles collection" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      </div>
      <div className="relative container mx-auto px-4 lg:px-8 py-32">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-6">{t("home.heroTag")}</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-foreground leading-[1.1] mb-6">
            {t("home.heroTitle")}
          </h1>
          <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed mb-10 max-w-lg">
            {t("home.heroDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans hover:bg-primary/90 transition-colors rounded-sm">
              {t("home.shopNow")} <ArrowRight size={16} />
            </Link>
            <Link to="/subscriptions" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary text-primary text-sm tracking-widest uppercase font-sans hover:bg-primary hover:text-primary-foreground transition-colors rounded-sm">
              {t("home.joinClub")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedBottles() {
  const { t } = useLanguage();
  const featured = getFeaturedProducts();
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">{t("home.curatedSelection")}</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">{t("home.editorsPicks")}</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <motion.div {...fadeUp} className="text-center mt-12">
          <Link to="/shop" className="inline-flex items-center gap-2 text-primary text-sm tracking-widest uppercase font-sans hover:text-gold-light transition-colors">
            {t("home.viewAllBottles")} <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCards() {
  const { lang, t } = useLanguage();
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">{t("home.explore")}</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">{t("home.ourCollections")}</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.slice(0, 7).map((cat, i) => {
            const catNameKey = `categories.${cat.name}` as string;
            const translatedName = t(catNameKey);
            const displayName = translatedName !== catNameKey ? translatedName : cat.name;
            return (
              <motion.div key={cat.id} {...fadeUp} transition={{ delay: i * 0.05 }}>
                <Link to={`/collections/${cat.slug}`} className="group relative block aspect-[3/4] rounded-sm overflow-hidden">
                  <img src={cat.image} alt={displayName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-lg text-foreground mb-1">{displayName}</h3>
                    <p className="text-muted-foreground text-xs tracking-wider uppercase font-sans">{cat.count} {t("home.bottles")}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SubscriptionSection() {
  const { t } = useLanguage();
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div {...fadeUp}>
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-4">{t("home.monthlyCuration")}</p>
            <h2 className="font-serif text-3xl lg:text-5xl text-foreground mb-6">{t("home.clubTitle")}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t("home.clubDesc")}</p>
            <ul className="space-y-4 mb-10">
              {[
                { icon: Crown, textKey: "home.clubBenefits.access" },
                { icon: Gift, textKey: "home.clubBenefits.packaging" },
                { icon: Truck, textKey: "home.clubBenefits.delivery" },
                { icon: Sparkles, textKey: "home.clubBenefits.vip" },
              ].map(({ icon: Icon, textKey }) => (
                <li key={textKey} className="flex items-center gap-3 text-foreground">
                  <Icon size={16} className="text-primary flex-shrink-0" /> <span className="text-sm">{t(textKey)}</span>
                </li>
              ))}
            </ul>
            <Link to="/subscriptions" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans hover:bg-primary/90 transition-colors rounded-sm">
              {t("home.explorePlans")} <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden premium-shadow">
              <img src={subscriptionHero} alt="Luxury subscription box" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const { t } = useLanguage();
  const benefits = [
    { icon: Wine, titleKey: "home.benefitExpertTitle", descKey: "home.benefitExpertDesc" },
    { icon: Shield, titleKey: "home.benefitQualityTitle", descKey: "home.benefitQualityDesc" },
    { icon: Gift, titleKey: "home.benefitGiftTitle", descKey: "home.benefitGiftDesc" },
    { icon: Truck, titleKey: "home.benefitDeliveryTitle", descKey: "home.benefitDeliveryDesc" },
  ];
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">{t("home.whyUs")}</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(({ icon: Icon, titleKey, descKey }, i) => (
            <motion.div key={titleKey} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-primary/20 flex items-center justify-center">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">{t(titleKey)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bestsellers() {
  const { t } = useLanguage();
  const best = products.filter(p => p.badge === "Bestseller" || p.badge === "Club Favorite").slice(0, 4);
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">{t("home.mostLoved")}</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">{t("home.bestsellers")}</h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {best.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function GiftSection() {
  const { t } = useLanguage();
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden premium-shadow">
              <img src={giftingImg} alt="Premium gift packaging" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="order-1 lg:order-2">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-4">{t("home.artOfGiving")}</p>
            <h2 className="font-serif text-3xl lg:text-5xl text-foreground mb-6">{t("home.giftTitle")}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t("home.giftDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/gifting" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans rounded-sm hover:bg-primary/90 transition-colors">
                {t("home.shopGifts")} <ArrowRight size={16} />
              </Link>
              <Link to="/subscriptions" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground text-sm tracking-widest uppercase font-sans rounded-sm hover:border-primary hover:text-primary transition-colors">
                {t("home.giftSubscription")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { lang, t } = useLanguage();
  const reviews = translations.testimonialsList;
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">{t("home.testimonials")}</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">{t("home.whatMembersSay")}</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div key={r.name} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-secondary rounded-sm p-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} className="fill-primary text-primary" />)}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-6 italic">"{r.text[lang]}"</p>
              <p className="text-muted-foreground text-xs tracking-wider uppercase font-sans">{r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LifestyleStrip() {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[lifestyleImg, giftingImg, subscriptionHero, heroBg].map((img, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="aspect-square rounded-sm overflow-hidden">
              <img src={img} alt="Lifestyle" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedBottles />
      <CategoryCards />
      <SubscriptionSection />
      <Benefits />
      <Bestsellers />
      <GiftSection />
      <Testimonials />
      <LifestyleStrip />
    </>
  );
}
