import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  codeLink: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl group h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-36 sm:h-48">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
      </div>

      <CardContent className="pt-4 sm:pt-6 flex-grow">
        <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs py-0.5 px-1.5 sm:py-1 sm:px-2 bg-accent/10 text-accent rounded-full font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-3 sm:gap-4 border-t border-border/50 p-3 sm:pt-4 sm:pb-4 sm:px-6">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs sm:text-sm transition-all duration-300 hover:bg-accent hover:text-primary"
          onClick={() => window.open(project.demoLink, "_blank")}
        >
          <Icon
            name="ExternalLink"
            className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4"
          />
          Демо
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs sm:text-sm transition-all duration-300 hover:bg-accent hover:text-primary"
          onClick={() => window.open(project.codeLink, "_blank")}
        >
          <Icon name="Github" className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Код
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
