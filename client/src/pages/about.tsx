import { Helmet } from 'react-helmet';
import PageHeader from "@/components/common/PageHeader";
import TeamSection from "@/components/about/TeamSection";
import Timeline from "@/components/about/Timeline";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const About = () => {
  const [, setLocation] = useLocation();

  const handleContact = () => {
    setLocation('/contact');
  };

  return (
    <>
      <Helmet>
        <title>About Us | GENCORE IT</title>
        <meta name="description" content="Learn about GENCORE IT, our mission, vision, achievements, and leadership team dedicated to providing next generation IT solutions." />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <PageHeader 
          title="About GENCORE IT" 
          description="Get to know our mission, vision, and the team behind our innovative IT solutions."
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission & Vision */}
          <section className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-[#D1D5DB] mb-8 text-lg">
                  At GENCORE IT, our mission is to empower businesses through innovative technology solutions that drive growth, efficiency, and competitive advantage. We aim to be the trusted technology partner that helps organizations navigate and leverage the digital landscape.
                </p>
                <p className="text-[#D1D5DB] text-lg">
                  We believe in making cutting-edge technology accessible to businesses of all sizes, providing the tools and expertise needed to thrive in an increasingly digital world.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[#1e2e4a] p-8 rounded-xl border border-gray-800 card-hover"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
                <p className="text-[#D1D5DB] mb-8 text-lg">
                  We envision a future where businesses of all sizes can harness the full potential of technology to achieve their goals. Our vision is to be at the forefront of IT innovation, consistently delivering solutions that transform challenges into opportunities.
                </p>
                <p className="text-[#D1D5DB] text-lg">
                  By 2030, we aim to be recognized globally as a leader in integrated IT solutions, known for our technical excellence, customer-focused approach, and commitment to sustainable technology practices.
                </p>
              </motion.div>
            </div>
          </section>
          
          {/* Timeline */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Journey</h2>
            <Timeline />
          </section>
          
          {/* Team Section */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Leadership Team</h2>
            <TeamSection />
          </section>
          
          {/* Company Values */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[#1e2e4a] p-8 rounded-xl border border-gray-800 card-hover"
              >
                <div className="bg-[#FFA94D]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFA94D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
                <p className="text-[#D1D5DB]">
                  We are committed to delivering the highest quality solutions and services. We continuously learn, improve, and strive to exceed expectations in everything we do.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[#1e2e4a] p-8 rounded-xl border border-gray-800 card-hover"
              >
                <div className="bg-[#FFA94D]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFA94D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Client Partnership</h3>
                <p className="text-[#D1D5DB]">
                  We build lasting relationships based on trust, transparency, and mutual success. Your goals become our goals, and we're dedicated to helping you achieve them.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-[#1e2e4a] p-8 rounded-xl border border-gray-800 card-hover"
              >
                <div className="bg-[#FFA94D]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFA94D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
                <p className="text-[#D1D5DB]">
                  We embrace change and continuously explore new technologies and approaches. We're not afraid to challenge conventions to find better solutions to complex problems.
                </p>
              </motion.div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Work With Us?</h3>
            <p className="text-[#D1D5DB] mb-8 max-w-2xl mx-auto">
              Contact our team today to discuss how GENCORE IT can help with your technology needs and challenges.
            </p>
            <Button 
              className="gradient-cta py-6 px-8 text-lg"
              onClick={handleContact}
            >
              Get in Touch
            </Button>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
