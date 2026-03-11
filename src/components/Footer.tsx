import { Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 py-12 px-4 md:px-8">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
      <div>
        <h3 className="font-display text-xl font-bold text-gold-gradient mb-4">
          LUXFRAME
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Cinematic Photography & Premium Retouching Service. Menghadirkan karya
          visual premium untuk setiap momen berharga Anda.
        </p>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-4">Layanan</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Wedding Photography</li>
          <li>Prewedding</li>
          <li>Wisuda</li>
          <li>Corporate & Company Profile</li>
          <li>Photo Editing & Retouching</li>
        </ul>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-4">Kontak</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" /> +62 831-3569-77744
          </li>
          <li className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" /> hello@luxframe.id
          </li>
          <li className="flex items-center gap-2">
            <Instagram className="w-4 h-4 text-primary" /> @luxframe.id
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Jakarta, Indonesia
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
      © 2026 LUXFRAME. All rights reserved.
    </div>
  </footer>
);

export default Footer;
