import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ 
  isOpen, 
  onClick, 
  className = "" 
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`lg:hidden hover:bg-accent/10 ${className}`}
      onClick={onClick}
      aria-label="Меню навигации"
      aria-expanded={isOpen}
      data-mobile-menu
    >
      <Icon name={isOpen ? "X" : "Menu"} className="h-5 w-5" />
    </Button>
  );
};

export default MenuButton;
