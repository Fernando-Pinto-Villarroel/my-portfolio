import GradientText from './GradientText';

const SectionTitle = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-12">
    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg">
      <Icon className="w-8 h-8 text-blue-400" />
    </div>
    <h2 className="text-4xl font-bold">
      <GradientText>{children}</GradientText>
    </h2>
  </div>
);

export default SectionTitle;