import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/i18n/ThemeContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AgeVerification from "@/components/layout/AgeVerification";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import BuildYourBoxPage from "./pages/BuildYourBoxPage";
import CollectionsIndex from "./pages/CollectionsIndex";
import CollectionPage from "./pages/CollectionPage";
import GiftingPage from "./pages/GiftingPage";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <ScrollToTop />
          <AgeVerification />
          <Header />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/subscriptions" element={<SubscriptionPage />} />
              <Route path="/build-your-box" element={<BuildYourBoxPage />} />
              <Route path="/collections" element={<CollectionsIndex />} />
              <Route path="/collections/:slug" element={<CollectionPage />} />
              <Route path="/gifting" element={<GiftingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </HashRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
