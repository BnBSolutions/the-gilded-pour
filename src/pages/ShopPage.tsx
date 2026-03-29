import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/data/products";

const allCategories = ["All", "Sparkling", "Champagne", "Spirits", "Divin", "Magnum", "Water"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Name A–Z"];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = selectedCategory === "All" ? products : products.filter(p => p.category === selectedCategory);
    switch (sortBy) {
      case "Price: Low to High": return [...result].sort((a, b) => a.price - b.price);
      case "Price: High to Low": return [...result].sort((a, b) => b.price - a.price);
      case "Name A–Z": return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default: return result;
    }
  }, [selectedCategory, sortBy]);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">Our Collection</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">The Boutique</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Explore our curated selection of premium bottles — from everyday luxury to rare collector's editions.</p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-border pb-6">
          <div className="flex flex-wrap gap-2">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-sans rounded-sm transition-colors ${
                  selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-secondary text-foreground text-xs tracking-wider uppercase font-sans px-4 py-2 rounded-sm border-none outline-none cursor-pointer"
            >
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden p-2 text-muted-foreground">
              {showFilters ? <X size={18} /> : <SlidersHorizontal size={18} />}
            </button>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-8">{filtered.length} bottles</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-foreground mb-2">No bottles found</p>
            <p className="text-muted-foreground">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
