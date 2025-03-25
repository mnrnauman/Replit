import { Link } from 'wouter';
import { footerLinks } from '@/lib/data';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useState } from 'react';
import { isValidEmail } from '@/lib/utils';

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest('POST', '/api/newsletter-subscribe', { email });
      const data = await response.json();
      
      toast({
        title: "Success!",
        description: data.message || "You've been subscribed to our newsletter.",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#162237] py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#FFA94D]">G</span>
              <span className="text-xl font-bold ml-1 text-white">GENCORE IT</span>
            </div>
            <p className="text-[#D1D5DB] mb-6">
              Next Generation Core IT Solutions for businesses of all sizes. Empowering your digital transformation journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#D1D5DB] hover:text-[#FFA94D] transition-colors duration-300">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-[#D1D5DB] hover:text-[#FFA94D] transition-colors duration-300">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-[#D1D5DB] hover:text-[#FFA94D] transition-colors duration-300">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-[#D1D5DB] hover:text-[#FFA94D] transition-colors duration-300">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-[#D1D5DB] hover:text-[#FFA94D] transition-colors duration-300">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-[#D1D5DB] hover:text-[#FFA94D] transition-colors duration-300">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-[#D1D5DB] mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="mb-4" onSubmit={handleNewsletterSubmit}>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow bg-[#162237]/50 border border-gray-700 rounded-l-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  className="bg-[#FFA94D] hover:bg-[#FFA94D]/80 text-white font-medium py-2 px-4 rounded-r-md transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </button>
              </div>
            </form>
            <p className="text-[#D1D5DB] text-sm">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#D1D5DB] text-sm">
            &copy; {new Date().getFullYear()} GENCORE IT. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-[#D1D5DB] hover:text-[#FFA94D] text-sm transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#D1D5DB] hover:text-[#FFA94D] text-sm transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[#D1D5DB] hover:text-[#FFA94D] text-sm transition-colors duration-300">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
