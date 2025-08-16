import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import auroraBoutiqueImg from "@/assets/aurora-boutique.jpg";
import nebulaStudiosImg from "@/assets/nebula-studios.jpg";
import pulseAnalyticsImg from "@/assets/pulse-analytics.jpg";

const projects = [
  {
    title: "Aurora Boutique",
    description: "Luxury E-Commerce platform with animated product galleries, sleek checkout flow, and conversion-focused layout designed to elevate the shopping experience.",
    image: auroraBoutiqueImg,
    tags: ["React", "TypeScript", "Stripe", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://aurora-boutique-demo.com",
    githubUrl: "https://github.com/furrealfread/aurora-boutique",
    caseStudy: "Increased conversion rates by 45% through strategic UX improvements and optimized checkout flow. Implemented micro-interactions that enhanced user engagement and reduced cart abandonment by 30%.",
    slug: "aurora-boutique",
  },
  {
    title: "Nebula Studios",
    description: "Creative agency portfolio featuring case study-driven content with immersive scrolling animations and embedded video showcases for maximum visual impact.",
    image: nebulaStudiosImg,
    tags: ["Next.js", "GSAP", "Three.js", "Sanity CMS", "Vercel"],
    liveUrl: "https://nebula-studios-demo.com",
    githubUrl: "https://github.com/furrealfread/nebula-studios",
    caseStudy: "Developed an award-winning portfolio that helped the agency increase client inquiries by 200%. The scroll-triggered animations and video integration created an immersive storytelling experience.",
    slug: "nebula-studios",
  },
  {
    title: "Pulse Analytics",
    description: "SaaS dashboard featuring real-time data visualization, dark mode interface, and custom filtering systems for comprehensive business intelligence.",
    image: pulseAnalyticsImg,
    tags: ["React", "D3.js", "WebSocket", "Node.js", "PostgreSQL"],
    liveUrl: "https://pulse-analytics-demo.com",
    githubUrl: "https://github.com/furrealfread/pulse-analytics",
    caseStudy: "Built a scalable analytics platform handling 1M+ data points in real-time. The intuitive interface and powerful filtering capabilities improved user productivity by 60% and reduced time-to-insight significantly.",
    slug: "pulse-analytics",
  },
];

export const Work = () => {
  return (
    <section id="work" className="py-24 bg-darker-surface relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl transform -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-sm font-medium text-neon-purple mb-6">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of recent projects that demonstrate my expertise in creating 
            modern, high-performing web experiences that drive results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          <a
            href="#"
            className="inline-flex items-center text-lg font-semibold gradient-text hover:opacity-80 transition-opacity duration-300"
          >
            View Full Portfolio →
          </a>
        </motion.div>
      </div>
    </section>
  );
};