import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { Testimonial } from '@shared/schema';
import PageHeader from "@/components/common/PageHeader";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Loader2 } from 'lucide-react';

const Testimonials = () => {
  const [, setLocation] = useLocation();
  
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    staleTime: 60 * 1000, // 1 minute
  });

  const handleContact = () => {
    setLocation('/contact');
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-20">
        <PageHeader 
          title="Client Testimonials" 
          description="Hear what our clients have to say about their experience working with GENCORE IT."
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
          <Loader2 className="h-8 w-8 text-[#FFA94D] animate-spin" />
          <span className="ml-2 text-white">Loading testimonials...</span>
        </div>
      </div>
    );
  }

  if (error || !testimonials) {
    return (
      <div className="pt-32 pb-20">
        <PageHeader 
          title="Client Testimonials" 
          description="Hear what our clients have to say about their experience working with GENCORE IT."
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-red-400">Failed to load testimonials. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Testimonials | GENCORE IT</title>
        <meta name="description" content="Read what our clients have to say about their experience working with GENCORE IT and our technology solutions." />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <PageHeader 
          title="Client Testimonials" 
          description="Hear what our clients have to say about their experience working with GENCORE IT."
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-20">
            <div className="bg-[#1e2e4a] p-6 rounded-xl border border-gray-800 text-center card-hover">
              <div className="text-4xl font-bold text-[#FFA94D] mb-2">100+</div>
              <div className="text-white font-medium">Happy Clients</div>
            </div>
            <div className="bg-[#1e2e4a] p-6 rounded-xl border border-gray-800 text-center card-hover">
              <div className="text-4xl font-bold text-[#FFA94D] mb-2">250+</div>
              <div className="text-white font-medium">Projects Completed</div>
            </div>
            <div className="bg-[#1e2e4a] p-6 rounded-xl border border-gray-800 text-center card-hover">
              <div className="text-4xl font-bold text-[#FFA94D] mb-2">8+</div>
              <div className="text-white font-medium">Years Experience</div>
            </div>
            <div className="bg-[#1e2e4a] p-6 rounded-xl border border-gray-800 text-center card-hover">
              <div className="text-4xl font-bold text-[#FFA94D] mb-2">24/7</div>
              <div className="text-white font-medium">Support Available</div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-[#1e2e4a] rounded-xl p-12 border border-gray-800 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Experience the GENCORE Difference?</h3>
            <p className="text-[#D1D5DB] mb-8 max-w-2xl mx-auto">
              Join our growing list of satisfied clients and transform your business with our innovative IT solutions.
            </p>
            <Button 
              className="gradient-cta py-6 px-8 text-lg"
              onClick={handleContact}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
