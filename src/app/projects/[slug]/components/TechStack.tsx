"use client";

import { motion } from "framer-motion";

interface TechStackProps {
  technologies?: string[];
  title?: string;
}

/**
 * TechStack component for displaying the technologies used in a project.
 * @param {Object} props - The component props.
 * @param {string[]} [props.technologies=[]] - Array of technology names.
 * @param {string} [props.title="Tech Stack"] - The title for the tech stack section.
 */
export default function TechStack({ technologies = [], title = "Tech Stack" }: TechStackProps) {
  if (technologies.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-glass backdrop-blur-sm border border-glass-border rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {technologies.map((tech, index) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-text-secondary rounded-full text-sm font-medium transition-colors duration-200"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
