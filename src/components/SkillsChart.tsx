import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface Skill {
  name: string;
  percentage: number;
  color: string;
}

interface SkillsChartProps {
  skills: Skill[];
}

const SkillsChart = ({ skills }: SkillsChartProps) => {
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>(
    skills.map(() => 0),
  );
  const [isVisible, setIsVisible] = useState(false);

  // Get icon name from skill name
  const getIconName = (skillName: string): string => {
    const iconMap: Record<string, string> = {
      HTML: "FileCode",
      CSS: "Paintbrush",
      JavaScript: "Code",
      React: "Atom",
      "Node.js": "Server",
      TypeScript: "FileType",
      GraphQL: "GitGraph",
      Git: "GitBranch",
      MongoDB: "Database",
      PostgreSQL: "Database",
      Docker: "Ship",
      AWS: "Cloud",
    };

    return iconMap[skillName] || "Code";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("skills-chart");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Animate percentages from 0 to actual value
    const intervals = skills.map((skill, index) => {
      let count = 0;
      const targetPercentage = skill.percentage;
      const step = targetPercentage / 50; // Complete in ~50 steps

      return setInterval(() => {
        count += step;
        if (count >= targetPercentage) {
          count = targetPercentage;
          clearInterval(intervals[index]);
        }

        setAnimatedPercentages((prev) => {
          const newPercentages = [...prev];
          newPercentages[index] = count;
          return newPercentages;
        });
      }, 20);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [isVisible, skills]);

  return (
    <div id="skills-chart" className="space-y-5 sm:space-y-8">
      {skills.map((skill, index) => (
        <div key={skill.name} className="relative">
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <div className="flex items-center">
              <div
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center mr-2 sm:mr-3"
                style={{ backgroundColor: `${skill.color}20` }}
              >
                <Icon
                  name={getIconName(skill.name)}
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  style={{ color: skill.color }}
                />
              </div>
              <span className="font-medium text-sm sm:text-base">
                {skill.name}
              </span>
            </div>
            <span className="font-mono text-accent text-sm sm:text-base">
              {Math.round(animatedPercentages[index])}%
            </span>
          </div>

          <div className="h-1.5 sm:h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${animatedPercentages[index]}%`,
                backgroundColor: skill.color,
                boxShadow: `0 0 10px ${skill.color}70`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsChart;
