import { useState, useEffect } from 'react';

interface UseActiveNavHighlightProps {
  sectionIds: string[];
  offset?: number;
}

export const useActiveNavHighlight = ({ 
  sectionIds,
  offset = 100,
}: UseActiveNavHighlightProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset + offset;
      
      // Find the section that is currently in view
      const current = sectionIds
        .map(id => {
          const section = document.getElementById(id);
          if (!section) return { id, top: -1, bottom: -1 };
          
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          return {
            id,
            top: sectionTop,
            bottom: sectionBottom,
          };
        })
        .find(section => scrollPosition >= section.top && scrollPosition < section.bottom);
      
      if (current) {
        setActiveSection(current.id);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Clean up on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);
  
  return activeSection;
};

export default useActiveNavHighlight;
