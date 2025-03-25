import { companyTimeline } from '@/lib/data';
import { motion } from 'framer-motion';

const Timeline = () => {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 hidden md:block"></div>
      
      <div className="space-y-12">
        {companyTimeline.map((event, index) => (
          <motion.div 
            key={event.year}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative flex flex-col md:flex-row gap-8 items-center"
          >
            {/* Timeline bubble */}
            <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full bg-[#1e2e4a] border-4 border-[#FFA94D] flex items-center justify-center">
              <span className="text-white font-bold text-sm">{event.year}</span>
            </div>
            
            {/* Content for even/odd events */}
            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right md:self-end' : 'md:pl-16 md:ml-auto'}`}>
              <div className="bg-[#1e2e4a] p-6 rounded-xl border border-gray-800 card-hover">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-[#D1D5DB]">{event.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
