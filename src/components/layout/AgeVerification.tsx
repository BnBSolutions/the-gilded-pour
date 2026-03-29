import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wine } from "lucide-react";

export default function AgeVerification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem("age-verified");
    if (!verified) setShow(true);
  }, []);

  const verify = () => {
    sessionStorage.setItem("age-verified", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-md px-8"
          >
            <Wine className="text-primary mx-auto mb-6" size={48} />
            <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-3">Welcome to Maison Élite</h1>
            <p className="text-muted-foreground mb-8">You must be of legal drinking age in your country to enter this site.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={verify}
                className="px-8 py-3 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors rounded-sm"
              >
                I Am 18 or Older
              </button>
              <a
                href="https://www.google.com"
                className="px-8 py-3 border border-border text-muted-foreground font-sans text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors rounded-sm"
              >
                I Am Under 18
              </a>
            </div>
            <p className="text-muted-foreground/50 text-xs mt-8">By entering, you accept our Terms & Conditions and Privacy Policy.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
