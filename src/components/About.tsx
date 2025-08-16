import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  { name: "Frontend Development", level: 95 },
  { name: "UI/UX Design", level: 90 },
  { name: "React & Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Animation & Motion", level: 85 },
  { name: "Performance Optimization", level: 88 },
];

const tools = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "GSAP", "Three.js", "Node.js", "PostgreSQL", "Figma", "Adobe Creative Suite"
];

export const About = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-orange/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-sm font-medium text-neon-cyan mb-6">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
            Crafting Digital <span className="gradient-text">Experiences</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm a passionate web architect with a maker's mindset, obsessed with creating 
                modern, conversion-focused websites that don't just look beautiful—they perform 
                exceptionally and drive real business results.
              </p>
              
              <p>
                My journey spans across the entire digital landscape, from crafting pixel-perfect 
                user interfaces to architecting scalable backend systems. I believe that great 
                design is invisible—it just works, feels intuitive, and creates memorable experiences 
                that users love.
              </p>
              
              <p>
                When I'm not coding, you'll find me exploring the latest web technologies, 
                contributing to open-source projects, or mentoring fellow developers. I'm always 
                excited to collaborate with forward-thinking brands and creators who want to push 
                the boundaries of what's possible on the web.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <h3 className="text-xl font-bold font-display text-foreground mb-6">
                Core Skills & Expertise
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-muted-foreground text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-surface rounded-full h-2">
                      <motion.div
                        className="h-2 bg-gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Tools & Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-dark-surface border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold font-display text-foreground mb-6">
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tools.map((tool, index) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="px-3 py-2 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-lg text-sm font-medium hover:shadow-neon transition-all duration-300"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-surface border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold font-display text-foreground mb-4">
                  Current Focus
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-neon-purple mr-3 mt-1">▸</span>
                    Building AI-powered web applications
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-cyan mr-3 mt-1">▸</span>
                    Exploring Web3 and blockchain integration
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-pink mr-3 mt-1">▸</span>
                    Advanced animation and micro-interactions
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-orange mr-3 mt-1">▸</span>
                    Performance optimization at scale
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary p-[1px] overflow-hidden">
              <div className="bg-dark-surface rounded-lg p-8">
                <h3 className="text-xl font-bold font-display gradient-text mb-4">
                  Let's Build Something Amazing
                </h3>
                <p className="text-muted-foreground mb-4">
                  Ready to bring your vision to life? I'm always excited to work on 
                  challenging projects that push creative boundaries.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-neon-purple font-semibold hover:gradient-text transition-all duration-300"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start a Conversation →
                </motion.button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};