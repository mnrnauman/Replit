import { Testimonial } from '@shared/schema';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="bg-[#1e2e4a] rounded-xl p-6 border border-gray-800 h-full transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="flex items-center mb-4">
        <div className="text-[#FFA94D] flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < testimonial.rating ? 'fill-current' : 'stroke-current'}`}
            />
          ))}
        </div>
      </div>
      
      <blockquote className="text-[#D1D5DB] mb-6 italic">
        "{testimonial.content}"
      </blockquote>
      
      <div className="flex items-center mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={testimonial.imageUrl || "https://via.placeholder.com/100"} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-white font-semibold">{testimonial.name}</h4>
          <p className="text-[#D1D5DB] text-sm">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
