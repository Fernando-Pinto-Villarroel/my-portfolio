import {
  Mail,
  Github,
  GitBranch,
  Linkedin,
  MapPin,
  Rocket,
} from "lucide-react";
import GradientText from "./GradientText";

const Header = ({ personal }) => {
  return (
    <header className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 py-16">
        <div className="mb-8">
          <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-purple-700 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
            <GradientText>{personal.name}</GradientText>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-2">
            {personal.title}
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8 px-2">
            {personal.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 w-fit mx-auto">
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-blue-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span>Contact</span>
          </a>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-blue-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span>GitHub</span>
          </a>

          <a
            href={personal.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-blue-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span>GitLab</span>
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-blue-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span>LinkedIn</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm sm:text-base">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>{personal.location}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
