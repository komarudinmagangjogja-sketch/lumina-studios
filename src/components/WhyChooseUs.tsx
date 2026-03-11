import { motion } from "framer-motion";
import { Camera, Palette, Sparkles, Clock, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: Camera, text: "Cinematic & Story Based Photography" },
  { icon: Palette, text: "Warna Konsisten & Premium Color Grading" },
  { icon: Sparkles, text: "Detail Retouching Natural" },
  { icon: Clock, text: "Fast Response & Tepat Waktu" },
  { icon: Users, text: "Tim Profesional & Berpengalaman" },
];

const stats = [
  { value: 300, suffix: "+", label: "Project Selesai" },
  { value: 200, suffix: "+", label: "Client Puas" },
  { value: 4.9, suffix: "", label: "Rating" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setVal(target);
              clearInterval(timer);
            } else {
              setVal(Math.floor(current * 10) / 10);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl md:text-5xl font-bold text-gold-gradient">
        {Number.isInteger(target) ? Math.floor(val) : val.toFixed(1)}
        {suffix}
      </p>
    </div>
  );
}

const WhyChooseUs = () => (
  <section className="section-padding bg-card/50">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary tracking-[0.2em] uppercase text-xs font-medium mb-3">
          Mengapa Kami
        </p>
        <h2 className="font-display text-2xl md:text-4xl font-bold">
          Alasan Memilih <span className="text-gold-gradient">LUXFRAME</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm md:text-base">{f.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <Counter target={s.value} suffix={s.suffix} />
              <p className="text-muted-foreground text-xs md:text-sm mt-2">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
