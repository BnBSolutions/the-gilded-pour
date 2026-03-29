import { motion } from "framer-motion";
import aboutHero from "@/assets/about-hero.jpg";
import { Wine, Globe, Shield, Heart } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function AboutPage() {
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
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-4">Our Story</p>
            <h1 className="font-serif text-4xl lg:text-6xl text-foreground mb-6">The Maison Élite Philosophy</h1>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              We believe every bottle tells a story. Our mission is to bring the world's most exceptional wines, champagnes, spirits, and aged divin to those who appreciate the art of fine drinking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div {...fadeUp} className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">A Passion for Curation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Born from a deep love of Moldovan winemaking tradition and a fascination with the world's finest spirits, Maison Élite was founded to bridge the gap between premium producers and discerning drinkers. We travel to vineyards in Asolo, cellars in Champagne, distilleries in Jalisco, and aging houses in Moldova to hand-select every bottle in our collection.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Our Promise</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every product on our shelves has been tasted, evaluated, and approved by our team of certified sommeliers and spirits experts. We never compromise on quality, and we never stock anything we wouldn't proudly serve at our own table.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">Our Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Wine, title: "Quality First", desc: "Only the finest bottles make it to our collection. Every product is tasted and approved." },
              { icon: Globe, title: "Trusted Sourcing", desc: "Direct relationships with producers across Italy, France, Mexico, and Moldova." },
              { icon: Shield, title: "Authenticity", desc: "Guaranteed genuine products with full provenance and traceability." },
              { icon: Heart, title: "Service Excellence", desc: "Personal attention, expert guidance, and a commitment to your satisfaction." },
            ].map(({ icon: Icon, title, desc }, i) => (
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
    </div>
  );
}
