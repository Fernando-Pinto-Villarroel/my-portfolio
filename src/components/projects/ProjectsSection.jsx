import { useState } from "react";
import { Code, Filter } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "./ProjectCard";

const ProjectsSection = ({ projects }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const categories = [
    "All",
    "Full-Stack",
    "AI/ML",
    "Frontend",
    "Backend",
    "QA",
    "Desktop",
  ];

  const filteredProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter((project) => {
          if (selectedFilter === "Full-Stack") {
            return project.category.includes("Full-Stack");
          }
          if (selectedFilter === "Frontend" || selectedFilter === "Backend") {
            return (
              project.category.includes(selectedFilter) ||
              project.category.includes("Full-Stack")
            );
          }
          return project.category.includes(selectedFilter);
        });

  return (
    <section className="py-20 px-6 bg-gray-800/20">
      <div className="container mx-auto">
        <SectionTitle icon={Code}>Featured Projects</SectionTitle>

        <div className="flex items-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300 font-medium">
              Filter by category:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="opacity-0 animate-fade-in"
              style={{
                animation: "fadeIn 0.6s ease-out forwards",
                animationDelay: `${filteredProjects.indexOf(project) * 0.1}s`,
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No projects found</div>
            <div className="text-gray-500 text-sm">
              Try selecting a different category
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
