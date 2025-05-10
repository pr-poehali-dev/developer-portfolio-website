import React from "react";

interface NavItem {
  id: string;
  label: string;
}

interface NavMenuProps {
  items: NavItem[];
  activeSection: string;
  onNavClick: (sectionId: string) => void;
  className?: string;
}

const NavMenu: React.FC<NavMenuProps> = ({ 
  items, 
  activeSection, 
  onNavClick, 
  className = "" 
}) => {
  return (
    <nav className={`hidden lg:flex space-x-1 ${className}`}>
      {items.map((item) => (
        <NavItem
          key={item.id}
          id={item.id}
          label={item.label}
          isActive={activeSection === item.id}
          onClick={() => onNavClick(item.id)}
        />
      ))}
    </nav>
  );
};

interface NavItemProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ id, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md hover:bg-accent/10 transition-colors ${
        isActive ? "text-accent font-medium" : "text-foreground/70"
      }`}
    >
      {label}
    </button>
  );
};

export default NavMenu;
