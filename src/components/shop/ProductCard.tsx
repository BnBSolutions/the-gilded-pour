import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { t } = useLanguage();

  const badgeColors: Record<string, string> = {
    Bestseller: "bg-primary text-primary-foreground",
    Limited: "bg-accent text-accent-foreground",
    "Gift Pick": "bg-secondary text-secondary-foreground border border-primary/30",
    "Club Favorite": "bg-secondary text-primary border border-primary/20",
  };

  const translatedBadge = product.badge ? t(`badges.${product.badge}`) : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.badge && (
            <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] tracking-widest uppercase font-sans font-medium rounded-sm ${badgeColors[product.badge] || "bg-secondary text-foreground"}`}>
              {translatedBadge}
            </span>
          )}

          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground text-xs tracking-wider uppercase font-sans rounded-sm hover:bg-primary/90 transition-colors">
              <ShoppingBag size={14} /> {t("product.add")}
            </button>
            <button className="px-3 py-2.5 bg-secondary/90 backdrop-blur-sm text-foreground rounded-sm hover:bg-secondary transition-colors">
              <Eye size={14} />
            </button>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-[10px] tracking-widest uppercase font-sans mb-1">
            {product.category} {product.size && `· ${product.size}`}
          </p>
          <h3 className="font-serif text-sm lg:text-base text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="font-sans text-sm text-primary font-medium">
            {product.price} {product.currency}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
