import { useState } from "react";
import { Github, Star, ExternalLink, FileText } from "lucide-react";
import ProjectModal from "./ProjectModal";

const isVideo = (src) => /\.(mp4|webm|ogg|mov|avi)$/i.test(src || "");

const getCategoryStyle = (category) => {
  const styles = {
    "Full-Stack": "bg-blue-600/50 text-blue-100 border-blue-500/40",
    Frontend: "bg-violet-600/50 text-violet-100 border-violet-500/40",
    Backend: "bg-cyan-700/50 text-cyan-100 border-cyan-500/40",
    QA: "bg-orange-600/50 text-orange-100 border-orange-500/40",
    Desktop: "bg-indigo-600/50 text-indigo-100 border-indigo-500/40",
    "Machine Learning": "bg-pink-600/50 text-pink-100 border-pink-500/40",
    "Deep Learning": "bg-fuchsia-700/50 text-fuchsia-100 border-fuchsia-500/40",
    IoT: "bg-teal-600/50 text-teal-100 border-teal-500/40",
    CLI: "bg-slate-500/50 text-slate-100 border-slate-400/40",
    Mobile: "bg-sky-600/50 text-sky-100 border-sky-500/40",
  };
  return (
    styles[category] ?? "bg-purple-700/50 text-purple-100 border-purple-500/30"
  );
};

const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleDemoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!project.deployed) {
      openModal("demo");
    } else {
      window.open(project.demo, "_blank");
    }
  };

  const handleRepoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.private) {
      openModal("repo");
    } else {
      window.open(project.git, "_blank");
    }
  };

  const handleDocsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.docs === "url") {
      openModal("docs");
    } else {
      window.open(project.docs, "_blank");
    }
  };

  return (
    <>
      <div
        onClick={() => openModal("info")}
        className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 h-[600px] flex flex-col cursor-pointer"
      >
        <div className="relative h-48 bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
          <div className="absolute top-4 right-4 z-20 flex gap-2 flex-wrap">
            {project.category.map((category, index) => (
              <span
                key={index}
                className={`px-3 py-1 backdrop-blur-sm text-xs rounded-full border ${getCategoryStyle(category)}`}
              >
                {category}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center h-full">
            {isVideo(project.image) ? (
              <video
                src={`${import.meta.env.BASE_URL}${project.image}`}
                className="object-contain w-full h-full"
                muted
                autoPlay
                loop
                playsInline
              />
            ) : (
              <img
                src={`${import.meta.env.BASE_URL}${project.image}`}
                alt={project.title}
                className="object-contain w-full h-full"
              />
            )}
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3 flex-shrink-0 min-h-[74px] max-h-[74px] overflow-hidden">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0 min-h-[65px] max-h-[65px] overflow-hidden">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50 h-fit"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="space-y-2 mb-6 flex-1 min-h-[72px] max-h-[72px] overflow-hidden">
            {project.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Star className="w-3 h-3 text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm line-clamp-1 leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div
            className="flex gap-2 mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleRepoClick}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-200 hover:scale-105 flex-1"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">Git Repo</span>
            </button>
            <button
              onClick={handleDocsClick}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-200 hover:scale-105 flex-1"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm">Docs</span>
            </button>
            <button
              onClick={handleDemoClick}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all duration-200 hover:scale-105 flex-1"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Demo</span>
            </button>
          </div>
        </div>
      </div>

      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </>
  );
};

export default ProjectCard;
