import { useState } from 'react';
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

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

const ContactSection = () => {
  const { toast } = useToast();
  const [formSuccess, setFormSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: ""
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
    <section id="contact" className="py-20 bg-gradient-to-b from-[#1e2e4a] to-[#162237]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Contact Us</h2>
          <p className="mt-4 text-xl text-[#D1D5DB] max-w-3xl mx-auto">Get in touch with our team to discuss how we can help you achieve your IT goals.</p>
          <div className="w-20 h-1 bg-[#FFA94D] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
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
          </div>
          
          <div>
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
                      className="w-full bg-gradient-to-r from-[#162237] to-[#3B82F6] hover:from-[#1e2e4a] hover:to-[#60a5fa] text-white py-3 px-6 rounded-md transition-all duration-300 hover:shadow-lg"
                      disabled={isPending}
                    >
                      {isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
