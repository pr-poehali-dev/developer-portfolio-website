
import TypewriterEffect from "@/components/TypewriterEffect";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onNavClick: (sectionId: string) => void;
}

const Hero = ({ onNavClick }: HeroProps) => {
  return (
    <section
      id="home"
      className="pt-28 sm:pt-32 pb-20 min-h-screen flex items-center relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="mb-4 sm:mb-6 text-accent font-mono">
            Привет, меня зовут
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4">
            <TypewriterEffect text="Имя Фамилия" />
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-muted-foreground mb-4 sm:mb-6">
            Я создаю веб-приложения.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
            Я веб-разработчик, специализирующийся на создании исключительных
            цифровых интерфейсов и функциональных web-приложений. В настоящее
            время я фокусируюсь на разработке доступных, человеко-ориентированных
            продуктов.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 xs:space-x-4">
            <Button
              size="lg"
              onClick={() => onNavClick("projects")}
              className="bg-accent text-primary hover:bg-accent/90 w-full xs:w-auto"
            >
              Посмотреть работы
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavClick("contact")}
              className="w-full xs:w-auto"
            >
              Связаться со мной
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
