import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gift, Heart, Calendar, Building2, ArrowRight } from "lucide-react";
import giftingImg from "@/assets/gifting.jpg";
import giftSetImg from "@/assets/gift-set.jpg";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/data/products";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const giftOccasions = [
  { icon: Heart, title: "Anniversary & Romance", desc: "Champagne, aged divin, and intimate selections for love-filled moments." },
  { icon: Calendar, title: "Birthdays & Milestones", desc: "Premium bottles and curated sets to mark life's most significant chapters." },
  { icon: Building2, title: "Corporate & VIP", desc: "Impress clients and partners with luxury gift boxes and bespoke selections." },
  { icon: Gift, title: "Wedding & Celebration", desc: "Magnums, Jeroboams, and sparkling collections for the grandest occasions." },
];

export default function GiftingPage() {
  const giftProducts = products.filter(p => p.badge === "Gift Pick" || p.occasion?.includes("Gift")).slice(0, 4);

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img src={giftingImg} alt="Luxury gifting" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-4">The Art of Giving</p>
            <h1 className="font-serif text-4xl lg:text-6xl text-foreground mb-6">Luxury Gifting</h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Give the gift of exceptional taste. Every bottle arrives in premium packaging with your personal touch.
            </p>
            <div className="flex gap-4">
              <Link to="/shop" className="px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans rounded-sm hover:bg-primary/90 transition-colors">
                Shop Gifts
              </Link>
              <Link to="/subscriptions" className="px-8 py-4 border border-primary text-primary text-sm tracking-widest uppercase font-sans rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                Gift a Subscription
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">Gift for Every Occasion</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftOccasions.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-card border border-border rounded-sm p-8 text-center hover:border-primary/30 transition-colors">
                <Icon size={28} className="text-primary mx-auto mb-4" />
                <h3 className="font-serif text-lg text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Sets */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <img src={giftSetImg} alt="Premium gift sets" className="w-full aspect-[4/3] object-cover rounded-sm premium-shadow" loading="lazy" />
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-4">Curated Collections</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">Premium Gift Sets</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Our gift sets combine carefully selected bottles with luxury packaging. Each set tells a story and creates a lasting impression.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 text-primary text-sm tracking-widest uppercase font-sans hover:text-gold-light transition-colors">
                Explore Gift Sets <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gift-worthy products */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">Gift-Worthy Bottles</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {giftProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
