import portfolioData from '../data/portfolio.json';
import StarField from '../components/common/StarField';
import Header from '../components/common/Header';
import AboutSection from '../components/personal-info/AboutSection';
import ProjectsSection from '../components/projects/ProjectsSection';
import SkillsSection from '../components/personal-info/SkillsSection';
import Footer from '../components/common/Footer';

const App = () => {
  const { personal, projects, technologies } = portfolioData;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
      <StarField />
      
      <div className="relative z-10">
        <Header personal={personal} />
        <AboutSection personal={personal} />
        <ProjectsSection projects={projects} />
        <SkillsSection technologies={technologies} />
        <Footer personal={personal} />
      </div>
    </div>
  );
};

export default App;