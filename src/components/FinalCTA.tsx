import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ctaBg from "@/assets/cta-bg.jpg";

const FinalCTA = () => (
  <section className="relative py-28 md:py-36 overflow-hidden">
    <div className="absolute inset-0">
      <img src={ctaBg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/85" />
    </div>

    <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-primary tracking-[0.2em] uppercase text-xs font-medium mb-4"
      >
        Jangan Tunda Lagi
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight"
      >
        Karena Setiap Momen{" "}
        <span className="text-gold-gradient">Tidak Bisa Diulang.</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground mb-10 text-base md:text-lg"
      >
        Hubungi kami sekarang dan konsultasikan kebutuhan fotografi Anda. Tim
        kami siap membantu mewujudkan momen terbaik Anda.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button variant="hero" size="lg" asChild>
          <a
            href="https://wa.me/6283135697744"
            target="_blank"
            rel="noopener noreferrer"
          >
            Booking Sekarang
          </a>
        </Button>
        <Button variant="heroOutline" size="lg" asChild>
          <a
            href="https://wa.me/6283135697744?text=Halo,%20saya%20ingin%20konsultasi%20gratis"
            target="_blank"
            rel="noopener noreferrer"
          >
            Konsultasi Gratis
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
