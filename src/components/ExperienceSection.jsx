import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";

import { API_URL } from "@/lib/config";

export const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/experience`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExperiences(data);
        }
      })
      .catch((err) => console.error("Error fetching experience:", err));
  }, []);

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Professional <span className="text-primary">Experience</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          My professional journey and the roles I&apos;ve undertaken in the industry.
        </p>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="relative pl-8 pb-8 border-l-2 border-primary/30 last:border-0 last:pb-0"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
              <div className="bg-card p-6 rounded-lg shadow-xs card-hover">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Briefcase size={20} className="text-primary" />
                      {exp.position}
                    </h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium w-fit">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-muted-foreground whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
