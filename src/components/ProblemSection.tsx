import { motion } from "framer-motion";
import { ImageOff, Palette, Frown, MessageCircleOff } from "lucide-react";

const problems = [
  {
    icon: ImageOff,
    title: "Foto Biasa & Kurang Emosional",
    desc: "Hasil foto terasa datar dan tidak punya cerita",
  },
  {
    icon: Palette,
    title: "Editing Warna Tidak Konsisten",
    desc: "Tone warna berubah-ubah di setiap foto",
  },
  {
    icon: Frown,
    title: "Hasil Tidak Sesuai Ekspektasi",
    desc: "Kualitas akhir jauh dari yang dijanjikan",
  },
  {
    icon: MessageCircleOff,
    title: "Photographer Kurang Komunikatif",
    desc: "Sulit dihubungi dan lambat merespon",
  },
];

const ProblemSection = () => (
  <section className="section-padding">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary tracking-[0.2em] uppercase text-xs font-medium mb-3">
          Masalah Umum
        </p>
        <h2 className="font-display text-2xl md:text-4xl font-bold">
          Apakah Anda Pernah Mengalami{" "}
          <span className="text-gold-gradient">Hal Ini?</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors duration-300 group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <p.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-base font-semibold mb-2">
              {p.title}
            </h3>
            <p className="text-muted-foreground text-sm">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
