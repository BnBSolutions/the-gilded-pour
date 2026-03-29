import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Gift, ArrowLeft, Minus, Plus, Truck, RotateCcw, Shield } from "lucide-react";
import { useState } from "react";
import { getProductById, products } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id || "");
  const [qty, setQty] = useState(1);
  const { t } = useLanguage();

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="font-serif text-3xl text-foreground mb-4">{t("product.notFound")}</p>
        <Link to="/shop" className="text-primary text-sm tracking-widest uppercase">{t("product.backToShop")}</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground text-sm tracking-wider uppercase font-sans hover:text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> {t("product.backToShop")}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden premium-shadow">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {product.badge && (
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase font-sans mb-4 rounded-sm">{t(`badges.${product.badge}`)}</span>
            )}

            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-sans mb-2">{product.category} {product.subcategory && `· ${product.subcategory}`}</p>
            <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">{product.name}</h1>
            <p className="font-sans text-2xl text-primary font-medium mb-6">{product.price} {product.currency}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 py-6 border-y border-border">
              {product.size && <div><p className="text-muted-foreground text-[10px] tracking-widest uppercase font-sans mb-1">{t("product.size")}</p><p className="text-foreground text-sm">{product.size}</p></div>}
              {product.alcohol && <div><p className="text-muted-foreground text-[10px] tracking-widest uppercase font-sans mb-1">{t("product.alcohol")}</p><p className="text-foreground text-sm">{product.alcohol}</p></div>}
              {product.origin && <div><p className="text-muted-foreground text-[10px] tracking-widest uppercase font-sans mb-1">{t("product.origin")}</p><p className="text-foreground text-sm">{product.origin}</p></div>}
              {product.style && <div><p className="text-muted-foreground text-[10px] tracking-widest uppercase font-sans mb-1">{t("product.style")}</p><p className="text-foreground text-sm">{product.style}</p></div>}
              {product.age && <div><p className="text-muted-foreground text-[10px] tracking-widest uppercase font-sans mb-1">{t("product.age")}</p><p className="text-foreground text-sm">{product.age}</p></div>}
            </div>

            {product.tastingNotes && (
              <div className="mb-8">
                <h3 className="font-serif text-lg text-foreground mb-2">{t("product.tastingNotes")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{product.tastingNotes}</p>
              </div>
            )}

            {product.pairings && (
              <div className="mb-8">
                <h3 className="font-serif text-lg text-foreground mb-2">{t("product.suggestedPairings")}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.pairings.map(p => (
                    <span key={p} className="px-3 py-1 bg-secondary text-muted-foreground text-xs tracking-wider rounded-sm">{p}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3 text-muted-foreground hover:text-foreground transition-colors"><Minus size={14} /></button>
                <span className="px-4 py-3 text-foreground text-sm font-sans min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-3 text-muted-foreground hover:text-foreground transition-colors"><Plus size={14} /></button>
              </div>
              <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans rounded-sm hover:bg-primary/90 transition-colors">
                <ShoppingBag size={16} /> {t("product.addToCart")}
              </button>
              <button className="p-3.5 border border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Heart size={16} />
              </button>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3.5 border border-primary/30 text-primary text-sm tracking-widest uppercase font-sans rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors mb-8">
              <Gift size={16} /> {t("product.sendAsGift")}
            </button>

            <div className="space-y-3">
              {[
                { icon: Truck, textKey: "product.freeDelivery" },
                { icon: RotateCcw, textKey: "product.easyReturns" },
                { icon: Shield, textKey: "product.authenticity" },
              ].map(({ icon: Icon, textKey }) => (
                <div key={textKey} className="flex items-center gap-3 text-muted-foreground text-xs">
                  <Icon size={14} className="text-primary flex-shrink-0" /> {t(textKey)}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-serif text-2xl text-foreground text-center mb-10">{t("product.youMayAlsoEnjoy")}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
