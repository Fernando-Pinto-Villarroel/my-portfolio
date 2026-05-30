import { useState, useRef, useEffect, useMemo } from "react";
import {
  Code,
  Filter,
  ChevronDown,
  X,
  GraduationCap,
  Users,
  User,
  Lightbulb,
} from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "./ProjectCard";

const CATEGORIES = [
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

const Checkbox = ({ checked }) => (
  <div
    className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
      checked ? "bg-blue-500 border-blue-500" : "border-gray-500"
    }`}
  >
    {checked && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
  </div>
);

const ProjectsSection = ({ projects }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [techSearch, setTechSearch] = useState("");
  const filterRef = useRef(null);

  const allTechnologies = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [projects]);

  const filteredTechs = useMemo(
    () =>
      techSearch
        ? allTechnologies.filter((t) =>
            t.toLowerCase().includes(techSearch.toLowerCase()),
          )
        : allTechnologies,
    [allTechnologies, techSearch],
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target))
        setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (cat) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  const toggleType = (type) =>
    setSelectedType((prev) => (prev === type ? null : type));
  const toggleCollab = (collab) =>
    setSelectedCollab((prev) => (prev === collab ? null : collab));
  const toggleTech = (tech) =>
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedType(null);
    setSelectedCollab(null);
    setSelectedTechs([]);
    setOpenDropdown(null);
    setTechSearch("");
  };

  const activeFilterCount =
    selectedCategories.length +
    (selectedType ? 1 : 0) +
    (selectedCollab ? 1 : 0) +
    selectedTechs.length;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (selectedCategories.length > 0) {
        const match = selectedCategories.some((cat) => {
          if (cat === "Frontend" || cat === "Backend")
            return (
              project.category.includes(cat) ||
              project.category.includes("Full-Stack")
            );
          return project.category.includes(cat);
        });
        if (!match) return false;
      }
      if (selectedType) {
        const match =
          selectedType === "Academic"
            ? project.academic === true
            : !project.academic;
        if (!match) return false;
      }
      if (selectedCollab) {
        const match =
          selectedCollab === "Team"
            ? project.team === true
            : project.team !== true;
        if (!match) return false;
      }
      if (selectedTechs.length > 0) {
        const match = selectedTechs.some((tech) =>
          project.technologies.includes(tech),
        );
        if (!match) return false;
      }
      return true;
    });
  }, [
    projects,
    selectedCategories,
    selectedType,
    selectedCollab,
    selectedTechs,
  ]);

  const getCategoryLabel = () => {
    if (selectedCategories.length === 0) return "Category";
    if (selectedCategories.length === 1) return selectedCategories[0];
    return `${selectedCategories[0]} +${selectedCategories.length - 1}`;
  };

  const getTechLabel = () => {
    if (selectedTechs.length === 0) return "Technology";
    if (selectedTechs.length === 1) return selectedTechs[0];
    return `${selectedTechs[0]} +${selectedTechs.length - 1}`;
  };

  const dropdownBtnCls = (active) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 whitespace-nowrap ${
      active
        ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500/50 text-white shadow-sm shadow-blue-500/10"
        : "bg-gray-700/40 border-gray-600/40 text-gray-300 hover:bg-gray-600/30 hover:text-white hover:border-gray-500/50"
    }`;

  const pillCls = (active) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer whitespace-nowrap ${
      active
        ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500/50 text-white shadow-sm shadow-blue-500/10"
        : "bg-gray-700/40 border-gray-600/40 text-gray-400 hover:text-gray-200 hover:border-gray-500/50 hover:bg-gray-600/30"
    }`;

  const dropdownItemCls = (active) =>
    `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white"
        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
    }`;

  const Divider = () => (
    <div className="h-5 w-px bg-gray-700/50 flex-shrink-0 hidden sm:block" />
  );

  return (
    <section className="py-20 px-6 bg-gray-800/20">
      <div className="container mx-auto">
        <SectionTitle icon={Code}>Featured Projects</SectionTitle>

        <div
          ref={filterRef}
          className="mb-10 p-4 bg-gray-800/40 border border-gray-700/40 rounded-2xl"
        >
          {/* On mobile: flex-col (stacked rows). On desktop: flex-row flex-wrap (single line). */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5">
            {/* Row 1 (mobile): label left + count/clear right. Desktop: label only (sm:contents makes wrapper transparent). */}
            <div className="flex items-center sm:contents">
              <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Filters
                </span>
              </div>
              <div className="ml-auto flex items-center gap-2 sm:hidden">
                <span
                  className={`text-sm font-semibold tabular-nums ${
                    filteredProjects.length === 0
                      ? "text-gray-500"
                      : "text-gray-200"
                  }`}
                >
                  {filteredProjects.length}{" "}
                  <span className="font-normal text-gray-500">
                    project{filteredProjects.length !== 1 ? "s" : ""}
                  </span>
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white rounded-lg text-xs transition-all duration-200 border border-gray-600/30 hover:border-gray-500/40"
                  >
                    <X className="w-3 h-3" />
                    Clear
                    {activeFilterCount > 1 ? ` (${activeFilterCount})` : ""}
                  </button>
                )}
              </div>
            </div>

            <Divider />

            {/* Row 2 (mobile): two dropdowns side-by-side, each filling half the row. Desktop: sm:contents makes wrapper transparent, dropdowns flow inline. */}
            <div className="flex gap-2 sm:contents">
              {/* Category dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "category" ? null : "category",
                    )
                  }
                  className={
                    dropdownBtnCls(selectedCategories.length > 0) +
                    " w-full sm:w-auto justify-between sm:justify-start"
                  }
                >
                  <span>{getCategoryLabel()}</span>
                  <ChevronDown
                    className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${
                      openDropdown === "category" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "category" && (
                  <div className="absolute top-full left-0 mt-1.5 bg-gray-800 border border-gray-700/50 rounded-xl shadow-xl shadow-black/40 z-50 w-full sm:min-w-[180px] overflow-hidden">
                    <div className="p-2 space-y-0.5">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={dropdownItemCls(
                            selectedCategories.includes(cat),
                          )}
                        >
                          <Checkbox
                            checked={selectedCategories.includes(cat)}
                          />
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Technology dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <button
                  onClick={() => {
                    setOpenDropdown(openDropdown === "tech" ? null : "tech");
                    setTechSearch("");
                  }}
                  className={
                    dropdownBtnCls(selectedTechs.length > 0) +
                    " w-full sm:w-auto justify-between sm:justify-start"
                  }
                >
                  <span>{getTechLabel()}</span>
                  <ChevronDown
                    className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${
                      openDropdown === "tech" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "tech" && (
                  <div className="absolute top-full left-0 mt-1.5 bg-gray-800 border border-gray-700/50 rounded-xl shadow-xl shadow-black/40 z-50 w-full sm:w-56 overflow-hidden">
                    <div className="p-2">
                      <input
                        type="text"
                        value={techSearch}
                        onChange={(e) => setTechSearch(e.target.value)}
                        placeholder="Search technologies..."
                        autoFocus
                        className="w-full px-3 py-1.5 mb-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-blue-500/50 transition-colors"
                      />
                      <div className="max-h-52 overflow-y-auto space-y-0.5">
                        {filteredTechs.length === 0 ? (
                          <p className="text-gray-500 text-xs px-3 py-2 text-center">
                            No results. Fernando will learn this technology
                            soon.
                          </p>
                        ) : (
                          filteredTechs.map((tech) => (
                            <button
                              key={tech}
                              onClick={() => toggleTech(tech)}
                              className={dropdownItemCls(
                                selectedTechs.includes(tech),
                              )}
                            >
                              <Checkbox
                                checked={selectedTechs.includes(tech)}
                              />
                              {tech}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Divider />

            {/* Row 3 (mobile): Type pills. Desktop: inline. */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs flex-shrink-0">Type</span>
              <button
                onClick={() => toggleType("Academic")}
                className={pillCls(selectedType === "Academic")}
              >
                <GraduationCap className="w-3 h-3" />
                Academic
              </button>
              <button
                onClick={() => toggleType("Personal")}
                className={pillCls(selectedType === "Personal")}
              >
                <Lightbulb className="w-3 h-3" />
                Personal
              </button>
            </div>

            <Divider />

            {/* Row 4 (mobile): Collab pills. Desktop: inline. */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs flex-shrink-0">
                Collab
              </span>
              <button
                onClick={() => toggleCollab("Team")}
                className={pillCls(selectedCollab === "Team")}
              >
                <Users className="w-3 h-3" />
                Team
              </button>
              <button
                onClick={() => toggleCollab("Solo")}
                className={pillCls(selectedCollab === "Solo")}
              >
                <User className="w-3 h-3" />
                Solo
              </button>
            </div>

            {/* Count + Clear — desktop only, pushed right */}
            <div className="hidden sm:flex items-center gap-2.5 ml-auto">
              <span
                className={`text-sm font-semibold tabular-nums ${
                  filteredProjects.length === 0
                    ? "text-gray-500"
                    : "text-gray-200"
                }`}
              >
                {filteredProjects.length}{" "}
                <span className="font-normal text-gray-500">
                  project{filteredProjects.length !== 1 ? "s" : ""}
                </span>
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white rounded-lg text-xs transition-all duration-200 border border-gray-600/30 hover:border-gray-500/40"
                >
                  <X className="w-3 h-3" />
                  Clear{activeFilterCount > 1 ? ` (${activeFilterCount})` : ""}
                </button>
              )}
            </div>
          </div>

          {/* Active tech chips */}
          {selectedTechs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-700/30">
              {selectedTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className="flex items-center gap-1 px-2 py-0.5 bg-blue-600/15 border border-blue-500/25 text-blue-300/80 rounded-full text-xs hover:bg-blue-600/25 hover:text-blue-200 transition-colors"
                >
                  {tech}
                  <X className="w-2.5 h-2.5" />
                </button>
              ))}
            </div>
          )}
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
              Fernando did not work on a project matching these filters yet.
              <br />
              Try again in some months or adjust your filters.
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
