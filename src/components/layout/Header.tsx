import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/layout/Logo";
import NavMenu from "@/components/layout/NavMenu";
import MenuButton from "@/components/layout/MenuButton";
import MobileMenu from "@/components/layout/MobileMenu";

export interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
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

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Logo />
        
        <div className="flex items-center">
          {/* Десктопная навигация */}
          <NavMenu 
            items={navItems} 
            activeSection={activeSection} 
            onNavClick={onNavClick}
            className="mr-4" 
          />

          {/* Кнопка меню для мобильных */}
          <MenuButton 
            isOpen={mobileMenuOpen} 
            onClick={toggleMobileMenu}
            className="mr-2"
          />

          <ThemeToggle />
        </div>
      </div>

      {/* Мобильное/планшетное меню */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        onNavClick={onNavClick}
      />
    </header>
  );
};

export default Header;
