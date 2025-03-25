import { crmSolutions, erpSolutions } from '@/lib/data';
import { Check, Shield, BarChart, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

const SolutionsSection = () => {
  const [, setLocation] = useLocation();

  const handleConsultation = () => {
    setLocation('/contact?subject=Custom Solution Consultation');
  };

  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-[#162237] to-[#1e2e4a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Custom Solutions</h2>
          <p className="mt-4 text-xl text-[#D1D5DB] max-w-3xl mx-auto">Tailored IT solutions designed specifically for your industry needs.</p>
          <div className="w-20 h-1 bg-[#FFA94D] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="transition-all duration-500 transform hover:-translate-y-2">
              <img 
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Digital transformation visualization" 
                className="rounded-xl shadow-2xl"
              />
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">CRM Development</h3>
              <p className="text-[#D1D5DB] mb-8">Our custom CRM solutions help you manage customer relationships more effectively, increasing retention and maximizing lifetime value.</p>
              
              <div className="space-y-4">
                {crmSolutions.map((solution) => (
                  <div key={solution.id} className="bg-[#162237]/50 p-4 rounded-lg border border-gray-800 flex items-start group hover:border-[#3B82F6] transition-all duration-300">
                    <div className="bg-[#FFA94D]/20 p-2 rounded-md mr-4 group-hover:bg-[#FFA94D]/40 transition-all duration-300">
                      <Check className="h-6 w-6 text-[#FFA94D]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{solution.title}</h4>
                      <p className="text-[#D1D5DB]">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Custom ERP & Business Automation</h3>
              <p className="text-[#D1D5DB] mb-8">Streamline operations, eliminate redundancies, and gain real-time insights with our tailor-made business automation solutions.</p>
              
              <div className="space-y-4">
                {erpSolutions.map((solution) => (
                  <div key={solution.id} className="bg-[#162237]/50 p-4 rounded-lg border border-gray-800 group hover:border-[#3B82F6] transition-all duration-300">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <span className="bg-[#FFA94D]/20 p-1 rounded-md mr-2 group-hover:bg-[#FFA94D]/40 transition-all duration-300">
                        {solution.icon === 'Shield' && <Shield className="h-5 w-5 text-[#FFA94D]" />}
                        {solution.icon === 'BarChart' && <BarChart className="h-5 w-5 text-[#FFA94D]" />}
                        {solution.icon === 'PieChart' && <PieChart className="h-5 w-5 text-[#FFA94D]" />}
                      </span>
                      {solution.title}
                    </h4>
                    <p className="text-[#D1D5DB] mt-2">{solution.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button 
                  className="bg-gradient-to-r from-[#162237] to-[#3B82F6] hover:from-[#1e2e4a] hover:to-[#60a5fa] text-white px-6 py-3 rounded-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  onClick={handleConsultation}
                >
                  Schedule a Consultation
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 transition-all duration-500 transform hover:-translate-y-2">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Business automation" 
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
