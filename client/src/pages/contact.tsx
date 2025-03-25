import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { contactInfo } from '@/lib/data';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { InsertContactForm } from '@shared/schema';
import PageHeader from "@/components/common/PageHeader";
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

const Contact = () => {
  const { toast } = useToast();
  const [formSuccess, setFormSuccess] = useState(false);
  const [location] = useLocation();
  
  // Extract query params to pre-fill subject if provided
  const urlParams = new URLSearchParams(location.split('?')[1]);
  const subjectParam = urlParams.get('subject');
  const serviceParam = urlParams.get('service');
  
  let initialMessage = '';
  if (subjectParam) {
    initialMessage = `Subject: ${subjectParam}\n\n`;
  } else if (serviceParam) {
    initialMessage = `I'm interested in learning more about your ${serviceParam.replace(/-/g, ' ')} service.\n\n`;
  }
  
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: initialMessage
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: InsertContactForm) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent",
        description: data.message || "Thank you for your message! We'll get back to you as soon as possible.",
      });
      setFormSuccess(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: z.infer<typeof ContactFormSchema>) {
    mutate(data);
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | GENCORE IT</title>
        <meta name="description" content="Get in touch with the GENCORE IT team for inquiries, support, or to discuss your IT needs. We're here to help you achieve your business goals." />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <PageHeader 
          title="Contact Us" 
          description="Get in touch with our team to discuss how we can help you achieve your IT goals."
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#1e2e4a] rounded-xl p-8 border border-gray-800 h-full">
                <h3 className="text-2xl font-bold text-white mb-6">Our Office</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#FFA94D]/20 p-2 rounded-md mr-4">
                      <MapPin className="h-6 w-6 text-[#FFA94D]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Address</h4>
                      <p className="text-[#D1D5DB]">{contactInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#FFA94D]/20 p-2 rounded-md mr-4">
                      <Phone className="h-6 w-6 text-[#FFA94D]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Phone</h4>
                      <p className="text-[#D1D5DB]">{contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#FFA94D]/20 p-2 rounded-md mr-4">
                      <Mail className="h-6 w-6 text-[#FFA94D]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Email</h4>
                      <p className="text-[#D1D5DB]">{contactInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#FFA94D]/20 p-2 rounded-md mr-4">
                      <Clock className="h-6 w-6 text-[#FFA94D]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Working Hours</h4>
                      <p className="text-[#D1D5DB]">{contactInfo.workingHours}</p>
                    </div>
                  </div>
                </div>
                
                {/* Google Maps */}
                <div className="mt-8 h-64 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.2029880645126!2d74.34138521511634!3d31.51601705578846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905fa24605fbf%3A0xe1baa003beb84ad7!2sLiberty%20Market%2C%20Gulberg%20III%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1628679854763!5m2!1sen!2s"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false}
                    loading="lazy"
                    title="GENCORE IT Office Location"
                  ></iframe>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#1e2e4a] rounded-xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                
                {formSuccess ? (
                  <div className="bg-green-900/20 border border-green-500 text-green-300 p-6 rounded-md text-center">
                    <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
                    <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                    <Button 
                      className="mt-4 bg-green-600 hover:bg-green-700"
                      onClick={() => setFormSuccess(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                className="bg-[#162237]/50 border border-gray-700 text-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="you@example.com" 
                                className="bg-[#162237]/50 border border-gray-700 text-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Company</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your company name (optional)" 
                                className="bg-[#162237]/50 border border-gray-700 text-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you?" 
                                className="bg-[#162237]/50 border border-gray-700 text-white" 
                                rows={5}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full gradient-cta py-3 px-6"
                        disabled={isPending}
                      >
                        {isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Additional Contact Channels */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Other Ways to Reach Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-[#1e2e4a] p-6 rounded-xl border border-gray-800 text-center card-hover"
              >
                <div className="bg-[#FFA94D]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFA94D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Live Chat</h4>
                <p className="text-[#D1D5DB] mb-6">Chat with our support team in real-time for immediate assistance.</p>
                <Button variant="outline" className="border-[#3B82F6] hover:bg-[#3B82F6]/10">
                  Start Chat
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1e2e4a] p-6 rounded-xl border border-gray-800 text-center card-hover"
              >
                <div className="bg-[#FFA94D]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFA94D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Phone Support</h4>
                <p className="text-[#D1D5DB] mb-6">Call our dedicated support line for personalized help.</p>
                <Button variant="outline" className="border-[#3B82F6] hover:bg-[#3B82F6]/10">
                  Call Now
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[#1e2e4a] p-6 rounded-xl border border-gray-800 text-center card-hover"
              >
                <div className="bg-[#FFA94D]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFA94D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Knowledge Base</h4>
                <p className="text-[#D1D5DB] mb-6">Browse our documentation and self-help resources.</p>
                <Button variant="outline" className="border-[#3B82F6] hover:bg-[#3B82F6]/10">
                  Explore Resources
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
