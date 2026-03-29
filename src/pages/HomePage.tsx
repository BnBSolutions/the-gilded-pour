import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Gift, Truck, Wine, Crown, Sparkles, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import subscriptionHero from "@/assets/subscription-hero.jpg";
import lifestyleImg from "@/assets/lifestyle-1.jpg";
import giftingImg from "@/assets/gifting.jpg";
import ProductCard from "@/components/shop/ProductCard";
import { products, categories, getFeaturedProducts } from "@/data/products";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Premium bottles collection" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      </div>
      <div className="relative container mx-auto px-4 lg:px-8 py-32">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-6">Premium Bottle Club & Boutique</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-foreground leading-[1.1] mb-6">
            Exceptional Bottles for Extraordinary Moments
          </h1>
          <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed mb-10 max-w-lg">
            Discover curated champagnes, rare spirits, aged divin, and luxury sparkling wines — delivered to your&nbsp;door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans hover:bg-primary/90 transition-colors rounded-sm">
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link to="/subscriptions" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary text-primary text-sm tracking-widest uppercase font-sans hover:bg-primary hover:text-primary-foreground transition-colors rounded-sm">
              Join the Club
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedBottles() {
  const featured = getFeaturedProducts();
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">Curated Selection</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">Editor's Picks</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <motion.div {...fadeUp} className="text-center mt-12">
          <Link to="/shop" className="inline-flex items-center gap-2 text-primary text-sm tracking-widest uppercase font-sans hover:text-gold-light transition-colors">
            View All Bottles <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCards() {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">Explore</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">Our Collections</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.slice(0, 7).map((cat, i) => (
            <motion.div key={cat.id} {...fadeUp} transition={{ delay: i * 0.05 }}>
              <Link to={`/collections/${cat.slug}`} className="group relative block aspect-[3/4] rounded-sm overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-lg text-foreground mb-1">{cat.name}</h3>
                  <p className="text-muted-foreground text-xs tracking-wider uppercase font-sans">{cat.count} bottles</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubscriptionSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div {...fadeUp}>
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-4">Monthly Curation</p>
            <h2 className="font-serif text-3xl lg:text-5xl text-foreground mb-6">The Maison Élite Club</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Join an exclusive circle of discerning palates. Each month, receive a hand-selected collection of premium bottles — from rare champagnes to aged divin — curated by our expert sommeliers.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                { icon: Crown, text: "Access to limited & exclusive releases" },
                { icon: Gift, text: "Luxury packaging & tasting cards" },
                { icon: Truck, text: "Free delivery, skip or pause anytime" },
                { icon: Sparkles, text: "VIP invitations to tasting events" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-foreground">
                  <Icon size={16} className="text-primary flex-shrink-0" /> <span className="text-sm">{text}</span>
                </li>
              ))}
            </ul>
            <Link to="/subscriptions" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans hover:bg-primary/90 transition-colors rounded-sm">
              Explore Plans <ArrowRight size={16} />
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
  const benefits = [
    { icon: Wine, title: "Expert Curation", desc: "Every bottle hand-selected by certified sommeliers and spirits experts." },
    { icon: Shield, title: "Guaranteed Quality", desc: "Direct sourcing from renowned producers across Italy, France, Mexico, and Moldova." },
    { icon: Gift, title: "Gift-Ready", desc: "Premium packaging and personal gift notes for every occasion." },
    { icon: Truck, title: "Free Delivery", desc: "Complimentary shipping on all orders over 500 MDL." },
  ];
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">Why Maison Élite</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-primary/20 flex items-center justify-center">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bestsellers() {
  const best = products.filter(p => p.badge === "Bestseller" || p.badge === "Club Favorite").slice(0, 4);
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">Most Loved</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">Bestsellers</h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {best.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function GiftSection() {
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
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-4">The Art of Giving</p>
            <h2 className="font-serif text-3xl lg:text-5xl text-foreground mb-6">Gift Something Unforgettable</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              From luxury bottle sets to subscription gifts — surprise someone special with a curated experience they'll cherish. Every gift arrives in premium packaging with a personal note.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/gifting" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans rounded-sm hover:bg-primary/90 transition-colors">
                Shop Gifts <ArrowRight size={16} />
              </Link>
              <Link to="/subscriptions" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground text-sm tracking-widest uppercase font-sans rounded-sm hover:border-primary hover:text-primary transition-colors">
                Gift a Subscription
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Alexandra D.", text: "The Luxury Club is the highlight of my month. Every box feels like Christmas — the curation is impeccable.", rating: 5 },
    { name: "Dmitri M.", text: "I gifted the Celebration Box to my parents' anniversary. The packaging alone made it unforgettable.", rating: 5 },
    { name: "Elena R.", text: "Finally, a premium bottle shop that understands elegance. The Barza Albă Divin collection is extraordinary.", rating: 5 },
  ];
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">Testimonials</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">What Our Members Say</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div key={r.name} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-secondary rounded-sm p-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={14} className="fill-primary text-primary" />)}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-6 italic">"{r.text}"</p>
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
