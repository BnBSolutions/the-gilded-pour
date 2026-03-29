import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Gift, Pause, RefreshCw, Crown, Sparkles, Star, Package } from "lucide-react";
import { subscriptionPlans } from "@/data/products";
import subscriptionHero from "@/assets/subscription-hero.jpg";
import lifestyleImg from "@/assets/lifestyle-1.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const tierStyles: Record<string, { accent: string; icon: React.ElementType }> = {
  approachable: { accent: "border-primary/30", icon: Package },
  vip: { accent: "border-primary gold-glow", icon: Crown },
  celebration: { accent: "border-primary/30", icon: Sparkles },
  custom: { accent: "border-primary/30", icon: Star },
};

export default function SubscriptionPage() {
  const { lang, t } = useLanguage();

  const planTranslations = translations.plans;

  return (
    <div className="pt-20 pb-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0">
          <img src={subscriptionHero} alt="Subscription" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-4">{t("subscription.tag")}</p>
            <h1 className="font-serif text-4xl lg:text-6xl text-foreground mb-6">{t("subscription.title")}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{t("subscription.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">{t("subscription.chooseExperience")}</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">{t("subscription.membershipPlans")}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPlans.map((plan, i) => {
              const style = tierStyles[plan.tier];
              const Icon = style.icon;
              const pt = planTranslations[plan.id as keyof typeof planTranslations];
              const planName = pt?.name?.[lang] || plan.name;
              const planTagline = pt?.tagline?.[lang] || plan.tagline;
              const planDesc = pt?.description?.[lang] || plan.description;
              const planWhoFor = pt?.whoFor?.[lang] || plan.whoFor;
              const planIncludes = pt?.includes?.[lang] || plan.includes;

              return (
                <motion.div key={plan.id} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className={`relative bg-card rounded-sm border ${style.accent} p-8 flex flex-col ${plan.popular ? "lg:scale-105 lg:-my-2" : ""}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase font-sans rounded-sm">
                      {t("subscription.mostPopular")}
                    </span>
                  )}
                  <Icon size={24} className="text-primary mb-4" />
                  <h3 className="font-serif text-xl text-foreground mb-1">{planName}</h3>
                  <p className="text-muted-foreground text-xs tracking-wider uppercase font-sans mb-4">{planTagline}</p>
                  <div className="mb-4">
                    <span className="font-serif text-3xl text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm"> {plan.currency}/{t("common.month")}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{planDesc}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {planIncludes.map((item: string) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                        <Check size={14} className="text-primary flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground text-xs mb-4">{t("subscription.perfectFor")} {planWhoFor}</p>
                  <Link to={plan.id === "custom" ? "/build-your-box" : "/shop"}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-sans rounded-sm hover:bg-primary/90 transition-colors"
                  >
                    {plan.id === "custom" ? t("subscription.buildYourBox") : t("subscription.joinNow")} <ArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">{t("subscription.howItWorks")}</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: "01", titleKey: "subscription.step1Title", descKey: "subscription.step1Desc" },
              { step: "02", titleKey: "subscription.step2Title", descKey: "subscription.step2Desc" },
              { step: "03", titleKey: "subscription.step3Title", descKey: "subscription.step3Desc" },
            ].map((s, i) => (
              <motion.div key={s.step} {...fadeUp} transition={{ delay: i * 0.15 }} className="text-center">
                <span className="font-serif text-4xl text-primary/30">{s.step}</span>
                <h3 className="font-serif text-lg text-foreground mt-2 mb-2">{t(s.titleKey)}</h3>
                <p className="text-muted-foreground text-sm">{t(s.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">{t("subscription.membershipPerks")}</h2>
              <div className="space-y-6">
                {[
                  { icon: Gift, titleKey: "subscription.giftSubTitle", descKey: "subscription.giftSubDesc" },
                  { icon: Pause, titleKey: "subscription.skipTitle", descKey: "subscription.skipDesc" },
                  { icon: RefreshCw, titleKey: "subscription.customizeTitle", descKey: "subscription.customizeDesc" },
                  { icon: Crown, titleKey: "subscription.vipTitle", descKey: "subscription.vipDesc" },
                ].map(({ icon: Icon, titleKey, descKey }) => (
                  <div key={titleKey} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base text-foreground mb-1">{t(titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <img src={lifestyleImg} alt="Unboxing experience" className="w-full aspect-[3/4] object-cover rounded-sm premium-shadow" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
