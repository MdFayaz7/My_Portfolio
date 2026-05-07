import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

import { API_URL } from "@/lib/config";

export const HeroSection = () => {
  const [profile, setProfile] = useState({
    name: "Pedro Machado",
    title: "Web Developer",
    description: "I create stellar web experiences with modern technologies.",
    profilePic: "",
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

  const profilePicUrl = profile.profilePic
    ? `${API_URL.replace("/api", "")}${profile.profilePic}`
    : "/profile-pic.jpg";

  const nameParts = profile.name.split(" ");
  const firstName = nameParts[0] || "Pedro";
  const lastName = nameParts.slice(1).join(" ") || "Machado";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex justify-center mb-8 opacity-0 animate-fade-in">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                <img
                  src={profilePicUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200?text=Profile";
                  }}
                />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              {firstName}
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              {lastName}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            {profile.description}
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
