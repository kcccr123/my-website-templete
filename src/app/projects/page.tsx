"use client";

import { useEffect, useMemo, useState } from "react";
import PageTransition from "../components/PageTransition";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./data/projects";

type ProjectEntry = { project: (typeof projects)[number]; index: number };

/**
 * Projects page component for displaying a grid of project cards.
 */
export default function Projects() {
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setColumnCount(3);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const projectColumns = useMemo(() => {
    const columns = Array.from({ length: columnCount }, () => [] as ProjectEntry[]);
    projects.forEach((project, index) => {
      columns[index % columnCount].push({ project, index });
    });
    return columns;
  }, [columnCount]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-black font-sans pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
            <p className="mt-3 text-[clamp(1rem,1.6vw,1.2rem)] text-[var(--color-text-secondary)]">
              Showcasing projects and stuff I've built.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectColumns.map((column, columnIndex) => (
              <div key={`project-column-${columnIndex}`} className="flex flex-col gap-6">
                {column.map(({ project, index }) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
