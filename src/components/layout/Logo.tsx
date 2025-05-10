import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <a
      href="#home"
      className={`text-xl sm:text-2xl font-bold font-mono text-primary hover:text-primary/80 transition-colors ${className}`}
    >
      <span className="text-accent">{"<"}</span>
      <span className="hidden xs:inline">Веб-разработчик</span>
      <span className="xs:hidden">Разработчик</span>
      <span className="text-accent">{"/>"}</span>
    </a>
  );
};

export default Logo;
