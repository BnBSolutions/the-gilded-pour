import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Heart, CreditCard, Settings, Gift, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");
  const { t } = useLanguage();

  const tabs = [
    { id: "orders", labelKey: "account.orders", icon: Package },
    { id: "subscriptions", labelKey: "account.subscriptions", icon: CreditCard },
    { id: "favorites", labelKey: "account.favorites", icon: Heart },
    { id: "gifts", labelKey: "account.gifts", icon: Gift },
    { id: "settings", labelKey: "account.settings", icon: Settings },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-2">{t("account.title")}</h1>
          <p className="text-muted-foreground">{t("account.welcome")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map(({ id, labelKey, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-sans rounded-sm transition-colors ${
                    activeTab === id ? "bg-card text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon size={16} /> {t(labelKey)} <ChevronRight size={14} className="ml-auto" />
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="font-serif text-xl text-foreground mb-4">{t("account.orderHistory")}</h2>
                {[
                  { id: "#ME-2847", date: "March 15, 2026", total: "1,380 MDL", items: 3 },
                  { id: "#ME-2831", date: "February 28, 2026", total: "4,700 MDL", items: 1 },
                  { id: "#ME-2810", date: "February 12, 2026", total: "690 MDL", items: 2 },
                ].map(order => (
                  <div key={order.id} className="flex items-center justify-between p-5 bg-card border border-border rounded-sm">
                    <div>
                      <p className="text-foreground font-sans text-sm font-medium">{order.id}</p>
                      <p className="text-muted-foreground text-xs">{order.date} · {order.items} {t("account.items")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary text-sm">{order.total}</p>
                      <p className="text-muted-foreground text-xs">{t("account.delivered")}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "subscriptions" && (
              <div>
                <h2 className="font-serif text-xl text-foreground mb-4">{t("account.subscriptions")}</h2>
                <div className="bg-card border border-primary/20 rounded-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-lg text-foreground">Luxury Club</h3>
                      <p className="text-muted-foreground text-sm">{t("account.activeSince")}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs tracking-widest uppercase rounded-sm">{t("account.active")}</span>
                  </div>
                  <p className="text-foreground text-sm mb-4">{t("account.nextDelivery")}</p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-secondary text-muted-foreground text-xs tracking-widest uppercase rounded-sm hover:text-foreground transition-colors">{t("account.skipNext")}</button>
                    <button className="px-4 py-2 bg-secondary text-muted-foreground text-xs tracking-widest uppercase rounded-sm hover:text-foreground transition-colors">{t("account.manage")}</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                <h2 className="font-serif text-xl text-foreground mb-4">{t("account.favorites")}</h2>
                <p className="text-muted-foreground text-sm">{t("account.favoritesEmpty")}</p>
              </div>
            )}

            {activeTab === "gifts" && (
              <div>
                <h2 className="font-serif text-xl text-foreground mb-4">{t("account.gifts")}</h2>
                <p className="text-muted-foreground text-sm">{t("account.giftsEmpty")}</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="font-serif text-xl text-foreground mb-4">{t("account.deliveryPreferences")}</h2>
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-sm p-5">
                    <p className="text-foreground text-sm font-medium mb-1">{t("account.defaultAddress")}</p>
                    <p className="text-muted-foreground text-sm">Str. Cărbunari 2, Chișinău, Moldova</p>
                  </div>
                  <div className="bg-card border border-border rounded-sm p-5">
                    <p className="text-foreground text-sm font-medium mb-1">{t("account.deliveryWindow")}</p>
                    <p className="text-muted-foreground text-sm">{t("account.weekdays")}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
