import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Beranda", href: "#hero" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Harga", href: "#harga" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(link.href);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
        {/* Logo */}
        <a
          href="#hero"
          className="font-display text-xl md:text-2xl font-bold tracking-wide"
        >
          <span className="text-gold-gradient">LUXFRAME</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                activeSection === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}

              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300 ${
                  activeSection === link.href ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}

          {/* Admin Button */}
          <button
            onClick={() =>
              navigate(token ? "/admin/dashboard" : "/admin/login")
            }
            className="relative text-sm font-medium uppercase tracking-wide group"
          >
            <span className="text-muted-foreground group-hover:text-primary transition-colors">
              {token ? "Dashboard" : "Admin"}
            </span>

            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </button>

          {/* Booking Button */}
          <Button variant="hero" size="sm" asChild>
            <a
              href="https://wa.me/6283135697744"
              target="_blank"
              rel="noopener noreferrer"
            >
              Booking
            </a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-border animate-fade-in">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                navigate(token ? "/admin/dashboard" : "/admin/login");
                setMobileOpen(false);
              }}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide text-left"
            >
              {token ? "Dashboard" : "Admin"}
            </button>

            <Button variant="hero" size="sm" asChild>
              <a
                href="https://wa.me/6283135697744"
                target="_blank"
                rel="noopener noreferrer"
              >
                Booking Sekarang
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
