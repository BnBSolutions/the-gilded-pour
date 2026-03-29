import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";
import { products, categories } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageContext";

export default function CollectionPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const category = categories.find(c => c.slug === slug);

  const catNameKey = category ? `categories.${category.name}` : "";
  const translatedCatName = catNameKey ? t(catNameKey) : "";
  const categoryName = (translatedCatName && translatedCatName !== catNameKey) ? translatedCatName : (category?.name || slug || "Collection");

  const categoryMap: Record<string, string> = {
    sparkling: "Sparkling", champagne: "Champagne", spirits: "Spirits",
    divin: "Divin", magnum: "Magnum", gifts: "Gift Sets", water: "Water",
  };

  const filtered = products.filter(p => p.category === (categoryMap[slug || ""] || slug));

  const descKey = `collections.${slug}Desc`;
  const description = t(descKey);
  const descText = description !== descKey ? description : t("collections.comingSoonDesc");

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-secondary mb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">{t("collections.collectionTag")}</p>
            <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">{categoryName}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{descText}</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-muted-foreground text-sm mb-8">{filtered.length} {t("collections.bottlesInCollection")}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-foreground mb-2">{t("collections.comingSoon")}</p>
            <p className="text-muted-foreground">{t("collections.comingSoonDesc")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
