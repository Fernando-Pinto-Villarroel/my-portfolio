const GradientText = ({ children, className = "" }) => (
  <span className={`bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

export default GradientText;