import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { companyPartners } from '@/lib/data';
import HeroCanvas from '@/components/3d/HeroCanvas';
import { scrollToSection } from '@/lib/utils';
import { useLocation } from 'wouter';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleConsultation = () => {
    setLocation('/contact');
  };

  const handleExploreServices = () => {
    setLocation('/services');
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen pt-24 overflow-hidden bg-[#162237]"
      style={{
        backgroundImage: "radial-gradient(rgba(22, 34, 55, 0.8) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}
    >
      {/* 3D Animation Container */}
      <div className="absolute inset-0 z-0 opacity-50">
        <HeroCanvas />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
              Next Generation
              <span className="text-[#FFA94D] block md:inline"> Core IT Solutions</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#D1D5DB] animate-fade-in-delayed">
              Empowering businesses with cutting-edge technology solutions tailored to meet your unique challenges. From cloud infrastructure to custom app development, we're your complete IT partner.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start animate-fade-in-delayed">
              <Button 
                className="bg-gradient-to-r from-[#162237] to-[#3B82F6] hover:from-[#1e2e4a] hover:to-[#60a5fa] text-white px-8 py-6 rounded-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                onClick={handleConsultation}
              >
                Get a Free Consultation
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-[#3B82F6] bg-transparent hover:bg-[#3B82F6]/10 text-white px-8 py-6 rounded-md transition-all duration-300"
                onClick={handleExploreServices}
              >
                Explore Services
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block relative animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=600" 
              alt="Modern IT infrastructure and network solutions" 
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#1e2e4a] p-4 rounded-lg shadow-lg animate-fade-in-delayed">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">24/7 IT Support Available</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Partners */}
        <div className="mt-20 animate-fade-in-delayed">
          <p className="text-center text-[#D1D5DB] mb-6">Trusted by innovative companies worldwide</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-70">
            {companyPartners.map((company, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 rounded-md h-12 flex items-center justify-center">
                  <span className="text-white opacity-50 font-bold">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
