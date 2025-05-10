import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Icon from "@/components/ui/icon";
import TypewriterEffect from "@/components/TypewriterEffect";
import SkillsChart from "@/components/SkillsChart";
import ProjectCard from "@/components/ProjectCard";
import Timeline from "@/components/Timeline";
import TestimonialSlider from "@/components/TestimonialSlider";
import ThemeToggle from "@/components/ThemeToggle";
import SocialIcon from "@/components/SocialIcon";
import ParticlesBackground from "@/components/ParticlesBackground";

const skills = [
  { name: "HTML", percentage: 90, color: "#E34F26" },
  { name: "CSS", percentage: 85, color: "#1572B6" },
  { name: "JavaScript", percentage: 80, color: "#F7DF1E" },
  { name: "React", percentage: 85, color: "#61DAFB" },
  { name: "Node.js", percentage: 75, color: "#339933" },
];

const projects = [
  {
    id: 1,
    title: "Интернет-магазин",
    description: "Полнофункциональный интернет-магазин с каталогом и корзиной",
    image:
      "https://images.unsplash.com/photo-1593642702909-dec73df255d7?q=80&w=800&auto=format&fit=crop",
    technologies: ["React", "Node.js", "MongoDB"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    id: 2,
    title: "Дашборд аналитики",
    description: "Система визуализации данных для бизнес-аналитики",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    technologies: ["React", "D3.js", "Firebase"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    id: 3,
    title: "Социальная сеть",
    description: "Веб-приложение с возможностью создания профиля и публикаций",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
    technologies: ["React", "Redux", "Node.js", "PostgreSQL"],
    demoLink: "#",
    codeLink: "#",
  },
];

const experiences = [
  {
    id: 1,
    date: "2022 — н.в.",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    description:
      "Разработка и поддержка клиентской части высоконагруженных проектов.",
    achievements: [
      "Повысил производительность ключевых страниц на 40%",
      "Внедрил CI/CD и автоматизированное тестирование",
    ],
  },
  {
    id: 2,
    date: "2019 — 2022",
    title: "Frontend Developer",
    company: "Digital Solutions",
    description: "Создание интерфейсов для веб-приложений и сайтов.",
    achievements: [
      "Участвовал в разработке 15+ проектов",
      "Внедрил новую компонентную библиотеку",
    ],
  },
  {
    id: 3,
    date: "2017 — 2019",
    title: "Junior Developer",
    company: "WebStudio",
    description: "Верстка и базовое программирование для сайтов.",
    achievements: [
      "Создал 30+ лендингов",
      "Изучил и внедрил React в процессы компании",
    ],
  },
];

const testimonials = [
  {
    id: 1,
    text: "Отличный специалист, быстро и качественно реализовал все требования проекта. Рекомендую!",
    author: "Анна Смирнова",
    position: "СЕО, Digital Media",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 2,
    text: "Впечатляющий уровень технической экспертизы. Решил сложную задачу, с которой не справились предыдущие разработчики.",
    author: "Иван Петров",
    position: "Продакт-менеджер, TechStart",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 3,
    text: "Профессионал своего дела. Проект был выполнен в срок и с превосходным качеством. Будем сотрудничать снова!",
    author: "Мария Иванова",
    position: "Маркетинг-директор, BrandEx",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=150&auto=format&fit=crop",
  },
];

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id") as string;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResumeDownload = () => {
    toast({
      title: "Резюме скачивается",
      description: "Спасибо за интерес к моему резюме!",
    });
  };

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "skills", label: "Навыки" },
    { id: "projects", label: "Проекты" },
    { id: "experience", label: "Опыт" },
    { id: "testimonials", label: "Отзывы" },
    { id: "contact", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ParticlesBackground />
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
                  onClick={() => handleNavClick(item.id)}
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
                      handleNavClick(item.id);
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
      <main>
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
                цифровых интерфейсов и функциональных web-приложений. В
                настоящее время я фокусируюсь на разработке доступных,
                человеко-ориентированных продуктов.
              </p>
              <div className="flex flex-col xs:flex-row gap-3 xs:space-x-4">
                <Button
                  size="lg"
                  onClick={() => handleNavClick("projects")}
                  className="bg-accent text-primary hover:bg-accent/90 w-full xs:w-auto"
                >
                  Посмотреть работы
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleNavClick("contact")}
                  className="w-full xs:w-auto"
                >
                  Связаться со мной
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="skills" className="py-20 bg-accent/5">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="text-accent font-mono">02.</span> Мои навыки
            </h2>
            <div className="max-w-4xl mx-auto">
              <SkillsChart skills={skills} />
            </div>
          </div>
        </section>
        <section id="projects" className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
              <span className="text-accent font-mono">03.</span> Проекты
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
        <section id="experience" className="py-20 bg-accent/5">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="text-accent font-mono">04.</span> Опыт работы
            </h2>
            <div className="max-w-4xl mx-auto">
              <Timeline experiences={experiences} />
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="text-accent font-mono">05.</span> Отзывы
            </h2>
            <div className="max-w-4xl mx-auto">
              <TestimonialSlider testimonials={testimonials} />
            </div>
          </div>
        </section>
        <section id="contact" className="py-16 sm:py-20 bg-accent/5">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">
              <span className="text-accent font-mono">06.</span> Связаться со
              мной
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                В настоящее время я открыт для новых возможностей и проектов.
                Если у вас есть вопрос или вы хотите обсудить потенциальное
                сотрудничество, свяжитесь со мной любым удобным способом.
              </p>
              <div className="flex justify-center flex-wrap gap-4 sm:space-x-6 mb-8 sm:mb-10">
                <SocialIcon platform="github" url="https://github.com" />
                <SocialIcon platform="linkedin" url="https://linkedin.com" />
                <SocialIcon platform="twitter" url="https://twitter.com" />
                <SocialIcon platform="telegram" url="https://t.me/username" />
              </div>
              <Button
                size="lg"
                onClick={handleResumeDownload}
                className="bg-accent text-primary hover:bg-accent/90 w-full xs:w-auto"
              >
                <Icon name="FileDown" className="mr-2 h-5 w-5" />
                Скачать резюме
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t border-accent/20">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Имя Фамилия. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
