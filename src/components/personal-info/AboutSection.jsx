import { Rocket, User } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';

const AboutSection = ({ personal }) => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle icon={Rocket}>About Me</SectionTitle>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-2 border-gray-600/50 rounded-2xl flex items-center justify-center hover:border-blue-500/50 transition-all duration-300">
                <div className="text-center">
                    <img
                      src={personal.photo}
                      alt="Foto de perfil"
                      className="w-40 h-40 object-cover"
                    />
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">{personal.bio}</p>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {personal.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-300"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;