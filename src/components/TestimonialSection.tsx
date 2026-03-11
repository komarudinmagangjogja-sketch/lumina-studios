import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";

type Testimonial = {
  id: number;
  name: string;
  role?: string;
  message: string;
  rating?: number;
  photo?: string;
};

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));

  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  // AUTO SLIDE
  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (loading) {
    return (
      <section className="section-padding text-center">
        <p className="text-muted-foreground">Loading testimonials...</p>
      </section>
    );
  }

  if (!testimonials.length) return null;

  const item = testimonials[current];

  return (
    <section id="testimoni" className="section-padding bg-card/50">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-xs font-medium mb-3">
            Testimoni
          </p>

          <h2 className="font-display text-2xl md:text-4xl font-bold">
            Kata <span className="text-gold-gradient">Mereka</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-xl p-8 md:p-12 text-center"
            >
              {/* RATING */}

              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: item.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>

              {/* MESSAGE */}

              <p className="text-base md:text-lg leading-relaxed mb-8 text-muted-foreground italic font-light">
                "{item.message}"
              </p>

              {/* PHOTO */}

              <div className="flex justify-center mb-3">
                <img
                  src={
                    item.photo
                      ? `http://127.0.0.1:8000/storage/${item.photo}`
                      : `https://ui-avatars.com/api/?name=${item.name}`
                  }
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* NAME */}

              <p className="font-display font-semibold">{item.name}</p>

              <p className="text-primary text-xs tracking-wide uppercase">
                {item.role}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* NAVIGATION */}

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
