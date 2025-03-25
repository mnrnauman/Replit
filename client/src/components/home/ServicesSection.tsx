import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { Service } from '@shared/schema';

const ServicesSection = () => {
  const [, setLocation] = useLocation();

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    staleTime: 60 * 1000, // 1 minute
  });

  const handleGetStarted = (slug: string) => {
    setLocation(`/services/${slug}`);
  };

  const handleRequestDemo = (slug: string) => {
    setLocation(`/contact?service=${slug}`);
  };

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-[#162237]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Services</h2>
            <p className="mt-4 text-xl text-[#D1D5DB] max-w-3xl mx-auto">Comprehensive IT solutions designed to power your business growth and digital transformation.</p>
            <div className="w-20 h-1 bg-[#FFA94D] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-[#1e2e4a] rounded-xl overflow-hidden border border-gray-800 animate-pulse">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-700 rounded mb-6 w-5/6"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-20 bg-[#162237]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Services</h2>
            <p className="mt-4 text-xl text-red-400">Error loading services. Please try again later.</p>
            <div className="w-20 h-1 bg-[#FFA94D] mx-auto mt-4 rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-[#162237]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Services</h2>
          <p className="mt-4 text-xl text-[#D1D5DB] max-w-3xl mx-auto">Comprehensive IT solutions designed to power your business growth and digital transformation.</p>
          <div className="w-20 h-1 bg-[#FFA94D] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <div 
              key={service.id} 
              className="bg-[#1e2e4a] rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-[#D1D5DB] mb-6">{service.description}</p>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => handleGetStarted(service.slug)}
                    className="text-[#FFA94D] hover:text-white font-medium flex items-center transition-colors duration-300"
                  >
                    Get Started
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                  <button 
                    onClick={() => handleRequestDemo(service.slug)}
                    className="text-[#3B82F6] hover:text-white font-medium flex items-center transition-colors duration-300"
                  >
                    Request Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
