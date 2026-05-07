import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";

import { API_URL } from "@/lib/config";

export const EducationSection = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/education`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEducation(data);
        }
      })
      .catch((err) => console.error("Error fetching education:", err));
  }, []);

  if (education.length === 0) return null;

  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Educational <span className="text-primary">Background</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          My academic qualifications and educational achievements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu) => (
            <div
              key={edu._id}
              className="group bg-card p-6 rounded-lg shadow-xs card-hover border-t-4 border-primary/50"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.institution}</p>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {edu.duration}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
