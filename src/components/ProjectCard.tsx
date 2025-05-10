
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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
      className="overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
      </div>
      
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs py-1 px-2 bg-accent/10 text-accent rounded-full font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-4 border-t border-border/50 pt-4 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 transition-all duration-300 hover:bg-accent hover:text-primary"
          onClick={() => window.open(project.demoLink, '_blank')}
        >
          <Icon name="ExternalLink" className="mr-2 h-4 w-4" />
          Демо
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 transition-all duration-300 hover:bg-accent hover:text-primary"
          onClick={() => window.open(project.codeLink, '_blank')}
        >
          <Icon name="Github" className="mr-2 h-4 w-4" />
          Код
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
