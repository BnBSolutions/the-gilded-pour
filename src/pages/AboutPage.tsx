import { motion } from "framer-motion";
import aboutHero from "@/assets/about-hero.jpg";
import { Wine, Globe, Shield, Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20 pb-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-36">
        <div className="absolute inset-0">
          <img src={aboutHero} alt="Wine cellar" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-4">{t("about.tag")}</p>
            <h1 className="font-serif text-4xl lg:text-6xl text-foreground mb-6">{t("about.title")}</h1>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">{t("about.heroDesc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div {...fadeUp} className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("about.passionTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("about.passionDesc")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("about.promiseTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("about.promiseDesc")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">{t("about.ourValues")}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Wine, titleKey: "about.qualityFirst", descKey: "about.qualityFirstDesc" },
              { icon: Globe, titleKey: "about.trustedSourcing", descKey: "about.trustedSourcingDesc" },
              { icon: Shield, titleKey: "about.authenticityTitle", descKey: "about.authenticityDesc" },
              { icon: Heart, titleKey: "about.serviceTitle", descKey: "about.serviceDesc" },
            ].map(({ icon: Icon, titleKey, descKey }, i) => (
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
    </div>
  );
}
