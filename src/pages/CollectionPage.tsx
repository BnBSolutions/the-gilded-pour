import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";
import { products, categories } from "@/data/products";

const collectionDescriptions: Record<string, string> = {
  sparkling: "From the rolling hills of Asolo to the vineyards of Treviso — our Prosecco and sparkling selection captures the essence of Italian celebration.",
  champagne: "The world's most prestigious Champagne houses, curated for the discerning palate. From Dom Pérignon to Krug, experience unrivaled excellence.",
  spirits: "Handcrafted tequilas, artisanal mezcals, and premium vodkas — each bottle tells a story of craftsmanship and heritage.",
  divin: "Moldova's finest aged Divin, matured over decades in oak barrels. A hidden treasure of the spirit world, rivaling the finest Cognacs.",
  magnum: "Make a statement with our large-format bottles. From elegant Magnums to impressive Jeroboams, these bottles command attention.",
  gifts: "Curated gift sets and premium packaging for every occasion. Birthdays, anniversaries, corporate gifts — we make giving unforgettable.",
};

export default function CollectionPage() {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug);
  const categoryName = category?.name || slug || "Collection";

  const categoryMap: Record<string, string> = {
    sparkling: "Sparkling", champagne: "Champagne", spirits: "Spirits",
    divin: "Divin", magnum: "Magnum", gifts: "Gift Sets", water: "Water",
  };

  const filtered = products.filter(p => p.category === (categoryMap[slug || ""] || slug));

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-secondary mb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">Collection</p>
            <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">{categoryName}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{collectionDescriptions[slug || ""] || "Explore our premium selection."}</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-muted-foreground text-sm mb-8">{filtered.length} bottles in this collection</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-foreground mb-2">Coming Soon</p>
            <p className="text-muted-foreground">This collection is being curated. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
