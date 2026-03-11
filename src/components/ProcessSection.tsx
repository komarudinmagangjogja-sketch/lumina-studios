import { motion } from "framer-motion";
import { MessageSquare, Camera, Palette, RotateCcw, Send } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Konsultasi Konsep",
    desc: "Diskusi kebutuhan dan konsep foto Anda",
  },
  {
    icon: Camera,
    title: "Shooting Session",
    desc: "Sesi pemotretan profesional di lokasi",
  },
  {
    icon: Palette,
    title: "Editing & Color Grading",
    desc: "Proses editing premium dan color grading",
  },
  { icon: RotateCcw, title: "Revisi", desc: "Revisi sesuai keinginan Anda" },
  {
    icon: Send,
    title: "Final Delivery",
    desc: "Pengiriman file berkualitas tinggi",
  },
];

const ProcessSection = () => (
  <section className="section-padding">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary tracking-[0.2em] uppercase text-xs font-medium mb-3">
          Proses
        </p>
        <h2 className="font-display text-2xl md:text-4xl font-bold">
          Cara Kerja <span className="text-gold-gradient">Kami</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Line connector */}
        <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-border" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center mx-auto mb-4 relative z-10">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold mb-1">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
