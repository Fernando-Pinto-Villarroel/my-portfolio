import { useState, useRef, useEffect } from "react";
import { Code, Filter, ChevronDown, X } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "./ProjectCard";

const ProjectsSection = ({ projects }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    "Full-Stack",
    "Frontend",
    "Backend",
    "QA",
    "Desktop",
    "Machine Learning",
    "Deep Learning",
    "IoT",
    "Mobile",
    "CLI",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = (cat) => {
    setSelectedFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setIsDropdownOpen(false);
  };

  const filteredProjects =
    selectedFilters.length === 0
      ? projects
      : projects.filter((project) =>
          selectedFilters.some((filter) => {
            if (filter === "Frontend" || filter === "Backend") {
              return (
                project.category.includes(filter) ||
                project.category.includes("Full-Stack")
              );
            }
            return project.category.includes(filter);
          })
        );

  const getDropdownLabel = () => {
    if (selectedFilters.length === 0) return "All Categories";
    if (selectedFilters.length === 1) return selectedFilters[0];
    if (selectedFilters.length === 2) return selectedFilters.join(", ");
    return `${selectedFilters[0]}, ${selectedFilters[1]} +${selectedFilters.length - 2} more`;
  };

  return (
    <section className="py-20 px-6 bg-gray-800/20">
      <div className="container mx-auto">
        <SectionTitle icon={Code}>Featured Projects</SectionTitle>

        <div className="flex items-center gap-4 mb-12 flex-wrap">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Filter className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300 font-medium">Filter by category:</span>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border min-w-[180px] ${
                selectedFilters.length > 0
                  ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500/50 text-white shadow-lg shadow-blue-500/10"
                  : "bg-gray-700/50 border-gray-600/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
              }`}
            >
              <span className="flex-1 text-left truncate">{getDropdownLabel()}</span>
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl shadow-black/40 z-50 min-w-[220px] overflow-hidden">
                <div className="p-2">
                  <button
                    onClick={clearFilters}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedFilters.length === 0
                        ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        selectedFilters.length === 0
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-500"
                      }`}
                    >
                      {selectedFilters.length === 0 && (
                        <div className="w-2 h-2 bg-white rounded-sm" />
                      )}
                    </div>
                    All Categories
                  </button>

                  <div className="h-px bg-gray-700/50 my-2" />

                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleFilter(cat)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedFilters.includes(cat)
                          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white"
                          : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          selectedFilters.includes(cat)
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-500"
                        }`}
                      >
                        {selectedFilters.includes(cat) && (
                          <div className="w-2 h-2 bg-white rounded-sm" />
                        )}
                      </div>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {selectedFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white rounded-lg text-sm transition-all duration-200"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}

          <span className="text-gray-500 text-sm">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="opacity-0"
              style={{
                animation: "fadeIn 0.6s ease-out forwards",
                animationDelay: `${index * 0.1}s`,
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
