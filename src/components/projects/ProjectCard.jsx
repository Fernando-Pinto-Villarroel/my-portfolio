import { useState } from "react";
import { Github, Star, ExternalLink, Code, Users } from "lucide-react";
import ProjectModal from "./ProjectModal";

const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleDemoClick = (e) => {
    e.preventDefault();
    if (!project.deployed) {
      setModalType("demo");
      setIsModalOpen(true);
    } else {
      window.open(project.demo, "_blank");
    }
  };

  const handleRepoClick = (e) => {
    e.preventDefault();
    if (project.private) {
      setModalType("repo");
      setIsModalOpen(true);
    } else {
      window.open(project.gitlab, "_blank");
    }
  };

  return (
    <>
      <div className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 h-[600px] flex flex-col">
        <div className="relative h-48 bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
          <div className="absolute top-4 right-4 z-20 flex gap-2 flex-wrap">
            {project.category.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-700/50 backdrop-blur-sm text-purple-100 text-xs rounded-full border border-blue-500/30"
              >
                {category}
              </span>
            ))}
            {project.team && (
              <span className="px-3 py-1 bg-green-500/50 backdrop-blur-sm text-green-100 text-xs rounded-full border border-green-500/30 flex items-center gap-1">
                Team
              </span>
            )}
            {project.private && (
              <span className="px-3 py-1 bg-yellow-500/50 backdrop-blur-sm text-yellow-100 text-xs rounded-full border border-yellow-500/30">
                Private
              </span>
            )}
            {!project.deployed && (
              <span className="px-3 py-1 bg-red-800/50 backdrop-blur-sm text-red-100 text-xs rounded-full border border-red-500/30">
                Not Deployed
              </span>
            )}
          </div>
          <div className="flex items-center justify-center h-full">
            <img
              src={`${import.meta.env.BASE_URL}${project.image}`}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3 flex-shrink-0">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="space-y-2 mb-6 flex-1">
            {project.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Star className="w-3 h-3 text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm line-clamp-2">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-auto">
            <button
              onClick={handleRepoClick}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitLab</span>
            </button>
            <button
              onClick={handleDemoClick}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all duration-200 hover:scale-105"
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
