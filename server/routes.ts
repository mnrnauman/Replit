import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactFormSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes (prefix all with /api)
  
  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Get testimonial by ID
  app.get("/api/testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const testimonial = await storage.getTestimonialById(id);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonial" });
    }
  });

  // Get all blog posts
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Get blog post by slug
  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get service by slug
  app.get("/api/services/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const service = await storage.getServiceBySlug(slug);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
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
  });

  // Subscribe to newsletter
  app.post("/api/newsletter-subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.subscribeToNewsletter(validatedData);
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
  });

  const httpServer = createServer(app);
  return httpServer;
}
