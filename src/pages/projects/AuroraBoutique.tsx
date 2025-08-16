import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import auroraBoutiqueImg from "@/assets/aurora-boutique.jpg";

const AuroraBoutique = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-dark-surface"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.img
                src={auroraBoutiqueImg}
                alt="Aurora Boutique"
                className="w-full rounded-lg shadow-card-custom"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
                  Aurora <span className="gradient-text">Boutique</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  Luxury E-Commerce platform with animated product galleries, sleek checkout flow, and conversion-focused layout designed to elevate the shopping experience.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {["React", "TypeScript", "Stripe", "Framer Motion", "Tailwind CSS"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mb-8">
                  <Button
                    className="bg-gradient-primary hover:shadow-neon text-primary-foreground"
                    onClick={() => navigate('/demos/aurora-boutique')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live Demo
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">Case Study</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Increased conversion rates by 45% through strategic UX improvements and optimized checkout flow. 
                      Implemented micro-interactions that enhanced user engagement and reduced cart abandonment by 30%.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Key Features</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Animated product galleries with smooth transitions</li>
                      <li>One-click checkout with Stripe integration</li>
                      <li>Advanced product filtering and search</li>
                      <li>Responsive design optimized for mobile commerce</li>
                      <li>Real-time inventory management</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Results</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>45% increase in conversion rates</li>
                      <li>30% reduction in cart abandonment</li>
                      <li>60% improvement in mobile user engagement</li>
                      <li>25% increase in average order value</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuroraBoutique;