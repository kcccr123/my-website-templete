"use client";

import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

interface FeaturesProps {
  items?: string[];
  title?: string;
}

/**
 * Features component for displaying a list of project features.
 * @param {Object} props - The component props.
 * @param {string[]} [props.items=[]] - Array of feature descriptions.
 * @param {string} [props.title="Features"] - The title for the features section.
 */
export default function Features({ items = [], title = "Features" }: FeaturesProps) {
  if (items.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-glass backdrop-blur-sm border border-glass-border rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-start gap-3 text-text-secondary"
          >
            <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
