"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPortfolios } from "@/lib/api";

type Category =
  | "Semua"
  | "Wedding"
  | "Prewedding"
  | "Wisuda"
  | "Corporate"
  | "Event";

const categories: Category[] = [
  "Semua",
  "Wedding",
  "Prewedding",
  "Wisuda",
  "Corporate",
  "Event",
];

const PortfolioGallery = () => {
  const [active, setActive] = useState<Category>("Semua");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const { data: portfolios = [] } = useQuery({
    queryKey: ["portfolios"],
    queryFn: getPortfolios,
  });

  const filtered =
    active === "Semua"
      ? portfolios
      : portfolios.filter((p: any) => p.category === active);

  return (
    <section id="portfolio" className="section-padding bg-card/50">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-xs font-medium mb-3">
            Portfolio
          </p>

          <h2 className="font-display text-2xl md:text-4xl font-bold">
            Karya <span className="text-gold-gradient">Terbaik Kami</span>
          </h2>
        </motion.div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                active === cat
                  ? "bg-gold-gradient text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((photo: any) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid hover-zoom rounded-xl cursor-pointer group relative overflow-hidden"
                onClick={() =>
                  setLightbox(`http://127.0.0.1:8000/storage/${photo.image}`)
                }
              >
                <img
                  src={`http://127.0.0.1:8000/storage/${photo.image}`}
                  alt={photo.title}
                  className="w-full rounded-xl"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {photo.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-foreground hover:text-primary">
              <X size={28} />
            </button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightbox}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioGallery;
