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

  // Закрываем меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (mobileMenuOpen && !target.closest("[data-mobile-menu]")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Закрываем меню при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  // Блокируем прокрутку при открытом меню
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
          {/* Навигация на больших экранах */}
          <nav className="hidden lg:flex space-x-1 mr-4">
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

          {/* Кнопка бургер-меню */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2 hover:bg-accent/10"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Меню навигации"
            aria-expanded={mobileMenuOpen}
            data-mobile-menu
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} className="h-5 w-5" />
          </Button>

          <ThemeToggle />
        </div>
      </div>

      {/* Мобильное/планшетное меню */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-md z-40 lg:hidden transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-mobile-menu
      >
        <div className="container mx-auto px-4 py-16">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-md hover:bg-accent/10 transition-colors text-left text-lg ${
                  activeSection === item.id
                    ? "text-accent font-medium bg-accent/5"
                    : "text-foreground/70"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Социальные сети в мобильном меню */}
          <div className="mt-8 border-t border-border/30 pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Связаться со мной
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-accent/10 text-foreground/70 hover:text-accent transition-colors"
              >
                <Icon name="Github" className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-accent/10 text-foreground/70 hover:text-accent transition-colors"
              >
                <Icon name="Linkedin" className="h-6 w-6" />
              </a>
              <a
                href="https://t.me/username"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-accent/10 text-foreground/70 hover:text-accent transition-colors"
              >
                <Icon name="Send" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Кнопка закрытия в верхнем углу */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-accent/10 text-foreground"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Закрыть меню"
        >
          <Icon name="X" className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
