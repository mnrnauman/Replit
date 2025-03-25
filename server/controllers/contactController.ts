import { Request, Response } from 'express';
import { storage } from '../storage';
import { insertContactFormSchema } from '@shared/schema';
import { z } from 'zod';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const validatedData = insertContactFormSchema.parse(req.body);
    const submission = await storage.createContactSubmission(validatedData);
    
    res.status(201).json({ 
      success: true, 
      message: "Your message has been sent successfully!",
      data: submission 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false,
        message: "Validation error",
        errors: error.errors 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Failed to submit contact form" 
    });
  }
};

export const subscribeToNewsletter = async (req: Request, res: Response) => {
  try {
    // Validate email
    const emailSchema = z.object({
      email: z.string().email("Invalid email address"),
    });
    
    const { email } = emailSchema.parse(req.body);
    
    // Store subscription
    const subscription = await storage.subscribeToNewsletter({ email });
    
    res.status(201).json({ 
      success: true, 
      message: "You have been successfully subscribed to our newsletter!",
      data: subscription 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false,
        message: "Validation error",
        errors: error.errors 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Failed to subscribe to newsletter" 
    });
  }
};
