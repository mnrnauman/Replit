// Pure CSS Animation component instead of Three.js
// This avoids WebGL issues in the Replit environment

const HeroCanvas = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Main glowing orb */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 animate-pulse-slow opacity-80 blur-sm"></div>
      
      {/* Inner core */}
      <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 animate-pulse-slow opacity-90"></div>
      
      {/* Outer glow */}
      <div className="absolute w-80 h-80 rounded-full bg-blue-500/20 animate-pulse-slow"></div>
      
      {/* Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-orange-400 animate-ping"></div>
      <div className="absolute top-3/4 left-1/3 w-1 h-1 rounded-full bg-orange-400 animate-ping animation-delay-700"></div>
      <div className="absolute top-1/2 left-2/3 w-2 h-2 rounded-full bg-orange-400 animate-ping animation-delay-1000"></div>
      <div className="absolute top-1/3 left-1/2 w-1 h-1 rounded-full bg-orange-400 animate-ping animation-delay-1500"></div>
      <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping animation-delay-2000"></div>
      
      {/* Orbit rings */}
      <div className="absolute w-96 h-96 rounded-full border border-blue-500/20 animate-spin-slow"></div>
      <div className="absolute w-[26rem] h-[26rem] rounded-full border border-indigo-500/10 animate-spin-slower"></div>
    </div>
  );
};

export default HeroCanvas;
