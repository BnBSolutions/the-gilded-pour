import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, X, Gift, ArrowRight, Truck, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { product: products[0], qty: 1 },
    { product: products[6], qty: 2 },
  ]);
  const [giftNote, setGiftNote] = useState("");
  const [premiumWrap, setPremiumWrap] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const wrapCost = premiumWrap ? 50 : 0;
  const deliveryFree = subtotal >= 500;
  const total = subtotal + wrapCost + (deliveryFree ? 0 : 50);

  const updateQty = (index: number, delta: number) => {
    setCartItems(prev => prev.map((item, i) => i === index ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };
  const removeItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center">
        <ShoppingBag size={48} className="text-muted-foreground mx-auto mb-6" />
        <h1 className="font-serif text-3xl text-foreground mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Discover our premium collection and add something extraordinary.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans rounded-sm">
          Start Shopping <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-10">Your Cart</h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div key={item.product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex gap-4 p-5 bg-card border border-border rounded-sm"
              >
                <img src={item.product.image} alt={item.product.name} className="w-20 h-28 object-cover rounded-sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-muted-foreground text-[10px] tracking-widest uppercase font-sans mb-1">{item.product.category} · {item.product.size}</p>
                  <h3 className="font-serif text-sm text-foreground mb-2 truncate">{item.product.name}</h3>
                  <p className="text-primary text-sm font-sans">{item.product.price} {item.product.currency}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(index)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X size={16} />
                  </button>
                  <div className="flex items-center border border-border rounded-sm">
                    <button onClick={() => updateQty(index, -1)} className="px-2 py-1 text-muted-foreground"><Minus size={12} /></button>
                    <span className="px-2 text-foreground text-xs">{item.qty}</span>
                    <button onClick={() => updateQty(index, 1)} className="px-2 py-1 text-muted-foreground"><Plus size={12} /></button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Upsells */}
            <div className="mt-8">
              <p className="text-muted-foreground text-xs tracking-widest uppercase font-sans mb-4">Complete your order</p>
              <div className="grid grid-cols-2 gap-3">
                {products.filter(p => p.category === "Water").slice(0, 2).map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-3 bg-secondary rounded-sm border border-border hover:border-primary/30 cursor-pointer transition-colors">
                    <img src={p.image} alt={p.name} className="w-10 h-14 object-cover rounded-sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-xs truncate">{p.name}</p>
                      <p className="text-primary text-xs">{p.price} MDL</p>
                    </div>
                    <button className="text-muted-foreground hover:text-primary"><Plus size={14} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gift Note */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Gift size={14} className="text-primary" />
                <p className="text-foreground text-sm">Add a gift note</p>
              </div>
              <textarea
                value={giftNote}
                onChange={e => setGiftNote(e.target.value)}
                placeholder="Write your personal message..."
                className="w-full bg-secondary text-foreground placeholder:text-muted-foreground p-4 rounded-sm border border-border focus:border-primary outline-none resize-none h-24 text-sm"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="sticky top-24 bg-card border border-border rounded-sm p-6">
              <h3 className="font-serif text-lg text-foreground mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">{subtotal} MDL</span></div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryFree ? "text-primary" : "text-foreground"}>{deliveryFree ? "Free" : "50 MDL"}</span>
                </div>
                <label className="flex items-center justify-between text-sm cursor-pointer">
                  <span className="text-muted-foreground">Premium wrapping</span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">+50 MDL</span>
                    <input type="checkbox" checked={premiumWrap} onChange={e => setPremiumWrap(e.target.checked)}
                      className="accent-[hsl(var(--primary))] w-4 h-4" />
                  </div>
                </label>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-foreground font-sans font-medium">Total</span>
                  <span className="text-primary font-serif text-xl">{total} MDL</span>
                </div>
              </div>

              {!deliveryFree && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-6">
                  <Truck size={14} className="text-primary" />
                  <span>Add {500 - subtotal} MDL more for free delivery</span>
                </div>
              )}

              <button className="w-full py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans rounded-sm hover:bg-primary/90 transition-colors mb-3">
                Proceed to Checkout
              </button>
              <Link to="/shop" className="w-full flex items-center justify-center gap-2 py-3 text-muted-foreground text-xs tracking-widest uppercase font-sans hover:text-foreground transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
