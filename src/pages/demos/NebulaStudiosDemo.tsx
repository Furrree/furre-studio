import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Award, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const NebulaStudiosDemo = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const projects = [
    {
      title: "Quantum Dynamics",
      category: "Brand Identity",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      title: "Stellar Logistics",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "Phoenix Labs",
      category: "Mobile App",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
    }
  ];

  const stats = [
    { icon: Award, value: "50+", label: "Awards Won" },
    { icon: Users, value: "200+", label: "Happy Clients" },
    { icon: Zap, value: "500+", label: "Projects Done" }
  ];

  return (
    <div className="min-h-screen bg-background" ref={ref}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-surface/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/projects/nebula-studios')}
              className="hover:bg-dark-surface"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
            
            <motion.div 
              className="flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <nav className="hidden md:flex space-x-6">
                <a href="#work" className="text-foreground hover:gradient-text transition-all">Work</a>
                <a href="#about" className="text-foreground hover:gradient-text transition-all">About</a>
                <a href="#contact" className="text-foreground hover:gradient-text transition-all">Contact</a>
              </nav>
            </motion.div>
            
            <Button className="bg-gradient-primary hover:shadow-neon text-primary-foreground">
              Start Project
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20"
        />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold font-display text-foreground mb-6">
              Nebula <br />
              <span className="gradient-text">Studios</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We create digital experiences that push boundaries and inspire action
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-primary hover:shadow-neon text-primary-foreground px-8 py-4 text-lg">
                View Our Work
              </Button>
              <Button variant="outline" className="border-border hover:bg-dark-surface px-8 py-4 text-lg">
                <Play className="h-5 w-5 mr-2" />
                Watch Reel
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-4 h-4 bg-neon-purple rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-6 h-6 bg-neon-blue rounded-full"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-surface/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="work" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Featured <span className="gradient-text">Work</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Each project tells a unique story of innovation and creative excellence
            </p>
          </motion.div>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card className="bg-dark-surface border-border overflow-hidden group">
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Button className="bg-gradient-primary hover:shadow-neon text-primary-foreground">
                          View Case Study
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="text-sm text-neon-purple font-medium mb-2">{project.category}</div>
                  <h3 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    A groundbreaking project that redefined industry standards through innovative 
                    design thinking and cutting-edge technology implementation.
                  </p>
                  <Button variant="outline" className="border-border hover:bg-dark-surface">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark-surface/50 to-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
              Ready to Create Something <span className="gradient-text">Extraordinary</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with innovative design and technology
            </p>
            <Button className="bg-gradient-primary hover:shadow-neon text-primary-foreground px-8 py-4 text-lg">
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NebulaStudiosDemo;