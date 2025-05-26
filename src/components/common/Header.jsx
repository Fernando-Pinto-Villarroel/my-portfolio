import { Mail, Github, Linkedin, MapPin, Sparkles } from 'lucide-react';
import GradientText from './GradientText';

const Header = ({ personal }) => {
  return (
    <header className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <GradientText>{personal.name}</GradientText>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-2">{personal.title}</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">{personal.subtitle}</p>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <Mail className="w-5 h-5 text-blue-400" />
            <span>Contact</span>
          </a>
          <a
            href={personal.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <Github className="w-5 h-5 text-blue-400" />
            <span>GitLab</span>
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <Linkedin className="w-5 h-5 text-blue-400" />
            <span>LinkedIn</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{personal.location}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;