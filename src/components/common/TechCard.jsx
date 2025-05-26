const TechCard = ({ tech, icon: Icon }) => (
  <div className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-1">{tech.name}</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${tech.level * 10}%` }}
            />
          </div>
          <span className="text-blue-400 font-medium">{tech.level}/10</span>
        </div>
      </div>
    </div>
    <p className="text-gray-300 text-sm leading-relaxed">{tech.description}</p>
  </div>
);

export default TechCard;