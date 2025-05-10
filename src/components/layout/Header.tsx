
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Главная" },
  { id: "skills", label: "Навыки" },
  { id: "projects", label: "Проекты" },
  { id: "experience", label: "Опыт" },
  { id: "testimonials", label: "Отзывы" },
  { id: "contact", label: "Контакты" },
];

const Header = ({ activeSection, onNavClick }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a
          href="#home"
          className="text-xl sm:text-2xl font-bold font-mono text-primary hover:text-primary/80 transition-colors"
        >
          <span className="text-accent">{"<"}</span>
          <span className="hidden xs:inline">Веб-разработчик</span>
          <span className="xs:hidden">Разработчик</span>
          <span className="text-accent">{"/>"}</span>
        </a>
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-1 mr-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`px-3 py-2 rounded-md hover:bg-accent/10 transition-colors ${
                  activeSection === item.id
                    ? "text-accent font-medium"
                    : "text-foreground/70"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2 hover:bg-accent/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню навигации"
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavClick(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-md hover:bg-accent/10 transition-colors text-left ${
                    activeSection === item.id
                      ? "text-accent font-medium bg-accent/5"
                      : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
