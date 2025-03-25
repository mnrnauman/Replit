import { storage } from '../storage';
import type { Service } from '@shared/schema';

export const getAllServices = async (): Promise<Service[]> => {
  return storage.getServices();
};

export const getServiceBySlug = async (slug: string): Promise<Service | undefined> => {
  return storage.getServiceBySlug(slug);
};
