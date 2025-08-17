import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  // 🔑 Dynamic API URL (local or deployed)
  const apiBaseUrl = import.meta.env.VITE_API_URL || "";

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setIsSubmitted(true);
      toast.success("Message sent successfully!");
      reset();
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-darker-surface relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-neon-orange/10 border border-neon-orange/20 text-sm font-medium text-neon-orange mb-6">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
            Let's Start a <span className="gradient-text">Conversation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Let's discuss how we can bring your vision to life 
            and create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold font-display text-foreground mb-6">
                Ready to collaborate?
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I'm always excited to work on new projects and help bring innovative 
                ideas to life. Whether you're a startup looking to make your mark or 
                an established company wanting to push boundaries, let's talk.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-neon-purple/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-neon-purple" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <a 
                    href="mailto:contact@furrealfread.com"
                    className="text-muted-foreground hover:gradient-text transition-all duration-300"
                  >
                    contact@furrealfread.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-neon-cyan/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-neon-cyan" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Response Time</h4>
                  <p className="text-muted-foreground">Usually within 24 hours</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-dark-surface rounded-xl p-6 border border-border"
            >
              <h4 className="font-bold text-foreground mb-4">What I can help with:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="text-neon-purple mr-3">▸</span>
                  Web Development & Design
                </li>
                <li className="flex items-center">
                  <span className="text-neon-cyan mr-3">▸</span>
                  UI/UX Consultation
                </li>
                <li className="flex items-center">
                  <span className="text-neon-pink mr-3">▸</span>
                  Performance Optimization
                </li>
                <li className="flex items-center">
                  <span className="text-neon-orange mr-3">▸</span>
                  Technical Architecture
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-dark-surface border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground font-medium">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className="mt-2 bg-darker-surface border-border focus:border-neon-purple focus:ring-neon-purple/20"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-foreground font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        className="mt-2 bg-darker-surface border-border focus:border-neon-purple focus:ring-neon-purple/20"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-foreground font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      {...register("subject", { required: "Subject is required" })}
                      className="mt-2 bg-darker-surface border-border focus:border-neon-purple focus:ring-neon-purple/20"
                      placeholder="Project inquiry"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      {...register("message", { required: "Message is required" })}
                      className="mt-2 bg-darker-surface border-border focus:border-neon-purple focus:ring-neon-purple/20 min-h-[120px]"
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary hover:shadow-neon text-primary-foreground border-0 py-3 text-lg font-semibold transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                        Sending...
                      </div>
                    ) : isSubmitted ? (
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Sent Successfully!
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
