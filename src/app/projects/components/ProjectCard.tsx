"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * ProjectCard component for displaying a project preview card.
 * @param {Object} props - The component props.
 * @param {Project} props.project - The project data to display.
 * @param {number} props.index - The index of the card for animation delay.
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const techStack = project.components?.find((component) => component.type === "tech-stack");
  const technologies = Array.isArray(techStack?.props?.technologies)
    ? (techStack?.props?.technologies as string[])
    : [];

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1, ease: "easeInOut" }}
        className="group relative overflow-hidden rounded-lg bg-glass backdrop-blur-sm border border-glass-border hover:border-glass-border-hover transition-all duration-300"
        whileHover={{ scale: 1.02, transition: { duration: 0.15, ease: "easeOut" } }}
        whileTap={{ scale: 0.98, transition: { duration: 0.08, ease: "easeOut" } }}
      >
        <div className="relative h-48 w-full overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-glass flex items-center justify-center">
              <div className="text-text-muted text-sm font-medium">
                {project.title}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-text-muted text-sm leading-relaxed">{project.description}</p>
          {technologies.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] font-medium text-text-muted transition-colors duration-200 group-hover:text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
