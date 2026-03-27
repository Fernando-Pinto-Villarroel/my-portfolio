import { User } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

const AboutSection = ({ personal }) => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle icon={User}>About Me</SectionTitle>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center lg:items-start">
            <div className="flex-shrink-0">
              <div className="w-36 h-36 sm:w-48 sm:h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-2 border-gray-600/50 rounded-2xl flex items-center justify-center hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}${personal.photo}`}
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                {personal.bio}
              </p>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                  {personal.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm sm:text-base"
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
