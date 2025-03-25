import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { Service } from '@shared/schema';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

const Services = () => {
  const [, setLocation] = useLocation();

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    staleTime: 60 * 1000, // 1 minute
  });

  const handleLearnMore = (slug: string) => {
    setLocation(`/services/${slug}`);
  };

  const handleContact = () => {
    setLocation('/contact');
  };

  if (isLoading) {
    return (
      <div className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white">Our Services</h1>
          <p className="mt-4 text-xl text-[#D1D5DB]">Loading services...</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-64 bg-[#1e2e4a] rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Our Services</h1>
          <p className="mt-4 text-xl text-red-400">Error loading services. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Services | GENCORE IT</title>
        <meta name="description" content="Explore GENCORE IT's comprehensive range of services including web development, cloud solutions, VoIP, SEO, and IT support." />
      </Helmet>
      
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="bg-[#1e2e4a] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
              <p className="text-xl text-[#D1D5DB] max-w-3xl mx-auto">
                Comprehensive IT solutions designed to power your business growth and digital transformation.
              </p>
            </div>
          </div>
        </div>
        
        {/* Services List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services?.map((service) => (
              <div key={service.id} id={service.slug} className="bg-[#1e2e4a] rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:shadow-xl hover:border-[#3B82F6]">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">{service.title}</h2>
                  <p className="text-[#D1D5DB] mb-6">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <Button 
                      className="text-[#FFA94D] hover:text-white bg-transparent hover:bg-[#FFA94D]/20 flex items-center space-x-2 transition-colors duration-300"
                      onClick={() => handleLearnMore(service.slug)}
                      variant="ghost"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h3>
            <p className="text-[#D1D5DB] mb-8 max-w-2xl mx-auto">
              Our team can develop tailored IT solutions to address your specific business challenges.
            </p>
            <Button 
              className="bg-gradient-to-r from-[#162237] to-[#3B82F6] hover:from-[#1e2e4a] hover:to-[#60a5fa] text-white px-8 py-6 rounded-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              onClick={handleContact}
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
