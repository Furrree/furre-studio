import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  caseStudy: string;
  index: number;
  slug: string;
}

export const ProjectCard = ({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  caseStudy,
  index,
  slug,
}: ProjectCardProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="bg-dark-surface border-border hover:border-neon-purple/30 transition-all duration-500 hover:shadow-card-custom overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="bg-gradient-primary hover:shadow-neon text-primary-foreground"
                  onClick={() => {
                    navigate(`/projects/${slug}`);
                  }}
                >
                <ArrowRight className="h-4 w-4 mr-1" />
                View Project
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-bold font-display text-foreground mb-3 group-hover:gradient-text transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            {description}
          </p>
          
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-3 font-medium">Case Study:</p>
            <p className="text-sm text-foreground leading-relaxed">
              {caseStudy}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};