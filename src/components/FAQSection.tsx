import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Berapa lama proses editing?",
    a: "Proses editing biasanya memakan waktu 7-14 hari kerja tergantung jumlah foto dan kompleksitas editing. Untuk paket Platinum, kami juga menyediakan Same Day Edit.",
  },
  {
    q: "Apakah bisa request warna/tone?",
    a: "Tentu! Kami akan diskusikan preferensi warna dan tone Anda saat konsultasi awal. Kami juga menyediakan beberapa pilihan preset premium untuk referensi.",
  },
  {
    q: "Apakah bisa revisi?",
    a: "Ya, setiap paket sudah termasuk revisi. Paket Silver mendapat 1x revisi, Gold 2x revisi, dan Platinum unlimited revisi.",
  },
  {
    q: "Berapa DP yang harus dibayar?",
    a: "DP minimal 30% dari total harga paket. Pelunasan dilakukan setelah semua foto selesai dikirim.",
  },
  {
    q: "Apakah tersedia drone?",
    a: "Ya, kami menyediakan layanan drone untuk paket Gold dan Platinum. Untuk paket Silver, drone tersedia sebagai add-on dengan biaya tambahan.",
  },
];

const FAQSection = () => (
  <section id="faq" className="section-padding bg-card/50">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-primary tracking-[0.2em] uppercase text-xs font-medium mb-3">
          FAQ
        </p>
        <h2 className="font-display text-2xl md:text-4xl font-bold">
          Pertanyaan <span className="text-gold-gradient">Umum</span>
        </h2>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <AccordionItem
              value={`item-${i}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-sm md:text-base font-medium hover:no-underline hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
