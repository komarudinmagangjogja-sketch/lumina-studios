import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/6283135697744"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(142,70%,45%)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
    aria-label="Chat WhatsApp"
  >
    <MessageCircle className="w-6 h-6 text-foreground" />
    <span className="absolute right-full mr-3 bg-card border border-border rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Chat dengan kami
    </span>
  </a>
);

export default WhatsAppButton;
