"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

interface DemoLinkProps {
  url?: string;
  text?: string;
}

/**
 * DemoLink component for displaying a link to a live demo.
 * @param {Object} props - The component props.
 * @param {string} [props.url] - The URL for the demo link.
 * @param {string} [props.text="View Live Demo"] - The text to display for the link.
 */
export default function DemoLink({ url, text = "View Live Demo" }: DemoLinkProps) {
  if (!url) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-glass-border hover:border-glass-border-hover rounded-lg transition-all duration-200 group"
      >
        <span className="text-lg font-medium">{text}</span>
        <FaExternalLinkAlt className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
      </a>
    </motion.div>
  );
}
