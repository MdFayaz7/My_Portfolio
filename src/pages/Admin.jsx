import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Save, 
  Trash2, 
  Plus, 
  Edit, 
  LogOut, 
  Upload,
  X,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { API_URL, BASE_URL } from "@/lib/config";

export const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [activeTab, setActiveTab] = useState("profile");

  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    description: "",
    aboutDescription: "",
    githubUrl: "",
    cvUrl: "",
    profilePic: null,
  });

  // Skills state
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "frontend",
    icon: null,
  });

  // Projects state
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    tags: "",
    demoUrl: "",
    githubUrl: "",
    image: null,
  });

  // Experience state
  const [experiences, setExperiences] = useState([]);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceForm, setExperienceForm] = useState({
    company: "",
    position: "",
    duration: "",
    description: "",
  });

  // Education state
  const [education, setEducation] = useState([]);
  const [editingEducation, setEditingEducation] = useState(null);
  const [educationForm, setEducationForm] = useState({
    institution: "",
    degree: "",
    duration: "",
    description: "",
  });

  // Login state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [token]);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setIsAuthenticated(true);
        loadData();
      } else {
        handleLogout();
      }
    } catch (error) {
      handleLogout();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("adminToken", data.token);
        setIsAuthenticated(true);
        loadData();
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Login failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  const loadData = async () => {
    try {
      // Load profile
      const profileRes = await fetch(`${API_URL}/profile`);
      const profileData = await profileRes.json();
      setProfile({ ...profileData, profilePic: null });

      // Load skills
      const skillsRes = await fetch(`${API_URL}/skills`);
      const skillsData = await skillsRes.json();
      setSkills(skillsData);

      // Load projects
      const projectsRes = await fetch(`${API_URL}/projects`);
      const projectsData = await projectsRes.json();
      setProjects(projectsData);

      // Load experience
      const experienceRes = await fetch(`${API_URL}/experience`);
      const experienceData = await experienceRes.json();
      setExperiences(experienceData);

      // Load education
      const educationRes = await fetch(`${API_URL}/education`);
      const educationData = await educationRes.json();
      setEducation(educationData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    }
  };

  const saveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("title", profile.title);
      formData.append("description", profile.description);
      formData.append("aboutDescription", profile.aboutDescription);
      formData.append("githubUrl", profile.githubUrl);
      formData.append("cvUrl", profile.cvUrl);
      if (profile.profilePic) {
        formData.append("profilePic", profile.profilePic);
      }

      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        loadData();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const saveSkill = async () => {
    try {
      const url = editingSkill
        ? `${API_URL}/skills/${editingSkill._id}`
        : `${API_URL}/skills`;
      const method = editingSkill ? "PUT" : "POST";

      const formData = new FormData();
      formData.append("name", skillForm.name);
      formData.append("category", skillForm.category);
      if (skillForm.icon) {
        formData.append("icon", skillForm.icon);
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Skill ${editingSkill ? "updated" : "created"} successfully`,
        });
        setSkillForm({ name: "", category: "frontend", icon: null });
        setEditingSkill(null);
        loadData();
      } else {
        throw new Error("Failed to save skill");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteSkill = async (id) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch(`${API_URL}/skills/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Skill deleted successfully",
        });
        loadData();
      } else {
        throw new Error("Failed to delete skill");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const saveProject = async () => {
    try {
      const formData = new FormData();
      formData.append("title", projectForm.title);
      formData.append("description", projectForm.description);
      formData.append("tags", JSON.stringify(projectForm.tags.split(",").map(t => t.trim())));
      formData.append("demoUrl", projectForm.demoUrl);
      formData.append("githubUrl", projectForm.githubUrl);
      if (projectForm.image) {
        formData.append("image", projectForm.image);
      }

      const url = editingProject
        ? `${API_URL}/projects/${editingProject._id}`
        : `${API_URL}/projects`;
      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Project ${editingProject ? "updated" : "created"} successfully`,
        });
        setProjectForm({
          title: "",
          description: "",
          tags: "",
          demoUrl: "",
          githubUrl: "",
          image: null,
        });
        setEditingProject(null);
        loadData();
      } else {
        throw new Error("Failed to save project");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
        loadData();
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const saveExperience = async () => {
    try {
      const url = editingExperience
        ? `${API_URL}/experience/${editingExperience._id}`
        : `${API_URL}/experience`;
      const method = editingExperience ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experienceForm),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Experience ${editingExperience ? "updated" : "created"} successfully`,
        });
        setExperienceForm({ company: "", position: "", duration: "", description: "" });
        setEditingExperience(null);
        loadData();
      } else {
        throw new Error("Failed to save experience");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteExperience = async (id) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      const response = await fetch(`${API_URL}/experience/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast({ title: "Success", description: "Experience deleted successfully" });
        loadData();
      } else {
        throw new Error("Failed to delete experience");
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const saveEducation = async () => {
    try {
      const url = editingEducation
        ? `${API_URL}/education/${editingEducation._id}`
        : `${API_URL}/education`;
      const method = editingEducation ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(educationForm),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Education ${editingEducation ? "updated" : "created"} successfully`,
        });
        setEducationForm({ institution: "", degree: "", duration: "", description: "" });
        setEditingEducation(null);
        loadData();
      } else {
        throw new Error("Failed to save education");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteEducation = async (id) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;
    try {
      const response = await fetch(`${API_URL}/education/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast({ title: "Success", description: "Education deleted successfully" });
        loadData();
      } else {
        throw new Error("Failed to delete education");
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full cosmic-button"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-6 border-b border-border overflow-x-auto">
          {[
            { id: "profile", icon: Save },
            { id: "skills", icon: Plus },
            { id: "projects", icon: Upload },
            { id: "experience", icon: Briefcase },
            { id: "education", icon: GraduationCap },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 capitalize flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <tab.icon size={18} />
              {tab.id}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-card p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">About Description</label>
                <textarea
                  value={profile.aboutDescription}
                  onChange={(e) => setProfile({ ...profile, aboutDescription: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  rows="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={profile.githubUrl}
                  onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CV URL</label>
                <input
                  type="url"
                  value={profile.cvUrl}
                  onChange={(e) => setProfile({ ...profile, cvUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfile({ ...profile, profilePic: e.target.files[0] })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                />
                {profile.profilePic && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {profile.profilePic.name}
                  </p>
                )}
              </div>
              <button onClick={saveProfile} className="cosmic-button flex items-center gap-2">
                <Save size={20} />
                Save Profile
              </button>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="tools">Tools</option>
                    <option value="other">Other</option>
                    <option value="frameworks">Frameworks</option>
                    <option value="libraries">Libraries</option>
                    <option value="programming languages">Programming Languages</option>
                    <option value="databases">Databases</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Skill Icon</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.files[0] })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                  {skillForm.icon && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected: {skillForm.icon.name}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={saveSkill} className="cosmic-button flex items-center gap-2">
                    <Save size={20} />
                    {editingSkill ? "Update" : "Add"} Skill
                  </button>
                  {editingSkill && (
                    <button
                      onClick={() => {
                        setEditingSkill(null);
                        setSkillForm({ name: "", category: "frontend", icon: null });
                      }}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">All Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill._id}
                    className="p-4 border border-border rounded-lg bg-secondary/30 flex items-center gap-4"
                  >
                    {skill.icon && (
                      <img
                        src={`${BASE_URL}${skill.icon}`}
                        alt={skill.name}
                        className="w-12 h-12 object-contain rounded"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{skill.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingSkill(skill);
                              setSkillForm({
                                name: skill.name,
                                category: skill.category,
                                icon: null,
                              });
                            }}
                            className="p-1 hover:bg-secondary rounded"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteSkill(skill._id)}
                            className="p-1 hover:bg-secondary rounded text-destructive"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    placeholder="React, TailwindCSS, Node.js"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Demo URL</label>
                  <input
                    type="url"
                    value={projectForm.demoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files[0] })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                  {projectForm.image && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected: {projectForm.image.name}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={saveProject} className="cosmic-button flex items-center gap-2">
                    <Save size={20} />
                    {editingProject ? "Update" : "Add"} Project
                  </button>
                  {editingProject && (
                    <button
                      onClick={() => {
                        setEditingProject(null);
                        setProjectForm({
                          title: "",
                          description: "",
                          tags: "",
                          demoUrl: "",
                          githubUrl: "",
                          image: null,
                        });
                      }}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">All Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="border border-border rounded-lg overflow-hidden bg-secondary/30"
                  >
                    {project.image && (
                      <img
                        src={`${BASE_URL}${project.image}`}
                        alt={project.title}
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{project.title}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingProject(project);
                              setProjectForm({
                                title: project.title,
                                description: project.description,
                                tags: project.tags.join(", "),
                                demoUrl: project.demoUrl,
                                githubUrl: project.githubUrl,
                                image: null,
                              });
                            }}
                            className="p-1 hover:bg-secondary rounded"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteProject(project._id)}
                            className="p-1 hover:bg-secondary rounded text-destructive"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-secondary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                {editingExperience ? "Edit Experience" : "Add New Experience"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    value={experienceForm.company}
                    onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Position</label>
                  <input
                    type="text"
                    value={experienceForm.position}
                    onChange={(e) => setExperienceForm({ ...experienceForm, position: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    value={experienceForm.duration}
                    onChange={(e) => setExperienceForm({ ...experienceForm, duration: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    placeholder="Jan 2020 - Present"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={experienceForm.description}
                    onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    rows="3"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={saveExperience} className="cosmic-button flex items-center gap-2">
                    <Save size={20} />
                    {editingExperience ? "Update" : "Add"} Experience
                  </button>
                  {editingExperience && (
                    <button
                      onClick={() => {
                        setEditingExperience(null);
                        setExperienceForm({ company: "", position: "", duration: "", description: "" });
                      }}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">All Experiences</h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp._id} className="p-4 border border-border rounded-lg bg-secondary/30 flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.position} at {exp.company}</h3>
                      <p className="text-sm text-muted-foreground">{exp.duration}</p>
                      <p className="text-sm mt-2">{exp.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingExperience(exp);
                          setExperienceForm({
                            company: exp.company,
                            position: exp.position,
                            duration: exp.duration,
                            description: exp.description,
                          });
                        }}
                        className="p-1 hover:bg-secondary rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteExperience(exp._id)}
                        className="p-1 hover:bg-secondary rounded text-destructive"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                {editingEducation ? "Edit Education" : "Add New Education"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Institution</label>
                  <input
                    type="text"
                    value={educationForm.institution}
                    onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Degree</label>
                  <input
                    type="text"
                    value={educationForm.degree}
                    onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    value={educationForm.duration}
                    onChange={(e) => setEducationForm({ ...educationForm, duration: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    placeholder="2016 - 2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description/Grade</label>
                  <textarea
                    value={educationForm.description}
                    onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    rows="3"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={saveEducation} className="cosmic-button flex items-center gap-2">
                    <Save size={20} />
                    {editingEducation ? "Update" : "Add"} Education
                  </button>
                  {editingEducation && (
                    <button
                      onClick={() => {
                        setEditingEducation(null);
                        setEducationForm({ institution: "", degree: "", duration: "", description: "" });
                      }}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">All Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu._id} className="p-4 border border-border rounded-lg bg-secondary/30 flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm font-medium">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.duration}</p>
                      <p className="text-sm mt-2">{edu.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingEducation(edu);
                          setEducationForm({
                            institution: edu.institution,
                            degree: edu.degree,
                            duration: edu.duration,
                            description: edu.description,
                          });
                        }}
                        className="p-1 hover:bg-secondary rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteEducation(edu._id)}
                        className="p-1 hover:bg-secondary rounded text-destructive"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

