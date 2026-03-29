import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/products";

export default function CollectionsIndex() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">Explore</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">Our Collections</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Browse by category and discover curated selections of the world's finest bottles.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/collections/${cat.slug}`} className="group relative block aspect-[4/5] rounded-sm overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="font-serif text-2xl text-foreground mb-1">{cat.name}</h2>
                  <p className="text-muted-foreground text-sm">{cat.count} bottles</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
