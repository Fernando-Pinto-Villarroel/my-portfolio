import { Globe, Code, Server, Database, Rocket, Zap } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import TechCard from "../common/TechCard";

const SkillsSection = ({ technologies }) => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <SectionTitle icon={Zap}>Technical Skills</SectionTitle>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Code className="w-6 h-6 text-red-400" />
              Programming Languages
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.languages.map((tech, index) => (
                <TechCard key={index} tech={tech} icon={Globe} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-400" />
              Frontend Technologies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.frontend.map((tech, index) => (
                <TechCard key={index} tech={tech} icon={Globe} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 text-green-400" />
              Backend Technologies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.backend.map((tech, index) => (
                <TechCard key={index} tech={tech} icon={Server} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 text-purple-400" />
              Databases
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.databases.map((tech, index) => (
                <TechCard key={index} tech={tech} icon={Database} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Rocket className="w-6 h-6 text-orange-400" />
              DevOps & Tools
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.devops.map((tech, index) => (
                <TechCard key={index} tech={tech} icon={Rocket} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
