import { Helmet } from 'react-helmet';
import PageHeader from "@/components/common/PageHeader";
import CrmSolutions from "@/components/solutions/CrmSolutions";
import ErpSolutions from "@/components/solutions/ErpSolutions";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const Solutions = () => {
  const [, setLocation] = useLocation();

  const handleContact = () => {
    setLocation('/contact?subject=Custom Solution Inquiry');
  };

  return (
    <>
      <Helmet>
        <title>Solutions | GENCORE IT</title>
        <meta name="description" content="Discover our tailored IT solutions including CRM development, business automation, and custom ERP solutions for various industries." />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <PageHeader 
          title="Custom Solutions" 
          description="Tailored IT solutions designed specifically for your industry needs."
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Industry-Specific Solutions</h2>
            <CrmSolutions />
          </div>
          
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Business Automation</h2>
            <ErpSolutions />
          </div>
          
          {/* CTA Section */}
          <div className="bg-[#1e2e4a] rounded-xl p-8 border border-gray-800 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h3>
            <p className="text-[#D1D5DB] mb-8 max-w-2xl mx-auto">
              Our team of experts can develop a tailored solution specific to your business requirements and challenges.
            </p>
            <Button 
              className="gradient-cta py-6 px-8 text-lg"
              onClick={handleContact}
            >
              Schedule a Consultation
            </Button>
          </div>
          
          {/* Additional Benefits */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Benefits of Custom Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#1e2e4a] p-8 rounded-xl border border-gray-800 card-hover">
                <div className="bg-[#FFA94D]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFA94D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Increased Efficiency</h3>
                <p className="text-[#D1D5DB]">
                  Custom solutions are designed to optimize your specific workflows, eliminating unnecessary steps and automating repetitive tasks.
                </p>
              </div>
              
              <div className="bg-[#1e2e4a] p-8 rounded-xl border border-gray-800 card-hover">
                <div className="bg-[#FFA94D]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFA94D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Competitive Advantage</h3>
                <p className="text-[#D1D5DB]">
                  Gain an edge over competitors with unique solutions tailored to your business model, market position, and customer needs.
                </p>
              </div>
              
              <div className="bg-[#1e2e4a] p-8 rounded-xl border border-gray-800 card-hover">
                <div className="bg-[#FFA94D]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFA94D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Cost Effectiveness</h3>
                <p className="text-[#D1D5DB]">
                  While initial investment may be higher than off-the-shelf solutions, custom development offers better long-term ROI with fewer licensing fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Solutions;
