import { storage } from '../storage';
import type { Testimonial } from '@shared/schema';

export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  return storage.getTestimonials();
};

export const getTestimonialById = async (id: number): Promise<Testimonial | undefined> => {
  return storage.getTestimonialById(id);
};
