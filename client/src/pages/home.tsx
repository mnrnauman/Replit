import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServicesSection from '@/components/home/ServicesSection';
import SolutionsSection from '@/components/home/SolutionsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>GENCORE IT - Next Generation Core IT Solutions</title>
        <meta name="description" content="GENCORE IT provides next generation core IT solutions including web development, cloud solutions, PBX & VoIP, SEO, and IT consulting services." />
        <meta name="keywords" content="IT solutions, web development, cloud computing, cybersecurity, SEO, VoIP, IT support" />
      </Helmet>
      
      <div className="bg-[#162237]">
        <HeroSection />
        <WhyChooseUs />
        <ServicesSection />
        <SolutionsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Home;
