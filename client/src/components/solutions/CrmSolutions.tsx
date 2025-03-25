import { crmSolutions } from '@/lib/data';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const CrmSolutions = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="transition-all duration-500 transform hover:-translate-y-2"
      >
        <img 
          src="/attached_assets/image_1742860126343.png" 
          alt="CRM development and management" 
          className="rounded-xl shadow-2xl"
        />
      </motion.div>
      
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">CRM Development</h3>
        <p className="text-[#D1D5DB] mb-8">
          Our custom CRM solutions help you manage customer relationships more effectively, increasing retention and maximizing lifetime value. We tailor each system to your specific industry needs.
        </p>
        
        <div className="space-y-4">
          {crmSolutions.map((solution) => (
            <motion.div 
              key={solution.id} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: solution.id * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#162237]/50 p-4 rounded-lg border border-gray-800 flex items-start group hover:border-[#3B82F6] transition-all duration-300"
            >
              <div className="bg-[#FFA94D]/20 p-2 rounded-md mr-4 group-hover:bg-[#FFA94D]/40 transition-all duration-300">
                <Check className="h-6 w-6 text-[#FFA94D]" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{solution.title}</h4>
                <p className="text-[#D1D5DB]">{solution.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrmSolutions;
