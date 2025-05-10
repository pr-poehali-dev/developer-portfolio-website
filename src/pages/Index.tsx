
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import SkillsSection, { Skill } from "@/components/sections/Skills";
import ProjectsSection, { Project } from "@/components/sections/Projects";
import ExperienceSection, { Experience } from "@/components/sections/Experience";
import TestimonialsSection, { Testimonial } from "@/components/sections/Testimonials";
import ContactSection from "@/components/sections/Contact";

// Data
const skills: Skill[] = [
  { name: "HTML", percentage: 90, color: "#E34F26" },
  { name: "CSS", percentage: 85, color: "#1572B6" },
  { name: "JavaScript", percentage: 80, color: "#F7DF1E" },
  { name: "React", percentage: 85, color: "#61DAFB" },
  { name: "Node.js", percentage: 75, color: "#339933" },
];

const projects: Project[] = [
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

const experiences: Experience[] = [
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

const testimonials: Testimonial[] = [
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

  useEffect(() => {
    const handleScroll = () => {
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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ParticlesBackground />
      
      <Header 
        activeSection={activeSection} 
        onNavClick={handleNavClick} 
      />
      
      <main>
        <Hero onNavClick={handleNavClick} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection onResumeDownload={handleResumeDownload} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
