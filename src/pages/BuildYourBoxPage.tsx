import { useState } from "react";
import { motion } from "framer-motion";
import { Wine, Sparkles, Package, Gift, Plus, Minus, ArrowRight } from "lucide-react";
import { products } from "@/data/products";

const bottleTypes = [
  { id: "sparkling", label: "Sparkling & Prosecco", icon: Sparkles },
  { id: "champagne", label: "Champagne", icon: Wine },
  { id: "spirits", label: "Premium Spirits", icon: Package },
  { id: "divin", label: "Aged Divin", icon: Gift },
];

export default function BuildYourBoxPage() {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [giftNote, setGiftNote] = useState("");
  const [step, setStep] = useState(1);

  const totalBottles = Object.values(selected).reduce((a, b) => a + b, 0);
  const selectedProducts = Object.entries(selected)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ product: products.find(p => p.id === id)!, qty }));
  const totalPrice = selectedProducts.reduce((sum, { product, qty }) => sum + product.price * qty, 0);

  const toggleProduct = (id: string, delta: number) => {
    setSelected(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(6, current + delta));
      if (next === 0) { const { [id]: _, ...rest } = prev; return rest; }
      return { ...prev, [id]: next };
    });
  };

  const availableProducts = products.filter(p => p.category !== "Water");

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-sans mb-3">Custom Curation</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">Build Your Box</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Select your favorite bottles, choose quantities, and create a personalized luxury box.</p>
        </motion.div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-8 mb-12">
          {["Select Bottles", "Preferences", "Review"].map((s, i) => (
            <button key={s} onClick={() => setStep(i + 1)}
              className={`text-xs tracking-widest uppercase font-sans transition-colors ${step === i + 1 ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span className="font-serif text-lg mr-2">{String(i + 1).padStart(2, "0")}</span>{s}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product selection */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="space-y-4">
                {/* Quick filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {bottleTypes.map(({ id, label, icon: Icon }) => (
                    <button key={id} className="flex items-center gap-2 px-4 py-2 bg-secondary text-muted-foreground text-xs tracking-wider uppercase font-sans rounded-sm hover:text-primary transition-colors">
                      <Icon size={14} /> {label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {availableProducts.map(product => {
                    const qty = selected[product.id] || 0;
                    return (
                      <motion.div key={product.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className={`flex gap-4 p-4 rounded-sm border transition-colors ${qty > 0 ? "border-primary bg-card" : "border-border bg-secondary"}`}
                      >
                        <img src={product.image} alt={product.name} className="w-16 h-20 object-cover rounded-sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-muted-foreground text-[10px] tracking-widest uppercase font-sans">{product.category} · {product.size}</p>
                          <h3 className="font-serif text-sm text-foreground truncate">{product.name}</h3>
                          <p className="text-primary text-sm font-sans mt-1">{product.price} {product.currency}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => toggleProduct(product.id, -1)} className="p-1 text-muted-foreground hover:text-foreground"><Minus size={14} /></button>
                          <span className="w-6 text-center text-foreground text-sm">{qty}</span>
                          <button onClick={() => toggleProduct(product.id, 1)} className="p-1 text-muted-foreground hover:text-foreground"><Plus size={14} /></button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-3">Delivery Frequency</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {["Monthly", "Bi-Monthly", "One-Time"].map(f => (
                      <button key={f} className="py-3 bg-secondary text-muted-foreground text-xs tracking-widest uppercase font-sans rounded-sm hover:bg-card hover:text-primary border border-border hover:border-primary transition-colors">
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-3">Gift Note (Optional)</h3>
                  <textarea
                    value={giftNote}
                    onChange={e => setGiftNote(e.target.value)}
                    placeholder="Add a personal message..."
                    className="w-full bg-secondary text-foreground placeholder:text-muted-foreground p-4 rounded-sm border border-border focus:border-primary outline-none resize-none h-32 text-sm"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-3">Wrapping</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Standard Box", "Premium Gift Wrap (+50 MDL)"].map(w => (
                      <button key={w} className="py-3 bg-secondary text-muted-foreground text-xs tracking-widest uppercase font-sans rounded-sm hover:bg-card hover:text-primary border border-border hover:border-primary transition-colors">
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-serif text-lg text-foreground mb-4">Your Box Summary</h3>
                {selectedProducts.length === 0 ? (
                  <p className="text-muted-foreground">No bottles selected yet. Go back to add some!</p>
                ) : (
                  <div className="space-y-3">
                    {selectedProducts.map(({ product, qty }) => (
                      <div key={product.id} className="flex items-center gap-4 p-4 bg-secondary rounded-sm">
                        <img src={product.image} alt={product.name} className="w-12 h-16 object-cover rounded-sm" />
                        <div className="flex-1">
                          <p className="font-serif text-sm text-foreground">{product.name}</p>
                          <p className="text-muted-foreground text-xs">{product.size}</p>
                        </div>
                        <p className="text-foreground text-sm">×{qty}</p>
                        <p className="text-primary text-sm font-sans">{product.price * qty} {product.currency}</p>
                      </div>
                    ))}
                    {giftNote && (
                      <div className="p-4 bg-secondary rounded-sm">
                        <p className="text-muted-foreground text-xs tracking-widest uppercase font-sans mb-1">Gift Note</p>
                        <p className="text-foreground text-sm italic">"{giftNote}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-sm border border-border p-6">
              <h3 className="font-serif text-lg text-foreground mb-4">Your Box</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bottles</span>
                  <span className="text-foreground">{totalBottles}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{totalPrice} MDL</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-foreground font-sans font-medium">Total</span>
                  <span className="text-primary font-serif text-xl">{totalPrice} MDL</span>
                </div>
              </div>
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-sans rounded-sm hover:bg-primary/90 transition-colors">
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-sans rounded-sm hover:bg-primary/90 transition-colors">
                  Add to Cart <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
