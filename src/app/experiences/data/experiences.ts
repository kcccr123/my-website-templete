export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  forceParallel?: boolean;
  logoUrl?: string;
  location?: string;
  start: string;
  end?: string;
  summary?: string;
  highlights?: string[];
  link?: string;
  tags?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "exp-01",
    role: "Backend Software Engineer",
    company: "Tesla",
    logoUrl: "/experience-logos/tesla_motors_logo.jpg",
    location: "Austin, Texas, United States (On-site)",
    start: "Sep 2025",
    end: "Dec 2025",
    summary: "Cell Software.",
    highlights: [],
    tags: ["Backend", "Internship"]
  },
  {
    id: "exp-02",
    role: "Frontend Engineer",
    company: "Department of Computer Science, University of Toronto",
    forceParallel: true,
    logoUrl: "/experience-logos/uoftcompsci_logo.jpg",
    location: "Toronto, Ontario, Canada",
    start: "Apr 2025",
    end: "Present",
    summary:
      "Building MemoryLab, a web app that integrates MemoryViz, PythonTA, and MarkUs to help University of Toronto students learn the Python memory model.",
    highlights: [],
    tags: ["Web App", "Education"]
  },
  {
    id: "exp-03",
    role: "Software Developer",
    company: "Geotab",
    logoUrl: "/experience-logos/geotab_logo.jpg",
    location: "Toronto, Ontario, Canada (Hybrid)",
    start: "May 2024",
    end: "Dec 2024",
    summary:
      "Data Platform Team.",
    highlights: [
      "Developed web portals for the Data Platform Management Console (DPMC) to centralize internal developer tools using React/TypeScript and REST APIs.",
      "Integrated Airflow and Superset for scheduled query caching, reducing query wait times and improving dashboard responsiveness.",
      "Automated testing and deployments with Terraform and GitLab CI to reduce manual steps and prevent config drift.",
      "Managed GCP workloads with Kubernetes/Docker/Helm for DPMC apps, ensuring reliable, scalable releases."
    ],
    tags: ["React", "TypeScript", "GCP"]
  },
  {
    id: "exp-04",
    role: "Full Stack Developer",
    company: "Kelsen Legal Technologies",
    logoUrl: "/experience-logos/kelsen_legal_tech_logo.jpg",
    location: "Toronto, Ontario, Canada (Remote)",
    start: "Apr 2023",
    end: "Sep 2023",
    summary: "Internship.",
    highlights: [
      "Supported the development of AI chat in Kelsen’s legal editor for drafting help and predictive text.",
      "Built UIs and APIs for user document management with React, TypeScript, and Express.",
      "Delivered a framework for multilingual support for consistent UX across regions."
    ],
    tags: ["Full Stack", "AI", "React"]
  }
];
