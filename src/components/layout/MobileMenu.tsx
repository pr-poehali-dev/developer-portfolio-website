import { useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { id: string; label: string }[];
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  navItems,
  activeSection,
  onNavClick,
}: MobileMenuProps) => {
  // Блокируем прокрутку при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavItemClick = (sectionId: string) => {
    onNavClick(sectionId);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-background/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      data-mobile-menu
    >
      <div className="container mx-auto px-4 py-16">
        <nav className="flex flex-col space-y-2">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavItemClick(item.id)}
              className={`menu-item-animation px-4 py-3 rounded-md hover:bg-accent/10 transition-colors text-left text-lg ${
                activeSection === item.id
                  ? "text-accent font-medium bg-accent/5"
                  : "text-foreground/70"
              }`}
              style={{ animationDelay: `${0.05 * (index + 1)}s` }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Социальные сети в мобильном меню */}
        <div className="mt-8 border-t border-border/30 pt-6 menu-item-animation" style={{ animationDelay: "0.4s" }}>
          <p className="text-sm text-muted-foreground mb-4">
            Связаться со мной
          </p>
          <div className="flex space-x-4">
            <SocialLink href="https://github.com" icon="Github" />
            <SocialLink href="https://linkedin.com" icon="Linkedin" />
            <SocialLink href="https://t.me/username" icon="Send" />
          </div>
        </div>
      </div>

      {/* Кнопка закрытия в верхнем углу */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-accent/10 text-foreground menu-item-animation"
        onClick={onClose}
        aria-label="Закрыть меню"
        style={{ animationDelay: "0.1s" }}
      >
        <Icon name="X" className="h-6 w-6" />
      </button>
    </div>
  );
};

interface SocialLinkProps {
  href: string;
  icon: string;
}

const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-md hover:bg-accent/10 text-foreground/70 hover:text-accent transition-colors"
  >
    <Icon name={icon} className="h-6 w-6" />
  </a>
);

export default MobileMenu;
