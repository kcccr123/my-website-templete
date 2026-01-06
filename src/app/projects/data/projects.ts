// Component configuration types
export type ComponentType = 
  | 'tech-stack'
  | 'features'
  | 'demo-link'
  | 'image'
  | 'video'
  | 'wasm'
  | 'wasm-iframe'
  | 'screenshots'
  | 'text-section';

export interface ComponentConfig {
  type: ComponentType;
  props?: Record<string, any>;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  link?: string;
  components?: ComponentConfig[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "A modern portfolio built with Next.js, TypeScript, and Framer Motion featuring smooth animations and responsive design.",
    image: "",
    githubUrl: "https://github.com/yourusername/portfolio",
    components: [
      {
        type: 'tech-stack',
        props: { 
          technologies: ['Next.js 15', 'TypeScript', 'Framer Motion', 'Tailwind CSS v4'],
          title: 'Tech Stack'
        }
      },
      {
        type: 'image',
        props: {
          src: '/images/portfolio-screenshot.png',
          alt: 'Portfolio website screenshot',
          caption: 'Homepage with smooth animations and dark theme',
          width: 1200,
          height: 675
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Responsive design across all devices',
            'Smooth page transitions with Framer Motion',
            'Dark theme with glass morphism effects',
            'SEO optimized with Next.js metadata',
            'Dynamic project routing system'
          ]
        }
      },
      {
        type: 'video',
        props: {
          src: '/videos/demo.mp4',
          poster: '/images/video-poster.png',
          caption: 'Interactive demo showcasing animations',
          autoplay: false,
          loop: true,
          muted: true
        }
      },
      {
        type: 'demo-link',
        props: {
          url: 'https://yourportfolio.com',
          text: 'View Live Demo'
        }
      }
    ]
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    image: "",
    githubUrl: "https://github.com/yourusername/ecommerce",
    components: [
      {
        type: 'tech-stack',
        props: { 
          technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Redux'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Core Features',
          items: [
            'Secure payment processing with Stripe',
            'Real-time inventory management',
            'Admin dashboard with analytics',
            'Order tracking and notifications',
            'Customer review system'
          ]
        }
      }
    ]
  },
  {
    id: 3,
    slug: "task-management-app",
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates, drag-and-drop interface, and team workspace features.",
    image: "",
    components: [
      {
        type: 'tech-stack',
        props: { 
          technologies: ['React', 'Firebase', 'Material-UI', 'React DnD'],
          title: 'Built With'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Features',
          items: [
            'Drag-and-drop task organization',
            'Real-time collaboration',
            'Team workspaces',
            'Task priority and deadline management'
          ]
        }
      }
    ]
  },
  {
    id: 4,
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description: "Interactive weather application with forecasts, maps, and historical data visualization using various APIs.",
    image: "",
    githubUrl: "https://github.com/yourusername/weather-dashboard",
  },
  {
    id: 5,
    slug: "social-media-analytics",
    title: "Social Media Analytics",
    description: "Analytics platform for tracking social media performance with detailed insights and reporting tools.",
    image: "",
  },
  {
    id: 6,
    slug: "ai-chat-assistant",
    title: "AI Chat Assistant",
    description: "Intelligent chatbot powered by machine learning with natural language processing and context awareness.",
    image: "",
    githubUrl: "https://github.com/yourusername/ai-assistant",
  },
  {
    id: 7,
    slug: "mycraft",
    title: "MyCraft - Voxel Game Engine",
    description: "A 3D voxel-based game engine built with C++ and OpenGL, compiled to WebAssembly for browser-based gameplay. Features procedural terrain generation, dynamic lighting, and real-time block manipulation.",
    image: "",
    githubUrl: "https://github.com/yourusername/myCraft",
    components: [
      {
        type: 'wasm',
        props: {
          jsUrl: '/wasm/MyCraft/mycraft.js',
          wasmUrl: '/wasm/MyCraft/mycraft.wasm',
          dataUrl: '/wasm/MyCraft/mycraft.data',
          title: 'Interactive Demo',
          caption: 'Click to focus. Use WASD to move, mouse to look around, click to break blocks, right-click to place blocks. Press ESC for options.',
          width: 1200,
          height: 800,
          canvasId: 'mycraft-canvas'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['C++', 'OpenGL ES 3.0', 'GLFW', 'GLM', 'Emscripten', 'WebAssembly', 'ImGui'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Procedural terrain generation with Perlin noise',
            'Chunk-based world streaming and LOD system',
            'Real-time lighting with directional and point lights',
            'Physics-based player movement and collision detection',
            'Block placement and destruction mechanics',
            'Frustum culling for optimized rendering',
            'Cross-platform: Native desktop and WebAssembly',
            'ImGui-based debug UI and controls'
          ]
        }
      }
    ]
  },
  {
    id: 8,
    slug: "mycraft-iframe",
    title: "MyCraft - IFrame Version",
    description: "A 3D voxel-based game engine using the iframe-based WebAssembly loader. This version properly reloads on navigation.",
    image: "",
    githubUrl: "https://github.com/yourusername/myCraft",
    components: [
      {
        type: 'wasm-iframe',
        props: {
          embedUrl: '/wasm/MyCraft/mycraft-embed.html',
          title: 'Interactive Demo (IFrame)',
          caption: 'Click to focus. Use WASD to move, mouse to look around, click to break blocks, right-click to place blocks. Press ESC for options.',
          width: 1200,
          height: 800
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['C++', 'OpenGL ES 3.0', 'GLFW', 'GLM', 'Emscripten', 'WebAssembly', 'ImGui'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Procedural terrain generation with Perlin noise',
            'Chunk-based world streaming and LOD system',
            'Real-time lighting with directional and point lights',
            'Physics-based player movement and collision detection',
            'Block placement and destruction mechanics',
            'Frustum culling for optimized rendering',
            'Cross-platform: Native desktop and WebAssembly',
            'ImGui-based debug UI and controls'
          ]
        }
      }
    ]
  },
];
