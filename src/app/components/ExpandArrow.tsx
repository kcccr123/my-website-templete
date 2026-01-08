"use client";

import { motion } from "framer-motion";

interface ExpandArrowProps {
  isOpen: boolean;
  size?: number;
  className?: string;
}

export default function ExpandArrow({ isOpen, size = 20, className = "" }: ExpandArrowProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
