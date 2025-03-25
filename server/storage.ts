import {
  users, type User, type InsertUser,
  contactFormSubmissions, type ContactFormSubmission, type InsertContactForm,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletterSubscription,
  testimonials, type Testimonial, type InsertTestimonial,
  blogPosts, type BlogPost, type InsertBlogPost,
  services, type Service, type InsertService
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contact form methods
  createContactSubmission(submission: InsertContactForm): Promise<ContactFormSubmission>;
  getContactSubmissions(): Promise<ContactFormSubmission[]>;

  // Newsletter methods
  subscribeToNewsletter(email: InsertNewsletterSubscription): Promise<NewsletterSubscription>;

  // Testimonials methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Blog posts methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Services methods
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactFormSubmission>;
  private newsletterSubscribers: Map<number, NewsletterSubscription>;
  private testimonialsList: Map<number, Testimonial>;
  private blogPostsList: Map<number, BlogPost>;
  private servicesList: Map<number, Service>;
  
  private currentUserId: number;
  private currentContactSubmissionId: number;
  private currentNewsletterSubscriberId: number;
  private currentTestimonialId: number;
  private currentBlogPostId: number;
  private currentServiceId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.newsletterSubscribers = new Map();
    this.testimonialsList = new Map();
    this.blogPostsList = new Map();
    this.servicesList = new Map();
    
    this.currentUserId = 1;
    this.currentContactSubmissionId = 1;
    this.currentNewsletterSubscriberId = 1;
    this.currentTestimonialId = 1;
    this.currentBlogPostId = 1;
    this.currentServiceId = 1;
    
    this.initializeTestData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact form methods
  async createContactSubmission(submission: InsertContactForm): Promise<ContactFormSubmission> {
    const id = this.currentContactSubmissionId++;
    const newSubmission: ContactFormSubmission = {
      ...submission,
      id,
      company: submission.company || null,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getContactSubmissions(): Promise<ContactFormSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  // Newsletter methods
  async subscribeToNewsletter(data: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
    const existingSubscription = Array.from(this.newsletterSubscribers.values()).find(
      (subscription) => subscription.email === data.email
    );
    
    if (existingSubscription) {
      return existingSubscription;
    }
    
    const id = this.currentNewsletterSubscriberId++;
    const newSubscription: NewsletterSubscription = {
      ...data,
      id,
      createdAt: new Date(),
    };
    
    this.newsletterSubscribers.set(id, newSubscription);
    return newSubscription;
  }

  // Testimonials methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonialsList.values());
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    return this.testimonialsList.get(id);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial: Testimonial = { 
      ...testimonial, 
      id,
      imageUrl: testimonial.imageUrl || null 
    };
    this.testimonialsList.set(id, newTestimonial);
    return newTestimonial;
  }

  // Blog posts methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPostsList.values());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPostsList.values()).find(
      (post) => post.slug === slug
    );
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const newPost: BlogPost = {
      ...post,
      id,
      imageUrl: post.imageUrl || null,
      publishedAt: new Date(),
    };
    this.blogPostsList.set(id, newPost);
    return newPost;
  }

  // Services methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.servicesList.values());
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.servicesList.values()).find(
      (service) => service.slug === slug
    );
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const newService: Service = { 
      ...service, 
      id,
      imageUrl: service.imageUrl || null 
    };
    this.servicesList.set(id, newService);
    return newService;
  }

  // Initialize with sample data for demonstration
  private initializeTestData() {
    // Sample testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Michael Thompson",
        company: "Quantum Retail",
        role: "CTO",
        content: "GENCORE IT's cloud migration strategy transformed our business operations. Their team was professional, responsive, and delivered ahead of schedule. We've seen a 30% improvement in system performance and significant cost savings.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        name: "Dr. Sarah Johnson",
        company: "Wellness Medical Center",
        role: "Director",
        content: "The custom CRM solution GENCORE IT developed for our healthcare practice has revolutionized our patient management. Their understanding of HIPAA compliance and healthcare workflows made all the difference.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        name: "Ahmed Khan",
        company: "StyleHub",
        role: "Founder",
        content: "When our e-commerce site was struggling with performance issues during peak seasons, GENCORE IT stepped in and optimized our entire infrastructure. Our site now handles 3x the traffic with improved loading times.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=100&h=100"
      }
    ];
    
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
    
    // Sample blog posts
    const blogPosts: InsertBlogPost[] = [
      {
        title: "The Future of Cloud Computing in 2023",
        slug: "future-of-cloud-computing-2023",
        excerpt: "Exploring the latest trends and innovations in cloud technology that will shape businesses in the coming year.",
        content: "Cloud computing continues to evolve at a rapid pace, with new technologies and services emerging regularly. In this post, we explore the key trends that will define cloud computing in 2023, including serverless architecture, edge computing, and multi-cloud strategies...",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=400",
        author: "Nauman Ahmed"
      },
      {
        title: "Cybersecurity Best Practices for Small Businesses",
        slug: "cybersecurity-best-practices-small-businesses",
        excerpt: "Essential security measures that small businesses should implement to protect their digital assets.",
        content: "Small businesses are increasingly becoming targets for cyber attacks due to typically having fewer security resources than larger corporations. This comprehensive guide outlines the essential security measures every small business should implement...",
        imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800&h=400",
        author: "Sarah Wilson"
      },
      {
        title: "How Digital Transformation is Reshaping Customer Experience",
        slug: "digital-transformation-reshaping-customer-experience",
        excerpt: "Discover how businesses are leveraging technology to create more personalized and efficient customer experiences.",
        content: "Digital transformation is fundamentally changing how businesses interact with their customers. From AI-powered chatbots to omnichannel marketing strategies, companies are finding innovative ways to enhance customer experiences...",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=400",
        author: "Nauman Ahmed"
      }
    ];
    
    blogPosts.forEach(post => {
      this.createBlogPost(post);
    });
    
    // Sample services
    const services: InsertService[] = [
      {
        title: "Web Development & Hosting",
        description: "Custom-built, responsive websites and applications with secure, high-performance hosting solutions.",
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800&h=400",
        slug: "web-development-hosting"
      },
      {
        title: "Cloud Solutions",
        description: "Public and private cloud infrastructure, migrations, and management for maximum flexibility and scalability.",
        imageUrl: "/attached_assets/image_1742859984733.png",
        slug: "cloud-solutions"
      },
      {
        title: "CRM Solutions",
        description: "Customized Customer Relationship Management systems to streamline your sales, marketing, and customer service.",
        imageUrl: "/attached_assets/image_1742860126343.png",
        slug: "crm-solutions"
      },
      {
        title: "PBX & VoIP Solutions",
        description: "Modern, cost-effective communication systems that integrate with your existing IT infrastructure.",
        imageUrl: "/attached_assets/image_1742859661205.png",
        slug: "pbx-voip-solutions"
      },
      {
        title: "IT Support & Consultancy",
        description: "Proactive IT management and strategic guidance to align technology with your business goals.",
        imageUrl: "/attached_assets/image_1742859910587.png",
        slug: "it-support-consultancy"
      }
    ];
    
    services.forEach(service => {
      this.createService(service);
    });
  }
}

export const storage = new MemStorage();
