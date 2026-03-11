import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Cinematic wedding photography"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Promo Banner */}
      <div className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 flex items-center gap-2 text-xs md:text-sm animate-float">
          <span className="bg-primary rounded-full px-2 py-0.5 text-primary-foreground font-semibold text-[10px]">
            PROMO
          </span>
          <span className="text-primary font-medium">
            Bonus Free 5 Edited Photos untuk 10 klien pertama!
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-6"
        >
          Cinematic Photography & Premium Retouching
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Abadikan Momen Sekali Seumur Hidup{" "}
          <span className="text-gold-gradient">
            Dengan Hasil yang Tak Terlupakan
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10"
        >
          Kami menghadirkan pengalaman fotografi premium dengan sentuhan
          cinematic yang membuat setiap momen menjadi karya seni.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="hero" size="lg" asChild>
            <a href="#portfolio">Lihat Portfolio</a>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <a
              href="https://wa.me/6283135697744"
              target="_blank"
              rel="noopener noreferrer"
            >
              Booking Sekarang
            </a>
          </Button>
        </motion.div>

        {/* Slot badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground"
        >
          <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          Slot Terbatas Setiap Bulan
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
