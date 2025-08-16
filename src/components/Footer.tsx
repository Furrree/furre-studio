import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          {/* Logo & Copyright */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold font-display gradient-text mb-2">
              Furre Alfread
            </h3>
            <p className="text-muted-foreground text-sm">
              © {currentYear} All rights reserved. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-400 mx-1" />
              and lots of coffee.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {[
              { icon: Github, href: "#", label: "GitHub", color: "neon-purple" },
              { icon: Linkedin, href: "#", label: "LinkedIn", color: "neon-cyan" },
              { icon: Mail, href: "mailto:contact@furrealfread.com", label: "Email", color: "neon-pink" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-3 rounded-full bg-dark-surface border border-border hover:border-neon-purple/50 hover:shadow-neon transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-neon-purple transition-colors duration-300" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground italic max-w-2xl mx-auto">
            "Great design is not just what it looks like and feels like. 
            Great design is how it works."
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2">- Steve Jobs</p>
        </motion.div>
      </div>
    </footer>
  );
};