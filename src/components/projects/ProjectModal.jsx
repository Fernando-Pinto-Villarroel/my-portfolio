import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectModal = ({ project, isOpen, onClose, type }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getModalContent = () => {
    if (type === "repo") {
      return {
        title: "Private University Repository",
        message:
          "Unfortunately, this is a private university repository that I cannot provide access to, but here are some screenshots of the project.",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500/30",
        textColor: "text-yellow-300",
      };
    } else if (type === "demo") {
      return {
        title: "Application Not Deployed",
        message:
          "Unfortunately, this application is no longer deployed, but here are some screenshots of the project.",
        bgColor: "bg-red-500/20",
        borderColor: "border-red-500/30",
        textColor: "text-red-300",
      };
    } else if (type === "docs") {
      return {
        title: "Documentation Not Available",
        message:
          "Unfortunately, the documentation for this project is not available yet, but here are some screenshots of the project.",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-300",
      };
    }
    return {
      title: "Project Information",
      message: "Here are some details about this project.",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-300",
    };
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  const modalContent = getModalContent();

  const modalElement = (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <p className="text-gray-400 mt-1">{modalContent.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <div className="mb-6">
            <div
              className={`${modalContent.bgColor} border ${modalContent.borderColor} rounded-lg p-4 mb-6`}
            >
              <p className={`${modalContent.textColor} text-center`}>
                {modalContent.message}
              </p>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-300"
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
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Project Screenshots
            </h3>

            <div className="relative bg-gradient-to-br from-gray-700/20 to-gray-800/30 border border-gray-600/30 rounded-xl overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={`${import.meta.env.BASE_URL}${
                    project.screenshots[selectedImage]
                  }`}
                  alt={`${project.title} screenshot ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzc0MTUxIi8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjIyNSIgcj0iNDAiIGZpbGw9IiM2Mzc0OEUiLz4KPHR4dCB4PSI0MDAiIHk9IjMwMCIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2Ij5TY3JlZW5zaG90IG5vdCBhdmFpbGFibGU8L3R4dD4KPC9zdmc+";
                  }}
                />

                {project.screenshots.length > 1 && (
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
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
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
                    className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-blue-500 scale-105"
                        : "border-gray-600/50 hover:border-gray-500"
                    }`}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${screenshot}`}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA5NiA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzc0MTUxIi8+CjxjaXJjbGUgY3g9IjQ4IiBjeT0iMzIiIHI9IjEyIiBmaWxsPSIjNjM3NDhFIi8+Cjx0ZXh0IHg9IjQ4IiB5PSI1MCIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjgiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=";
                      }}
                    />
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
