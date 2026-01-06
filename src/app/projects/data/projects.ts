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
  | 'markdown'
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
    slug: "mycraft",
    title: "MyCraft",
    description: "A 3D voxel-based game engine built from scratch with C++ and OpenGL, compiled to WebAssembly for browser-based gameplay. Features procedural terrain generation, dynamic lighting, basic physics, and basic mechanics such as breaking and placing blocks.",
    image: "",
    githubUrl: "https://github.com/kcccr123/myCraft",
    components: [
      {
        type: 'wasm-iframe',
        props: {
          embedUrl: '/wasm/MyCraft/mycraft-embed.html',
          title: 'MyCraft',
          caption: 'Click to focus. Use WASD to move, mouse to look around, click to break blocks, right-click to place blocks. Press ESC for options.',
          width: 1200,
          height: 800
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['C++', 'OpenGL', 'GLFW', 'GLM', 'Emscripten', 'WebAssembly', 'ImGui'],
          title: 'Technology'
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
            'ImGui-based debug UI and controls'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          content: `# MyCraft Game Engine

This is a 3D voxel-based game engine built from scratch using C++ and OpenGL. The engine features:

- **Procedural World Generation**: Uses Perlin noise to create infinite, varied landscapes
- **Real-time Rendering**: Optimized OpenGL pipeline with frustum culling and LOD
- **Physics Simulation**: Basic collision detection and player movement
- **WebAssembly Support**: Compiles to WebAssembly for browser-based gameplay

## Technical Implementation

The core engine is written in C++ with the following architecture:

- **Rendering Pipeline**: Custom OpenGL shader system with vertex/fragment shaders
- **World Management**: Chunk-based streaming system for large worlds
- **Input Handling**: GLFW for cross-platform input management
- **Math Library**: GLM for vector/matrix operations

## Getting Started

To run the game:
1. Use WASD keys for movement
2. Mouse to look around
3. Left-click to break blocks
4. Right-click to place blocks
5. Press ESC for options menu

Enjoy exploring the voxel world!`,
          title: 'About MyCraft'
        }
      }
    ]
  },
  {
    id: 2,
    slug: "receipt-scanner",
    title: "Receipt Scanner Mobile App",
    description: "A mobile app that lets users quickly store receipts with a photo and tracks spending for better budgeting.",
    image: "",
    githubUrl: "https://github.com/kcccr123/receipt-scanner",
    components: [
      {
        type: 'tech-stack',
        props: {
          technologies: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'NodeJS', 'Gunicorn', 'Flask', 'Kubernetes', 'Docker', 'Google Cloud', 'Python', 'PyTorch', 'OpenCV'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Organize receipts into groups for easy tracking and management',
            'Upload existing images or take photos with built-in camera',
            'Machine learning-powered receipt processing with YOLOv8, RCNN, and BART models',
            'Alternative GPT-4o pipeline for receipt inference',
            'Deployed on Google Kubernetes Engine for scalable processing',
            'Local storage with SQLite for offline access'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          content: `# About The Project

This React Native project simplifies receipt storage and spending tracking for users. It uses machine learning to detect and process receipts from images, combining a custom-trained YOLOv8 model, BART, and a custom RCNN.

The machine learning models are deployed on a Google Kubernetes Engine (GKE) cluster within Google Cloud Platform (GCP). The server is configured to receive images from the app, process the data, and return inference results to be displayed.

## Usage

Users can organize receipts into groups, making it easy to track and manage expenses over time. Each group is associated with a specific date and can contain multiple receipts, allowing for clear categorization and streamlined access to past records.

Once a group is created, users can easily add receipts by either uploading an existing image or taking a photo using the built-in camera. The image will be sent to our server, analyzed by our machine learning pipeline, and its key data—such as vendor, date, and total amount—will be extracted and organized for easy tracking and review.

![Receipt Scanner Interface 1](/reciept-scanner/image1.png)

![Receipt Scanner Interface 2](/reciept-scanner/image2.png)

## Receipt Processing

The app employs two distinct technology pipelines for receipt inference: one developed and trained in-house and another powered by OpenAI's GPT-4o.

You can find the backend + machine learning utilities in this repo: [reciept-scanner-backend](https://github.com/example/repo)

### In-House Pipeline

The in-house pipeline processes image requests through a sequence of three models: YOLOv8 for object detection, RCNN for reading text, and BART for correction and restructuring.

#### YOLOv8

YOLOv8, a robust open-source AI framework for computer vision, was leveraged to extract bounding boxes for items, totals, and subtotals from processed receipt images. The bounding boxes are then passed to subsequent models for further analysis.

The model was trained from scratch using a dataset of over 400 receipts, preprocessed into grayscale and perspective-corrected images. Data augmentation techniques expanded the dataset to nearly 1,200 images.

#### RCNN

A custom RCNN model is designed and trained to perform optical character recognition (OCR) on the bounding boxes passed by the YOLOv8 model.

**Model Architecture**

The model integrates convolutional layers for spatial feature extraction and LSTM layers for sequence modeling. Its architecture includes:

- 9 Convolutional Residual Blocks to progressively extract and refine features from the input image.
- 2 Bidirectional LSTM Layers to better capture the dependencies in both forward and backward directions.
- Final fully connected layers to map the LSTM outputs to a set of character probabilities.

**Dataset**

Trained on a dataset of approximately 42,000 images containing 1-3 words, prices, or special characters found on receipts.

**Data Preprocessing & Augmentation**

Since color does not matter, the images are preprocessed into greyscale images by OpenCV then resized to 224×36 while maintaining aspect ratio.

Data Augmentation methods such as sharpening, eroding and dilating are applied at random to enhance model generalization.

**Training**

Training process utilizes CTC loss, a decaying learning rate, as well as character error rate and word error rate as metrics.

**Result**

Inference model reached a character accuracy of 96% and a word accuracy of 88% during testing.

#### BART

We utilize a pre-trained BART model developed by Meta, fine-tuned specifically for our task. This model is used for sentence reconstruction, grammar correction, and the identification of key values, ensuring accurate processing and correction of text data before the results are packaged in a JSON object and sent in the POST response back to the client.

### GPT-4o Pipeline

The GPT-4o pipeline is simpler, relying solely on GPT-4o to make inferences. When the app sends a request to the server, the server calls the OpenAI API and uses GPT-4o to extract items from the provided image and identify key attributes. Once the API returns a JSON object, the server processes it and sends the response back to the app for display and usage.`,
          title: 'Project Details'
        }
      }
    ]
  },
  {
    id: 3,
    slug: "figure-aggregator",
    title: "Figure Aggregator",
    description: "A Shopify-style online store for toys and models with automated data aggregation.",
    image: "",
    link: "https://figure-center.netlify.app/",
    githubUrl: "https://github.com/kcccr123/figure-aggregator",
    components: [
      {
        type: 'demo-link',
        props: {
          url: 'https://figure-center.netlify.app/',
          text: 'View Live Demo'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MySQL', 'Kubernetes', 'Docker', 'Google Cloud'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Unified storefront for multiple collectible figure retailers',
            'Browsing, filtering, and search functionality',
            'Featured items displayed on homepage',
            'Automated data aggregation with Puppeteer scraper',
            'Deployed on Google Kubernetes Engine with Cloud SQL'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          content: `# Figure Aggregator

Figure Aggregator is a personal learning project that unifies multiple collectible figure retailers into a single storefront. It provides basic quality-of-life features such as browsing, filters, and search functionality, allowing users to easily view products from a variety of stores in one location. Featured items from these stores are also displayed on the homepage.

## Frontend

The frontend is built with React.js, and products are dynamically displayed via Axios calls to the API. It is currently deployed on Netlify.

## Backend

The backend architecture runs on Google Cloud Platform, specifically on Google Kubernetes Engine.

We provision a global static IP and attach it to an HTTPS Load Balancer, which is configured by GKE's Ingress Controller. Incoming requests hit the Load Balancer, which applies host- and path-based rules to forward traffic to a Service (backed by NEGs/NodePorts) inside the cluster.

That Service routes API calls to Docker-containerized Express.js pods running on GKE. Each pod includes a Cloud SQL Proxy sidecar to maintain the connection to a MySQL (Cloud SQL) instance, allowing the backend to scale up or down without any changes to the database configuration.

A Puppeteer-based scraper runs as a Kubernetes CronJob in GKE, automatically collecting and updating product data in the Cloud SQL database.`,
          title: 'About Figure Aggregator'
        }
      }
    ]
  },
  {
    id: 4,
    slug: "stud-io",
    title: "Stud.io",
    description: "An intelligent flashcard generation app that uses AI and reinforcement learning to create personalized study materials from lecture notes, adapting to each student's learning needs.",
    image: "",
    link: "https://devpost.com/software/stud-io",
    githubUrl: "https://github.com/kcccr123/stud-io-nsbehacks-2025",
    components: [
      {
        type: 'demo-link',
        props: {
          url: "https://www.youtube.com/watch?v=-O3PqlDuvXU",
          text: "View Demo Video"
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['Next.js', 'React', 'Node.js', 'Python', 'Flask', 'OpenAI', 'MongoDB'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'AI-powered flashcard generation from lecture notes',
            'Reinforcement learning (Q-learning) for personalized learning',
            'Vector search for rapid retrieval of similar questions',
            'Multiple question types: multiple choice, fill in the blanks',
            'Study Mode focusing on weak areas',
            'Review Mode for general concept building',
            'Real-time performance tracking and notifications'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          content: `# Stud.io - NSBEUOFT Hacks 2025 Winner

## Inspiration
The inspiration behind *Stud.io* came from the challenges students face when preparing for exams. We wanted to create a tool that not only generates flashcards from lecture notes but also adapts to each student's learning needs using AI and machine learning (reinforcement learning). We aimed to blend the convenience of automated flashcard creation with personalized learning insights to help students study smarter.

## What it does
Stud.io is an intelligent flashcard generation app designed to help students enhance their learning by transforming lecture notes, and other study materials into interactive questions. The app leverages Q-learning, a model-free reinforcement learning technique, to track student performance, identifying areas of difficulty and prioritizing those topics for future study sessions. Students can specify what interactive questions they want - multiple choice, fill in the blanks, and more!

Flashcards are vectorized and stored in a vector database, enabling rapid retrieval of similar questions through vector search using cosine similarity. This ensures that students are consistently tested on concepts they struggle with, reinforcing their understanding and closing knowledge gaps over time.

Stud.io integrates large language models (LLMs) to generate high-quality flashcards from study materials and evaluate student responses, providing instant feedback and personalized insights. The app offers two distinct modes: Study Mode, where students are presented with questions they have answered least accurately to focus on weak areas, and Review Mode, which helps students build a solid understanding of general concepts.

With continuous question generation from LLMs and real-time performance tracking through Q-learning, Stud.io ensures a dynamic and tailored learning experience. The app also notifies students when their performance in specific topics needs improvement, encouraging consistent study habits and ultimately leading to better academic outcomes.

The app has a minimum threshold that students must perform on in general topics they're being tested on. If the reinforcement learning model indicates that a student is performing very poorly in a certain subject, the app will notify them and prioritize flashcards on the student's weakest topics.

## How we built it
We built *Stud.io* using Next.js for the frontend and Flask for the backend. MongoDB Atlas serves as our database, where we store user performance data, flashcards, and vector embeddings. Reinforcement learning with Q-tables tracks user performance, while vector search helps retrieve similar flashcards. LLMs like GPT-4-turbo handle flashcard generation and evaluation of answers from input materials and test questions, respectively.

## Challenges we ran into
One major challenge was integrating reinforcement learning with a scalable backend. Ensuring that user performance data is updated dynamically without slowing down the app was tricky. Implementing vector search was another hurdle, as we had to register the vector index in MongoDB Atlas and had to create the embeddings to search through with OpenAI. Additionally, working with LLM APIs introduced latency challenges that we had to optimize.

## Accomplishments that we're proud of
We're proud of creating a seamless user experience where students can upload their lecture notes and instantly get personalized flashcards. Successfully integrating reinforcement learning and vector search into an educational tool is a significant accomplishment. Our app's ability to adapt to each user's needs and continuously generate new study materials is something we take pride in.

## What we learned
We learned a lot about reinforcement learning and its practical applications in education. Handling large datasets with vector search taught us how to optimize database queries for performance. Integrating LLMs into a dynamic app also provided valuable insights into prompt engineering and API management.

## What's next for Stud.io
Next, we plan to enhance *Stud.io* by adding more support for different input formats like handwritten notes and images. We aim to refine our reinforcement learning algorithms for even better personalization. Adding social features like study groups and collaborative flashcard creation is also on our roadmap. Ultimately, we envision *Stud.io* becoming a comprehensive study companion for students worldwide.`,
          title: 'About Stud.io'
        }
      }
    ]
  }
];
