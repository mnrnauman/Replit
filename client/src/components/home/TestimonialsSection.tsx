import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@shared/schema';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    staleTime: 60 * 1000, // 1 minute
  });

  const nextTestimonial = () => {
    if (!testimonials) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (!testimonials) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials, currentIndex]);

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-[#162237] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Client Testimonials</h2>
            <p className="mt-4 text-xl text-[#D1D5DB] max-w-3xl mx-auto">Hear what our clients have to say about their experience working with GENCORE IT.</p>
            <div className="w-20 h-1 bg-[#FFA94D] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse bg-[#1e2e4a] rounded-xl w-full md:w-1/2 lg:w-1/3 h-48"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !testimonials || testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-[#162237] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Client Testimonials</h2>
            <p className="mt-4 text-xl text-red-400">Unable to load testimonials at the moment.</p>
            <div className="w-20 h-1 bg-[#FFA94D] mx-auto mt-4 rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-[#162237] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFA94D] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Client Testimonials</h2>
          <p className="mt-4 text-xl text-[#D1D5DB] max-w-3xl mx-auto">Hear what our clients have to say about their experience working with GENCORE IT.</p>
          <div className="w-20 h-1 bg-[#FFA94D] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (direction: number) => {
                    return {
                      x: direction > 0 ? 1000 : -1000,
                      opacity: 0
                    };
                  },
                  center: {
                    zIndex: 1,
                    x: 0,
                    opacity: 1
                  },
                  exit: (direction: number) => {
                    return {
                      zIndex: 0,
                      x: direction < 0 ? 1000 : -1000,
                      opacity: 0
                    };
                  }
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full flex justify-center"
              >
                <div className="w-full md:w-1/2 lg:w-2/3 mx-auto p-4">
                  <div className="bg-[#1e2e4a] rounded-xl p-6 border border-gray-800 h-full transform transition-transform duration-300 hover:scale-[1.02]">
                    <div className="flex items-center mb-4">
                      <div className="text-[#FFA94D] flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < testimonials[currentIndex].rating ? "fill-current" : "stroke-current"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <blockquote className="text-[#D1D5DB] mb-6 text-lg">
                      "{testimonials[currentIndex].content}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonials[currentIndex].imageUrl || "https://via.placeholder.com/100"} 
                          alt={testimonials[currentIndex].name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{testimonials[currentIndex].name}</h4>
                        <p className="text-[#D1D5DB] text-sm">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-2">
            <button 
              onClick={prevTestimonial}
              className="bg-[#1e2e4a] p-2 rounded-full border border-gray-800 hover:bg-[#FFA94D]/20 transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="bg-[#1e2e4a] p-2 rounded-full border border-gray-800 hover:bg-[#FFA94D]/20 transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-2 h-2 mx-1 rounded-full transition-all duration-300",
                  index === currentIndex ? "bg-[#FFA94D] w-4" : "bg-gray-500 hover:bg-gray-400"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
