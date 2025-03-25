import { useCallback } from 'react';

interface ScrollToSectionProps {
  offset?: number;
}

export const useScrollToSection = ({ offset = 80 }: ScrollToSectionProps = {}) => {
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  }, [offset]);

  return scrollToSection;
};

export default useScrollToSection;
