import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Gift, Pause, RefreshCw, Crown, Sparkles, Star, Package } from "lucide-react";
import { subscriptionPlans } from "@/data/products";
import subscriptionHero from "@/assets/subscription-hero.jpg";
import lifestyleImg from "@/assets/lifestyle-1.jpg";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const tierStyles: Record<string, { accent: string; icon: React.ElementType }> = {
  approachable: { accent: "border-primary/30", icon: Package },
  vip: { accent: "border-primary gold-glow", icon: Crown },
  celebration: { accent: "border-primary/30", icon: Sparkles },
  custom: { accent: "border-primary/30", icon: Star },
};

export default function SubscriptionPage() {
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
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-4">Premium Membership</p>
            <h1 className="font-serif text-4xl lg:text-6xl text-foreground mb-6">The Maison Élite Club</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              An exclusive membership for those who appreciate the finest bottles. Curated monthly selections, VIP access, and the art of premium discovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">Choose Your Experience</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">Membership Plans</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPlans.map((plan, i) => {
              const style = tierStyles[plan.tier];
              const Icon = style.icon;
              return (
                <motion.div key={plan.id} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className={`relative bg-card rounded-sm border ${style.accent} p-8 flex flex-col ${plan.popular ? "lg:scale-105 lg:-my-2" : ""}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase font-sans rounded-sm">
                      Most Popular
                    </span>
                  )}
                  <Icon size={24} className="text-primary mb-4" />
                  <h3 className="font-serif text-xl text-foreground mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-xs tracking-wider uppercase font-sans mb-4">{plan.tagline}</p>
                  <div className="mb-4">
                    <span className="font-serif text-3xl text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm"> {plan.currency}/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.description}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.includes.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                        <Check size={14} className="text-primary flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground text-xs mb-4">Perfect for: {plan.whoFor}</p>
                  <Link to={plan.id === "custom" ? "/build-your-box" : "/shop"}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-sans rounded-sm hover:bg-primary/90 transition-colors"
                  >
                    {plan.id === "custom" ? "Build Your Box" : "Join Now"} <ArrowRight size={14} />
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
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">How It Works</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: "01", title: "Choose Your Plan", desc: "Select the membership that matches your taste and lifestyle." },
              { step: "02", title: "We Curate", desc: "Our sommeliers handpick premium bottles tailored to your preferences." },
              { step: "03", title: "Enjoy & Discover", desc: "Receive your luxury box with tasting cards and pairing suggestions." },
            ].map((s, i) => (
              <motion.div key={s.step} {...fadeUp} transition={{ delay: i * 0.15 }} className="text-center">
                <span className="font-serif text-4xl text-primary/30">{s.step}</span>
                <h3 className="font-serif text-lg text-foreground mt-2 mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
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
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">Membership Perks</h2>
              <div className="space-y-6">
                {[
                  { icon: Gift, title: "Gift a Subscription", desc: "Share the luxury. Gift any plan with a personal note and premium wrapping." },
                  { icon: Pause, title: "Skip or Pause Anytime", desc: "Full flexibility. Skip a month or pause your membership with no questions asked." },
                  { icon: RefreshCw, title: "Customize Each Box", desc: "Set preferences for bottle types, origins, and styles. We listen." },
                  { icon: Crown, title: "VIP Access", desc: "Early access to limited releases, exclusive tastings, and member-only collections." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base text-foreground mb-1">{title}</h3>
                      <p className="text-muted-foreground text-sm">{desc}</p>
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
