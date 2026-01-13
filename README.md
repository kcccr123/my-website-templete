<!-- PROJECT LOGO
<br />
<div align="center">
  <a href="https://github.com/kcccr123/my-website-templete">
    <img src="public/globe.svg" alt="Logo" width="80" height="80">
  </a>
</div>
-->

<div id="readme-top"></div>

<h3 align="center">Personal Portfolio Website</h3>

  <p align="center">
    A data-driven Next.js portfolio with modular project pages, animated sections, and markdown-based writeups.
   <br />
  </p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#installation">Installation</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li>
     <a href="#usage">Usage</a>
      <ul>
        <li><a href="#local-development">Local Development</a></li>
        <li><a href="#projects-data">Projects Data</a></li>
        <li><a href="#experience-timeline">Experience Timeline</a></li>
        <li><a href="#markdown--assets">Markdown & Assets</a></li>
      </ul></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This repository contains the source for my personal website and portfolio. The site is built with the Next.js App Router and keeps content in TypeScript data files for projects and experience entries, while project detail pages are composed from modular blocks (tech stack, features, media, markdown, and more). The homepage includes animated sections and live GitHub contributions/activity widgets.

### Built With

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/framer--motion-111111?style=for-the-badge&logo=framer&logoColor=white)
![React Markdown](https://img.shields.io/badge/react--markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)
![KaTeX](https://img.shields.io/badge/katex-3B82F6?style=for-the-badge&logo=katex&logoColor=white)

<!-- INSTALLATION -->

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Prerequisites

Please ensure you have [Node.js](https://nodejs.org/) 18 or higher installed (LTS recommended). Any npm-compatible package manager (npm, pnpm, yarn, or bun) will work.

<!-- USAGE -->

## Usage

### Local Development

Run the dev server:

```bash
npm run dev
```

Build and serve production output:

```bash
npm run build
npm run start
```

### Projects Data

Project cards and detail pages are driven by `src/app/projects/data/projects.ts`. Each object in the exported array maps to one project and feeds both the grid cards (`/projects`) and the detail page (`/projects/[slug]`).

How a project entry is used:
- The card uses `title`, `description`, and `image`. If `image` is empty, the card falls back to a text-only placeholder.
- The card also pulls the `tech-stack` component (if present) to render the technology chips.
- The detail page uses `slug` for routing, `links` for the external buttons, and renders the `components` array top-to-bottom.

Key fields to fill in:
- `id`: unique number (used as React key)
- `slug`: URL slug under `/projects/`
- `title`: card and page heading
- `description`: short summary for the card and intro panel
- `image`: path under `public/` for the card hero image
- `links`: optional buttons shown under the title (e.g., GitHub, demo)
- `components`: ordered blocks that make up the detail page

Supported component types (see existing examples for exact props):
- `tech-stack` (expects a `technologies` array)
- `features` (expects an `items` array)
- `demo-link`
- `image`
- `video`
- `wasm` / `wasm-iframe`
- `markdown` (supports `content` or `filePath`)

Example from this repo (trimmed for brevity):

```ts
{
  id: 1,
  slug: "ue-reinforcement-learning",
  title: "UE Reinforcement Learning",
  description:
    "A UE5 plugin and Python toolkit for training and running reinforcement learning agents inside Unreal projects.",
  image: "/ue-reinforcement/reinforcement.png",
  links: [
    {
      label: "View on GitHub",
      url: "https://github.com/kcccr123/ue-reinforcement-learning"
    }
  ],
  components: [
    {
      type: "demo-link",
      props: {
        url: "https://www.youtube.com/watch?v=M2tfriFZwVQ",
        text: "Watch Overview Video"
      }
    },
    {
      type: "tech-stack",
      props: {
        technologies: [
          "Unreal Engine 5",
          "C++",
          "Python",
          "ONNX Runtime",
          "Gymnasium",
          "Stable-Baselines3"
        ],
        title: "Technology Stack"
      }
    },
    {
      type: "features",
      props: {
        title: "Key Features",
        items: [
          "Unreal Engine plugin with Blueprint-callable training and inference bridges",
          "Single and multi-environment support for reinforcement learning loops",
          "Python training module built on Gymnasium and Stable-Baselines3",
          "ONNX Runtime integration for running models inside the engine"
        ]
      }
    },
    {
      type: "markdown",
      props: {
        title: "About UE Reinforcement Learning",
        content:
          "# UE Reinforcement Learning\n\n## Why\n\nI wanted a streamlined way to train and run reinforcement learning agents inside Unreal Engine while keeping the workflow accessible to both C++ developers and Blueprint users."
      }
    }
  ]
}
```

### Experience Timeline

Experience entries live in `src/app/experiences/data/experiences.ts` and are rendered by the timeline on `/experiences`.

How an entry is used:
- Each entry becomes one timeline card with a hover/expand detail panel.
- Dates control placement on the timeline; more recent roles appear first.
- `start` and `end` should be in `Mon YYYY` format (e.g., `Sep 2025`). Use `Present` for ongoing roles.

Key fields to fill in:
- `id`: unique string
- `role`: displayed as the role title
- `company`: primary label on the card
- `logoUrl`: optional logo image under `public/experience-logos`
- `location`: shown in the detail panel
- `start` / `end`: timeline placement
- `summary`: short paragraph under the role
- `highlights`: bullet list of accomplishments
- `tags`: small chips for skills/tech
- `link`: optional URL to make the company name clickable
- `forceParallel`: optional boolean to force a role to sit in its own lane

Example from this repo:

```ts
{
  id: "exp-01",
  role: "Backend Software Engineer",
  company: "Tesla",
  logoUrl: "/experience-logos/tesla_motors_logo.jpg",
  location: "Austin, Texas, United States",
  start: "Sep 2025",
  end: "Dec 2025",
  summary: "Cell Software",
  highlights: [
    "Built Escalation Service, a Go fault-response system for cell production lines that routes machine errors and anomalies to service teams and issues containment commands.",
    "Engineered real-time, distributed ingestion of cell production-line telemetry by replacing legacy connectors with Go/Kafka/Kubernetes pipelines for high-throughput analytics and controls feedback.",
    "Designed a RAG-powered AI agent that generates standardized Grafana dashboards and SQL queries, enabling self-serve analytics across the org.",
    "Developed and deployed Signal Explorer, a gRPC API and web app that catalogs PLC signals so users and services can discover data needed for production queries.",
    "Drove the datastore migration from Flux to ClickHouse, improving query speed and enabling real-time shop-floor analytics."
  ],
  tags: ["Backend", "Go", "Kafka", "Kubernetes", "gRPC", "ClickHouse", "Grafana", "SQL"]
}
```

### Markdown & Assets

Markdown blocks can use inline `content` or a `filePath` to a `.md` file under `public/`. Math is supported via KaTeX. Place images, videos, and other static assets under `public/` and reference them with absolute paths like `/mycraft/Mycraft.png`.

<!-- CONTACT -->

## Contact

Feel free to contact me at:

Kevin Chen - kevinz.chen@mail.utoronto.ca

<p align="right">(<a href="#readme-top">back to top</a>)</p>
