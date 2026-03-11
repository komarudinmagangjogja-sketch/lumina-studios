import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Pricing = {
  id: number;
  title: string;
  price: number;
  features: string[] | string;
  is_active: boolean;
  is_popular?: boolean;
};

const PricingSection = () => {
  const [pricings, setPricings] = useState<Pricing[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/pricings")
      .then((res) => res.json())
      .then((data) => setPricings(data))
      .catch((err) => console.error("Failed to load pricings:", err));
  }, []);

  return (
    <section id="harga" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-xs font-medium mb-3">
            Harga
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-bold">
            Paket{" "}
            <span className="text-gold-gradient">Wedding Photography</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pricings.map((pkg, i) => {
            const features =
              typeof pkg.features === "string"
                ? JSON.parse(pkg.features)
                : pkg.features;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-xl border p-8 transition-all duration-500 ${
                  pkg.is_popular
                    ? "border-primary bg-card glow-gold scale-[1.02]"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {pkg.is_popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-primary-foreground text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-full flex items-center gap-1">
                    <Star size={10} /> Terlaris
                  </div>
                )}

                <h3 className="font-display text-xl font-bold mb-1">
                  {pkg.title}
                </h3>

                <p className="text-muted-foreground text-xs mb-4">
                  Wedding Package
                </p>

                <p className="font-display text-2xl md:text-3xl font-bold text-gold-gradient mb-1">
                  Rp {pkg.price.toLocaleString("id-ID")}
                </p>

                <p className="text-muted-foreground text-xs mb-6">
                  Starting from
                </p>

                <ul className="space-y-3 mb-8">
                  {features.map((f: string, fi: number) => (
                    <li key={fi} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.is_popular ? "hero" : "heroOutline"}
                  className="w-full"
                  asChild
                >
                  <a
                    href="https://wa.me/6283135697744"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pilih Paket
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Other pricing */}
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h3 className="font-display text-lg font-bold mb-2">
              Corporate Photography
            </h3>
            <p className="text-gold-gradient font-display text-2xl font-bold mb-1">
              Rp 4.000.000
            </p>
            <p className="text-muted-foreground text-sm">
              Start from — Termasuk editing profesional
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h3 className="font-display text-lg font-bold mb-2">
              Photo Editing Only
            </h3>
            <p className="text-gold-gradient font-display text-2xl font-bold mb-1">
              Rp 25.000
            </p>
            <p className="text-muted-foreground text-sm">
              Per foto — Color grading & retouching premium
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
