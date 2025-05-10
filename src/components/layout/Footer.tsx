
const Footer = () => {
  return (
    <footer className="py-6 border-t border-accent/20">
      <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Имя Фамилия. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
