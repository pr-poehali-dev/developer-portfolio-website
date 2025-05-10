import { useEffect, useState, useRef } from "react";
import { Experience } from "@/components/sections/Experience";

interface TimelineProps {
  experiences: Experience[];
}

const Timeline = ({ experiences }: TimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (timelineRef.current) observer.observe(timelineRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={timelineRef} className="flex flex-col md:flex-row gap-4 sm:gap-8">
      {/* Tab buttons */}
      <div className="md:w-1/3 flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 no-scrollbar">
        {experiences.map((exp, index) => (
          <button
            key={exp.id}
            onClick={() => setActiveIndex(index)}
            className={`
              px-3 sm:px-4 py-2 text-left border-b-2 md:border-b-0 md:border-l-2 
              transition-all duration-300 relative overflow-hidden whitespace-nowrap flex-shrink-0 md:flex-shrink
              ${
                index === activeIndex
                  ? "border-accent text-accent font-medium"
                  : "border-border text-muted-foreground hover:bg-accent/5 hover:text-foreground hover:border-accent/50"
              }
            `}
          >
            <span className="relative z-10">{exp.company}</span>
            {index === activeIndex && (
              <span
                className={`
                  absolute inset-0 bg-accent/10
                  ${isVisible ? "animate-in fade-in slide-in-from-left duration-300" : "opacity-0"}
                `}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="md:w-2/3">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className={`
              space-y-3 sm:space-y-4 transition-all duration-500
              ${
                index === activeIndex
                  ? isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                  : "hidden"
              }
            `}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          >
            <div>
              <h3 className="text-lg sm:text-xl font-bold line-clamp-2">
                {exp.title} <span className="text-accent">@ {exp.company}</span>
              </h3>
              <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-1">
                {exp.date}
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground">
              {exp.description}
            </p>

            <ul className="space-y-1 sm:space-y-2">
              {exp.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="flex items-start text-sm sm:text-base"
                  style={{
                    transitionDelay: isVisible ? `${150 + i * 100}ms` : "0ms",
                    animation: isVisible ? "fadeIn 0.5s forwards" : "none",
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <span className="text-accent mr-2 sm:mt-1">▹</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
