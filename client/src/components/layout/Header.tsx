import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { navLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled ? "bg-[#162237]/90 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#FFA94D]">G</span>
                <span className="text-xl font-bold ml-1 text-white">GENCORE IT</span>
              </a>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a className={cn(
                    "relative inline-block py-2 text-sm font-medium transition-colors duration-300 hover:text-white group",
                    location === link.href ? "text-white" : "text-[#D1D5DB]"
                  )}>
                    {link.label}
                    <span className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-[#FFA94D] transform origin-left transition-transform duration-300",
                      location === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}></span>
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <Button 
              className="bg-gradient-to-r from-[#162237] to-[#3B82F6] hover:from-[#1e2e4a] hover:to-[#60a5fa] text-white px-6 py-2 rounded-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              Get a Free Consultation
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1e2e4a] border-t border-gray-800">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                location === link.href 
                  ? "text-white bg-[#162237]/50" 
                  : "text-[#D1D5DB] hover:text-white hover:bg-[#162237]/30"
              )}>
                {link.label}
              </a>
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-800">
            <div className="px-2">
              <Button className="w-full bg-gradient-to-r from-[#162237] to-[#3B82F6] text-white px-4 py-2 rounded-md transition-all duration-300">
                Get a Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
