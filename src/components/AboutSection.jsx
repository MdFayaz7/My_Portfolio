import { useState, useEffect } from "react";
import { Briefcase, Code, User } from "lucide-react";

import { API_URL } from "@/lib/config";

export const AboutSection = () => {
  const [profile, setProfile] = useState({
    aboutDescription: "With over 5 years of experience in web development, I specialize in creating responsive, accessible, and performant web applications using modern technologies. I'm passionate about creating elegant solutions to complex problems, and I'm constantly learning new technologies and techniques to stay at the forefront of the ever-evolving web landscape.",
    cvUrl: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/profile`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProfile(data);
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Passionate AI/ML Engineer & Tech Creator
            </h3>

            <p className="text-muted-foreground whitespace-pre-line">
              {profile.aboutDescription || "With over 5 years of experience in web development, I specialize in creating responsive, accessible, and performant web applications using modern technologies."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              {profile.cvUrl && (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                >
                  Download CV
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> AI Developer </h4>
                  <p className="text-muted-foreground">
                    Building applications using LLMs (RAG, embeddings, prompt engineering) with APIs like OpenAI/OpenRouter.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Machine Learning Developer </h4>
                  <p className="text-muted-foreground">
                    Developing predictive and neural network models using Scikit-learn, TensorFlow, and keras .
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Full Stack Developer </h4>
                  <p className="text-muted-foreground">
                    Developing RESTful APIs, handling backend logic with Python (Django/Flask) and Node.js, and integrating databases efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
