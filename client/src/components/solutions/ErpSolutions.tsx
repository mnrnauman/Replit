import { erpSolutions } from '@/lib/data';
import { Shield, BarChart, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Shield':
      return <Shield className="h-5 w-5 text-[#FFA94D]" />;
    case 'BarChart':
      return <BarChart className="h-5 w-5 text-[#FFA94D]" />;
    case 'PieChart':
      return <PieChart className="h-5 w-5 text-[#FFA94D]" />;
    default:
      return <Shield className="h-5 w-5 text-[#FFA94D]" />;
  }
};

const ErpSolutions = () => {
  const [, setLocation] = useLocation();

  const handleConsultation = () => {
    setLocation('/contact?subject=ERP Solution Consultation');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Custom ERP & Business Automation</h3>
        <p className="text-[#D1D5DB] mb-8">
          Streamline operations, eliminate redundancies, and gain real-time insights with our tailor-made business automation solutions. Let us help you build a more efficient organization.
        </p>
        
        <div className="space-y-4">
          {erpSolutions.map((solution) => (
            <motion.div 
              key={solution.id} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: solution.id * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#162237]/50 p-4 rounded-lg border border-gray-800 group hover:border-[#3B82F6] transition-all duration-300"
            >
              <h4 className="text-lg font-semibold text-white flex items-center">
                <span className="bg-[#FFA94D]/20 p-1 rounded-md mr-2 group-hover:bg-[#FFA94D]/40 transition-all duration-300">
                  {getIcon(solution.icon)}
                </span>
                {solution.title}
              </h4>
              <p className="text-[#D1D5DB] mt-2">{solution.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8">
          <Button 
            className="gradient-cta"
            onClick={handleConsultation}
          >
            Schedule a Consultation
          </Button>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="order-1 lg:order-2 transition-all duration-500 transform hover:-translate-y-2"
      >
        <img 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=600" 
          alt="Business automation" 
          className="rounded-xl shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default ErpSolutions;
