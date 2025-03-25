import { companyStrengths } from '@/lib/data';
import { Lightbulb, Clock, BarChart2, DollarSign } from 'lucide-react';

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Lightbulb':
      return <Lightbulb className="h-8 w-8 text-[#FFA94D]" />;
    case 'Clock':
      return <Clock className="h-8 w-8 text-[#FFA94D]" />;
    case 'BarChart2':
      return <BarChart2 className="h-8 w-8 text-[#FFA94D]" />;
    case 'DollarSign':
      return <DollarSign className="h-8 w-8 text-[#FFA94D]" />;
    default:
      return <Lightbulb className="h-8 w-8 text-[#FFA94D]" />;
  }
};

const WhyChooseUs = () => {
  return (
    <div className="bg-[#1e2e4a] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose GENCORE IT?</h2>
          <div className="w-20 h-1 bg-[#FFA94D] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyStrengths.map((strength) => (
            <div 
              key={strength.id} 
              className="bg-[#162237]/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="bg-[#FFA94D]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {getIconComponent(strength.icon)}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{strength.title}</h3>
              <p className="text-[#D1D5DB]">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
