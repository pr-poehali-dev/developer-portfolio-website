
import Timeline from "@/components/Timeline";

export interface Experience {
  id: number;
  date: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  return (
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
  );
};

export default ExperienceSection;
