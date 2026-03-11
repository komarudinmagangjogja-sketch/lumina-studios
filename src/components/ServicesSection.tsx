"use client";

import { motion, Variants } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/lib/api";

import {
  Heart,
  GraduationCap,
  Users,
  Building2,
  Camera,
  Sparkles,
  Code,
  Briefcase,
} from "lucide-react";

const iconMap: any = {
  Heart,
  GraduationCap,
  Users,
  Building2,
  Camera,
  Sparkles,
  Code,
  Briefcase,
};

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const ServicesSection = () => {
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  return (
    <section id="layanan" className="relative section-padding overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.25em] uppercase text-xs font-medium mb-3">
            Layanan
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Layanan <span className="text-gold-gradient">Kami</span>
          </h2>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((s: any) => {
            const Icon = iconMap[s.icon] || Camera;

            return (
              <motion.div
                key={s.id}
                variants={item}
                whileHover={{ y: -10 }}
                className="group relative bg-card border border-border rounded-xl p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
              >
                {/* ICON */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                  <Icon className="w-7 h-7 text-primary transition-transform duration-500 group-hover:rotate-6" />
                </div>

                {/* TITLE */}
                <h3 className="font-display text-lg font-semibold mb-3">
                  {s.title}
                </h3>

                {/* DESC */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.description}
                </p>

                {/* HOVER GLOW */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_40px_hsl(43,76%,52%,0.15)]" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
