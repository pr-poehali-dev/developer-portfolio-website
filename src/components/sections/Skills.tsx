import SkillsChart from "@/components/SkillsChart";

export interface Skill {
  name: string;
  percentage: number;
  color: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <section id="skills" className="py-20 bg-accent/5">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">
          <span className="text-accent font-mono">02.</span> Мои навыки
        </h2>
        <div className="max-w-4xl">
          <SkillsChart skills={skills} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
