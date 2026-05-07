import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { API_URL, BASE_URL } from "@/lib/config";

const categories = ["all", "frontend", "backend", "tools", "other", "frameworks", "libraries", "programming languages", "databases"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/skills`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSkills(data);
        }
      })
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover flex items-center gap-4"
            >
              {skill.icon && (
                <img
                  src={`${BASE_URL}${skill.icon}`}
                  alt={skill.name}
                  className="w-12 h-12 object-contain rounded"
                />
              )}
              <div className="text-left">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
