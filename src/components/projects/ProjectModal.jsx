import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Github,
  FileText,
  ExternalLink,
  Play,
} from "lucide-react";

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

const ProjectModal = ({ project, isOpen, onClose, type }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSelectedImage(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === project.screenshots.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? project.screenshots.length - 1 : prev - 1,
    );
  };

  const hasPublicRepo = project.git !== "url" && !project.private;
  const hasDocs = project.docs !== "url";
  const hasDemo = project.deployed && project.demo !== "url";

  const getErrorBanner = () => {
    if (type === "repo") {
      return {
        title: "Private Repository",
        message:
          "Unfortunately, this is a private repository that I cannot provide access to, but below are some screenshots of the project.",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500/30",
        textColor: "text-yellow-300",
      };
    }
    if (type === "demo") {
      return {
        title: "Application Not Deployed",
        message:
          "Unfortunately, this application is no longer deployed, but below are some screenshots of the project.",
        bgColor: "bg-red-500/20",
        borderColor: "border-red-500/30",
        textColor: "text-red-300",
      };
    }
    if (type === "docs") {
      return {
        title: "Documentation Not Available",
        message:
          "Unfortunately, the documentation for this project is not available yet, but below are some screenshots of the project.",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-300",
      };
    }
    return null;
  };

  const errorBanner = getErrorBanner();

  const renderResources = () => {
    if (errorBanner) {
      const showRepo = type !== "repo" && hasPublicRepo;
      const showDocs = type !== "docs" && hasDocs;
      const showDemo = type !== "demo" && hasDemo;
      const hasAny = showRepo || showDocs || showDemo;

      if (!hasAny) return null;

      return (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400 mb-3">
            Other available resources:
          </p>
          <div className="flex flex-wrap gap-3">
            {showRepo && (
              <a
                href={project.git}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-200 hover:scale-105 text-sm"
              >
                <Github className="w-4 h-4" />
                Git
              </a>
            )}
            {showDocs && (
              <a
                href={project.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-200 hover:scale-105 text-sm"
              >
                <FileText className="w-4 h-4" />
                Docs
              </a>
            )}
            {showDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all duration-200 hover:scale-105 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-3">
          Project Resources
        </h4>
        <div className="flex flex-wrap gap-3">
          {hasPublicRepo ? (
            <a
              href={project.git}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-200 hover:scale-105 text-sm"
            >
              <Github className="w-4 h-4" />
              Git
            </a>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-500 rounded-lg border border-gray-700/30 text-sm cursor-not-allowed">
              <Github className="w-4 h-4" />
              {project.private ? "Private Repo" : "No Repository"}
            </span>
          )}
          {hasDocs ? (
            <a
              href={project.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-200 hover:scale-105 text-sm"
            >
              <FileText className="w-4 h-4" />
              Docs
            </a>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-500 rounded-lg border border-gray-700/30 text-sm cursor-not-allowed">
              <FileText className="w-4 h-4" />
              No Documentation
            </span>
          )}
          {hasDemo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all duration-200 hover:scale-105 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-500 rounded-lg border border-gray-700/30 text-sm cursor-not-allowed">
              <ExternalLink className="w-4 h-4" />
              Not Deployed
            </span>
          )}
        </div>
      </div>
    );
  };

  const currentMedia = project.screenshots[selectedImage];
  const mediaUrl = `${import.meta.env.BASE_URL}${currentMedia}`;

  const modalElement = (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 p-6 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.category.map((cat, i) => (
                <span
                  key={i}
                  className={`px-2 py-0.5 text-xs rounded-full border ${getCategoryStyle(cat)}`}
                >
                  {cat}
                </span>
              ))}
              {project.team && (
                <span className="px-2 py-0.5 bg-green-500/30 text-green-300 text-xs rounded-full border border-green-500/30">
                  Team
                </span>
              )}
              {project.private && (
                <span className="px-2 py-0.5 bg-yellow-500/30 text-yellow-300 text-xs rounded-full border border-yellow-500/30">
                  Private
                </span>
              )}
              {!project.deployed && (
                <span className="px-2 py-0.5 bg-red-800/30 text-red-300 text-xs rounded-full border border-red-500/30">
                  Not Deployed
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {errorBanner ? (
            <div
              className={`${errorBanner.bgColor} border ${errorBanner.borderColor} rounded-lg p-4 mb-6`}
            >
              <p
                className={`${errorBanner.textColor} font-medium text-center mb-1`}
              >
                {errorBanner.title}
              </p>
              <p
                className={`${errorBanner.textColor} text-sm text-center opacity-80`}
              >
                {errorBanner.message}
              </p>
              {renderResources()}
            </div>
          ) : (
            renderResources()
          )}

          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Key Features
            </h3>
            <div className="grid gap-2">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              {isVideo(currentMedia) ? "Project Media" : "Project Screenshots"}
            </h3>

            <div className="relative bg-gradient-to-br from-gray-700/20 to-gray-800/30 border border-gray-600/30 rounded-xl overflow-hidden">
              <div className="relative aspect-video bg-gray-900">
                {isVideo(currentMedia) ? (
                  <video
                    key={mediaUrl}
                    src={mediaUrl}
                    className="w-full h-full object-contain bg-black"
                    controls
                    playsInline
                  />
                ) : (
                  <img
                    src={mediaUrl}
                    alt={`${project.title} screenshot ${selectedImage + 1}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzc0MTUxIi8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjIyNSIgcj0iNDAiIGZpbGw9IiM2Mzc0OEUiLz4KPHR4dCB4PSI0MDAiIHk9IjMwMCIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2Ij5TY3JlZW5zaG90IG5vdCBhdmFpbGFibGU8L3R4dD4KPC9zdmc+";
                    }}
                  />
                )}

                {project.screenshots.length > 1 && !isVideo(currentMedia) && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {project.screenshots.length > 1 && isVideo(currentMedia) && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 pointer-events-none">
                <span className="text-white text-sm">
                  {selectedImage + 1} / {project.screenshots.length}
                </span>
              </div>
            </div>

            {project.screenshots.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {project.screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-gray-900 ${
                      selectedImage === index
                        ? "border-blue-500 scale-105"
                        : "border-gray-600/50 hover:border-gray-500"
                    }`}
                  >
                    {isVideo(screenshot) ? (
                      <div className="relative w-full h-full">
                        <video
                          src={`${import.meta.env.BASE_URL}${screenshot}#t=0.1`}
                          className="w-full h-full object-contain"
                          preload="metadata"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Play className="w-5 h-5 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={`${import.meta.env.BASE_URL}${screenshot}`}
                        alt={`${project.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA5NiA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzc0MTUxIi8+CjxjaXJjbGUgY3g9IjQ4IiBjeT0iMzIiIHI9IjEyIiBmaWxsPSIjNjM3NDhFIi8+Cjx0ZXh0IHg9IjQ4IiB5PSI1MCIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjgiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=";
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
};

export default ProjectModal;
