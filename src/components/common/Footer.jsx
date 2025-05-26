import { Mail, Github, Linkedin } from "lucide-react";

const Footer = ({ personal }) => {
  return (
    <footer className="py-12 px-6 bg-gray-800/30 border-t border-gray-700/50">
      <div className="container mx-auto text-center">
        <div className="flex justify-center gap-6 mb-6">
          <a
            href={`mailto:${personal.email}`}
            className="p-3 bg-gray-700/50 hover:bg-blue-600/50 rounded-full transition-all duration-300 hover:scale-110"
          >
            <Mail className="w-6 h-6 text-blue-400" />
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-700/50 hover:bg-blue-600/50 rounded-full transition-all duration-300 hover:scale-110"
          >
            <Github className="w-6 h-6 text-blue-400" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-700/50 hover:bg-blue-600/50 rounded-full transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="w-6 h-6 text-blue-400" />
          </a>
        </div>
        <p className="text-gray-400">©2025 - {personal.name}</p>
      </div>
    </footer>
  );
};

export default Footer;
