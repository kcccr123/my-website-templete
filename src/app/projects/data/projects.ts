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

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  links?: ProjectLink[];
  components?: ComponentConfig[];
}

export const projects: Project[] = [
  {
    id: 9,
    slug: "personal-website-template",
    title: "Personal Website Template",
    description: "A reusable portfolio website template with data-driven projects and experiences that I actively use myself, built so anyone can clone it and update content with modular components.",
    image: "",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/website"
      }
    ],
    components: [
      {
        type: 'tech-stack',
        props: {
          technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Projects and experiences driven by simple data files',
            'Modular component blocks for project detail pages',
            'Timeline-based experience layout with expandable details',
            'Markdown-based writeups for long-form content',
            'Responsive layout with reusable UI components'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About This Template',
          content: `# Personal Website Template

## Why

I wanted a personal website to display personal projects and give people a quick overview of what I've done and do. Alot of my projects, such as MyCraft, were hard to really show off without having the viewer acutally download the executable. 
With this personal website I can deploy the game in browser, allowing anyone access to try it out instantly.

---

## What It Includes

- Projects and experiences pages driven by simple data files
- Modular component blocks (tech stack, features, media, markdown) with flexible props for layout, labels, and embeds
- Timeline-style experience layout with expandable detail cards
- Page transitions and card animations
- Responsive layout with reusable UI components

---

## How to Use

Clone the repo, update the projects and experiences data, and drop your assets into public. Add or reorder detail sections by composing modular components in the project data. The layout updates automatically.

---

## What I Learned

I learned how to keep content and layout separate in a Next.js app and how a modular component system makes content updates fast and safe.`
        }
      }
    ]
  },
  {
    id: 10,
    slug: "memorylab",
    title: "MemoryLab",
    description: "A drag-and-drop web app for teaching Python memory models with guided practice, free-form testing, and automatic grading.",
    image: "",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/jcal13/memory-model-editor"
      }
    ],
    components: [
      {
        type: 'tech-stack',
        props: {
          technologies: ['TypeScript', 'Node.js', 'PostgreSQL'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Scratch-style canvas for building memory diagrams with frames, objects, and values',
            'Practice mode with structured guidance vs test mode for independent checks',
            'Question bank of exercises drawn from UofT course material',
            'Automatic grading with traceable feedback using graph isomorphism',
            'Exports to JSON, SVG, and PNG for reuse and sharing'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About MemoryLab',
          content: `# MemoryLab

## Why

During my first years at UofT, one of the most annoying parts was drawing memory model diagrams by hand. I wanted an app that makes it easy to practice them with a drag-and-drop canvas that feels closer to how people reason about frames, objects, and values.

---

## Interesting Technical Points

- Scratch-style canvas with frames, objects, and values as moveable blocks
- Practice vs test modes for guided learning or self-checking
- Question bank that feeds structured exercises into the canvas
- Multi-format export so models can be reused as JSON or shared as SVG/PNG

---

## Validation Algorithm (The Fun Part)

Automatic grading treats each memory model as a graph. Boxes are nodes, references are edges, and the goal is to find one clean bijection between a student submission and the expected answer.

The validator walks frames, compares variables, and recursively matches IDs while enforcing a one-to-one mapping. It validates exact types, checks primitive values directly, and uses a visited map to avoid infinite loops on circular references. Arrays are matched in order, while sets and objects do tentative matching to find a consistent mapping. At the end it verifies call stack order and flags any orphaned boxes that were never reached.

---

## What I Learned

I learned how to make grading feel fair and explainable by turning a visual diagram into a strict graph comparison with meaningful error messages.`
        }
      }
    ]
  },
  {
    id: 1,
    slug: "ue-reinforcement-learning",
    title: "UE Reinforcement Learning",
    description: "A UE5 plugin and Python toolkit for training and running reinforcement learning agents inside Unreal projects.",
    image: "/ue-reinforcement/reinforcement.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/ue-reinforcement-learning"
      }
    ],
    components: [
      {
        type: 'demo-link',
        props: {
          url: 'https://www.youtube.com/watch?v=M2tfriFZwVQ',
          text: 'Watch Overview Video'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['Unreal Engine 5', 'C++', 'Python', 'ONNX Runtime', 'Gymnasium', 'Stable-Baselines3'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Unreal Engine plugin with Blueprint-callable training and inference bridges',
            'Single and multi-environment support for reinforcement learning loops',
            'Python training module built on Gymnasium and Stable-Baselines3',
            'ONNX Runtime integration for running models inside the engine'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About UE Reinforcement Learning',
          content: `# UE Reinforcement Learning

## Why

I wanted a streamlined way to train and run reinforcement learning agents inside Unreal Engine while keeping the workflow accessible to both C++ developers and Blueprint users.

## Interesting Technical Points

- Unreal Engine plugin with Blueprint-callable bridge classes for training and inference
- TCP handshake between Unreal and a Python module to exchange observation and action sizes
- Gymnasium wrappers and a Stable-Baselines3 training script with vectorized env support
- ONNX Runtime inference interface for running exported models locally

## What I Learned

I learned how to design a clean UE plugin API, keep a Python training loop synchronized with an engine simulation, and ship an inference path that works in real time.`
        }
      }
    ]
  },
  {
    id: 2,
    slug: "mycraft",
    title: "MyCraft",
    description: "A 3D voxel-based game engine built from scratch with C++ and OpenGL, compiled to WebAssembly for browser-based gameplay. Features procedural terrain generation, dynamic lighting, basic physics, and basic mechanics such as breaking and placing blocks.",
    image: "/mycraft/Mycraft.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/myCraft"
      }
    ],
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

## Why

This is an ongoing personal learning project to understand GPU APIs like OpenGL by building a Minecraft-style voxel sandbox and shipping something playable.

---

## Interesting Technical Points

### Terrain Generation

Terrain generation is refreshingly straightforward: for each chunk, the system samples a 2D simplex noise function across the X-Z plane and uses the result as a height value. Simplex noise produces smooth, continuous random values, perfect for creating natural-looking landscapes without precomputation.

##### **The Simplex Noise Function**

The core terrain generation happens in \`Map::genHeightMap()\`, which runs when a chunk is created:

\`\`\`cpp
GLfloat heightV = glm::simplex(glm::vec2{ 
    (x + (Constants::CHUNK_SIZE * xCord)) / 64.0f, 
    (y + (Constants::CHUNK_SIZE * yCord)) / 64.0f 
});
heightV += 1;      // Shift range from [-1, 1] to [0, 2]
heightV /= 2;      // Normalize to [0, 1]
heightV *= 16;     // Scale to [0, 16] block heights
\`\`\`

The division by 64.0 controls the **frequency** of the noise. This is the scaling factor. Smaller values (like 32) create more variation and rugged terrain, while larger values (like 128) create gentle rolling hills. The current value of 64 is a middle ground that produces interesting, explorable landscapes.

The algorithm:
1. Sample \`glm::simplex()\` at the world coordinates scaled by frequency
2. The function returns values in the range [-1, 1]
3. Shift and scale to [0, 16], giving us integer heights in blocks
4. Fill all blocks up to that height with stone (ID 1)

This means each horizontal position in the world has a deterministic height. Because simplex noise is continuous, adjacent positions produce similar heights, creating smooth terrain rather than random spikes.


---

### Culling/Mesh Generation/Optimizations

Rendering a voxel world naively would bring any GPU to its knees. Imagine trying to draw every face of every block in a world. Even a modest view distance would mean millions of triangles per frame. The solution lies in a combination of smart data structures and aggressive culling techniques that together turn an impossible rendering problem into something that runs smoothly even in a browser.

##### **The Chunk System: Dividing and Conquering**

The world is divided into **chunks** (cubes of 32x32x32 blocks each). This might seem arbitrary, but it's a sweet spot: large enough that we're not managing thousands of tiny regions, but small enough that we can load and unload them quickly as the player moves around.

The engine maintains a **3x3 chunk grid** (9 chunks total) centered on the player. As you walk forward, the chunks behind you unload, and new chunks ahead generate and load in. This creates the illusion of an infinite world while keeping memory usage constant. Each chunk tracks its position (posX, posY) and stores a 3D array of block IDs. Each entry is a simple integer: -1 means "air" (no block).

When the player crosses a chunk boundary, the system detects the change in chunk coordinates and triggers a refresh:

$$
\\text{chunkX} = \\left\\lfloor \\frac{\\text{playerX}}{32} \\right\\rfloor, \\quad \\text{chunkY} = \\left\\lfloor \\frac{\\text{playerZ}}{32} \\right\\rfloor
$$

This simple calculation tells us which chunk the player is standing in, and if it's different from last frame, we shift the chunk window and regenerate meshes.

##### **Face Culling: Don't Draw What You Can't See**

Here's a key insight: if a block is completely surrounded by other blocks, you'll never see any of its faces. Drawing them would be wasted work. **Face culling** solves this by checking each block's six neighbors before adding faces to the mesh.

The \`checkBlockNeighbours()\` method in the Chunk class looks in all six cardinal directions (up, down, left, right, front, back). For each direction, if the adjacent position is either outside the chunk bounds or contains air, that face is exposed and needs to be rendered. Otherwise, we skip it entirely.

This single optimization typically reduces vertex count by 50-80% in a typical terrain. Interior blocks contribute nothing to the final mesh. Only surface blocks matter.

The mesh generation loop looks like this conceptually:

\`\`\`cpp
for each block in chunk:
    if block is not air:
        check six neighbors
        for each exposed face:
            add 4 vertices (quad)
            add 6 indices (two triangles)
\`\`\`

Each face gets exactly 4 vertices and 6 indices (forming two triangles in a quad). We maintain running lists of vertices and indices, only appending when a face is actually visible. The final mesh is uploaded to the GPU as a single Vertex Buffer Object (VBO) and Element Buffer Object (EBO), letting OpenGL batch-render the entire chunk in one draw call.

##### **Frustum Culling: Clipping the Camera's View**

Even with face culling, we'd still be sending geometry for chunks behind the camera or way off to the side. **Frustum culling** fixes this by testing whether blocks are inside the camera's view frustum (the pyramid-shaped volume that represents everything the camera can actually see).

The Player class extracts six frustum planes from the combined projection and view matrices:

$$
\\text{Frustum} = \\{\\text{left, right, top, bottom, near, far}\\}
$$

Each plane is represented as $\\vec{p} = (A, B, C, D)$, where the plane equation is:

$$
Ax + By + Cz + D = 0
$$

To test if a point is inside the frustum, we check its signed distance to each plane:

$$
\\text{distance} = \\vec{p}_{xyz} \\cdot \\vec{point} + D
$$

If the distance is negative for any plane, the point is outside the frustum and gets culled. Only blocks that pass all six plane tests get added to the render list.

In practice, we test block positions before converting them to triangles. The \`getPlayerChunk()\` method in Map iterates through all loaded blocks, tests each one with \`pointInsideFrustum()\`, and only includes visible blocks in the final triangle list sent to the raycasting system and rendering pipeline.

##### **Dynamic Chunk Streaming**

When you place or destroy a block, the affected chunk's mesh is marked dirty and regenerated on the next frame. The \`addBlockToChunk()\` and \`removeBlockFromChunk()\` methods update the internal block array, increment or decrement the block count, and trigger a mesh rebuild via \`createChunkMesh()\`.

This regeneration is expensive (iterating 32,768 positions and checking neighbors), but it only happens when chunks change, not every frame. For typical gameplay with occasional block edits, this works perfectly. Future optimizations could use greedy meshing (merging adjacent faces into larger quads) to further reduce vertex count, but the current system already achieves smooth 60fps even in the browser.

##### **Putting It All Together**

When you move through the world, a cascade of optimizations keeps the frame rate high:

1. **Chunk streaming** loads only the 3×3 grid around you, unloading distant chunks
2. **Face culling** skips interior block faces, reducing mesh size by ~70%
3. **Frustum culling** skips chunks and blocks outside the camera view
4. **Mesh batching** combines all visible faces in a chunk into a single draw call
5. **Distance sorting** orders blocks front-to-back for efficient depth testing

The result is a voxel engine that can handle thousands of blocks without breaking a sweat, all while running in WebAssembly in your browser. What seems like magic is really just careful bookkeeping: knowing what to draw, and more importantly, what not to draw.

---

### Collision System

Movement in a voxel world seems simple (just don't let the player walk through blocks). But implementing collision detection that feels natural, prevents glitches, and runs efficiently is surprisingly complex. The naive approach fails in ways that quickly become apparent, so MyCraft uses a multi-stage collision system that balances accuracy with performance.

##### **The Naive Approach: Static AABB Overlap**

The simplest collision system would be to represent the player as an axis-aligned bounding box (AABB) and check if it overlaps any block every frame. An AABB is just a 3D rectangle defined by minimum and maximum coordinates on each axis:

$$
\\text{AABB} = \\{(x_{\\text{min}}, y_{\\text{min}}, z_{\\text{min}}), (x_{\\text{max}}, y_{\\text{max}}, z_{\\text{max}})\\}
$$

Testing if two AABBs overlap is straightforward. They collide if they overlap on all three axes:

$$
\\text{overlap}_x \\land \\text{overlap}_y \\land \\text{overlap}_z
$$

Each frame, you'd loop through every block and test if the player's box touches it. If so, undo the movement. Simple, right?

##### **Why Naive AABB Fails**

This approach has two critical flaws that make it unusable in practice:

**Problem 1: Tunneling**

At high speeds or low frame rates, the player can move more than one block in a single frame. Static overlap detection only checks the player's position at discrete moments. If you move fast enough, you can teleport through a thin wall. Imagine moving 3 units per frame but checking collision only at the start and end positions. You'd pass right through a 1-unit-thick wall without ever detecting overlap.

**Problem 2: Inefficiency**

A voxel world with a 3x3 chunk grid (9 chunks x 32^3 blocks) contains thousands of blocks. Testing the player against every single block every frame means thousands of AABB overlap tests. Most of them are completely unnecessary because the blocks are nowhere near the player. Even if each test is cheap, doing it thousands of times per frame kills performance.

These aren't just theoretical concerns. Without solving tunneling, players clip through floors when falling. Without solving efficiency, frame rates tank in dense areas. We need a smarter approach.

##### **The Solution: Swept AABB with Multi-Phase Detection**

MyCraft's collision system solves both problems through a combination of **continuous collision detection** (swept AABB) and **spatial culling** (broad/narrow phases). Instead of checking if boxes overlap *right now*, we calculate *when* they'll overlap during movement, and we filter out distant blocks before doing expensive calculations.

##### **Phase 1: Broad Phase – Spatial Filtering**

Before doing any precise collision math, we need to answer a simple question: which blocks could *possibly* collide with the player this frame?

The broad phase expands the player's bounding box by their velocity over the frame, creating a "swept volume" that encompasses their entire path of movement:

$$
\\text{swept}_x = [x_{\\text{min}}, x_{\\text{max}} + (v_x \\cdot \\Delta t)]
$$

Any block that doesn't intersect this swept volume can be safely ignored. If the player's entire movement path doesn't touch it, there's no way they'll collide with it.

\`\`\`cpp
std::vector<glm::vec3> Player::broadSweep(std::vector<glm::vec3> blockCords, float delta)
\`\`\`

This function iterates through all loaded blocks (typically 1,000 to 3,000) and tests each one with six simple comparisons (two per axis). Blocks that pass all three axes get added to a candidate list. This typically filters the set down to 5 to 50 blocks, a **95%+ reduction** in narrow-phase calculations.

The key insight is that this test is **conservative**—it might include blocks that won't actually collide, but it never excludes blocks that will. Better to check a few extra blocks than miss a collision.

##### **Phase 2: Narrow Phase – Swept AABB Intersection**

Now comes the mathematical heart of the system. For each candidate block from the broad phase, we calculate exactly *when* the player will collide and from *which direction*.

The swept AABB algorithm treats collision as a continuous problem. We're not asking "do these boxes overlap?" but rather "at what time $t \\in [0, 1]$ during this frame do they first touch?"

\`\`\`cpp
float Player::sweeptAABB(std::vector<glm::vec3> blockCords, glm::vec3& normalForces, float delta)
\`\`\`

For each axis independently, we calculate the inverse entry and exit distances:

$$
\\text{if } v_x > 0: \\quad x_{\\text{entry}} = \\frac{\\text{block}_x - \\text{player}_{\\text{max}_x}}{v_x \\cdot \\Delta t}
$$

This gives us a time (as a fraction of the frame) when the player enters the block's X-range. We repeat for Y and Z:

$$
t_{\\text{entry}} = \\max(x_{\\text{entry}}, y_{\\text{entry}}, z_{\\text{entry}})
$$

The player only collides if they enter all three axes simultaneously. The collision time is the maximum entry time across all axes. This handles complex geometry like corners and edges naturally. If $t_{\\text{entry}} > 1$, the collision happens after this frame (ignore it). If $t_{\\text{entry}} < 0$, we're already inside (resolve immediately).

The axis with the earliest entry time tells us the collision normal. If Y-entry came first, we hit a horizontal surface (floor or ceiling). This normal is crucial for the next phase.

##### **Phase 3: Movement and Sliding Response**

Once we know when and where the player will collide, we move them up to that point and handle the remaining time with sliding:

\`\`\`cpp
void Player::detectCollison(float delta, std::vector<glm::vec3> blockCords)
\`\`\`

If the collision time is 0.3, we move 30% of the intended distance, then "slide" for the remaining 70% of the frame. Sliding uses vector projection to remove the velocity component perpendicular to the collision surface:

$$
\\vec{v}_{\\text{slide}} = \\vec{v} - (\\vec{v} \\cdot \\hat{n}) \\hat{n}
$$

If you hit a wall while walking diagonally, the component parallel to the wall survives. You slide along it instead of stopping dead. This gives the satisfying "smooth slide" feel that makes movement natural.

\`\`\`cpp
void Player::detectCollisonHelper(float delta, std::vector<glm::vec3> blockCords, 
                                   glm::vec3 normalForces, float remainingtime)
\`\`\`

The system recursively resolves collisions with the new direction. If sliding causes you to hit another block (like sliding down a staircase), it detects and resolves that too. This continues until either there are no more collisions or the remaining time drops below a threshold.

##### **Phase 4: Grounding Detection**

Finally, we need to know if the player is standing on solid ground (for jump validation and gravity logic):

\`\`\`cpp
void Player::grounded(std::vector<glm::vec3> blockCords)
\`\`\`

This checks if the player's bottom bounding box overlaps any block's top surface. It's currently a brute-force O(n) check against all blocks, noted in the code as a candidate for optimization. It could be replaced with a spatial hash or checking only blocks directly beneath the player.

##### **Input to World Update**

When you press a movement key, the entire collision pipeline executes in milliseconds:

1. **Input**: WASD creates a movement vector, gravity affects vertical velocity
2. **Broad Phase**: Filter thousands of blocks to ~20 candidates based on swept volume
3. **Narrow Phase**: Calculate exact collision time and normal for each candidate
4. **Movement**: Move player by displacement × collision time (stopping at the first hit)
5. **Sliding**: Project remaining velocity onto collision plane and recursively resolve
6. **Grounding**: Update jump-enabled state based on floor contact
7. **Output**: Player position updated smoothly, no clipping, no tunneling

This system ensures movement feels natural. You can run along walls, slide down slopes, and jump precisely without ever clipping through geometry. The math prevents tunneling even at high speeds (swept AABB catches collisions along the entire path), and the broad phase keeps it performant (checking only nearby blocks). It's what makes MyCraft feel like a real game instead of a buggy tech demo.

---

### Raycasting System

The raycasting system is the core interaction mechanism for block selection, destruction, and placement. It's what makes clicking on a distant block feel responsive and precise. At its heart is the **Ray class**, a lightweight utility that encapsulates all ray-triangle intersection logic and provides the mathematical foundation for turning a 2D mouse click into meaningful 3D world interaction.

#### Ray Class Architecture

The Ray class is simple but powerful. It holds just the essential data needed to represent an infinite line through 3D space:

**Class Members:**
- **Origin** ($\\vec{o}$): The starting point of the ray, positioned at the player's camera
- **Direction** ($\\hat{d}$): A normalized vector pointing from the camera through the mouse cursor position into the world

**Class Methods:**
- **rayIntersectsBlock(Triangle, float&)**: The workhorse method that implements the Möller-Trumbore algorithm. It tests whether the ray actually hits a given triangle, and if so, calculates the distance to the intersection point and stores it in the reference parameter
- **rayNormalCheck(Triangle)**: A validation method that uses dot products to determine if we're looking at the front face of a triangle. This prevents weird behavior like placing blocks on the back side of a wall

#### Implementation Example: Player Class Integration

The Player class is where the Ray class gets put to work. It orchestrates the raycasting pipeline through a series of methods:

\`\`\`cpp
Ray GetMouseRay(GLFWwindow* window, 
                const glm::mat4& viewMatrix, 
                const glm::mat4& projectionMatrix);
\`\`\`
This method takes your mouse position on screen and converts it into an actual 3D ray pointing into the world.

\`\`\`cpp
bool castRayForBlock(Ray ray, 
                     const glm::vec3& blockPosition, 
                     const std::vector<Triangle>& triangles);
\`\`\`
When you left-click to destroy a block, this method tests the ray against all triangles in a block and returns true on the first hit. We don't need to know which triangle, just that something was hit.

\`\`\`cpp
int castRayForBlockPlace(Ray ray, 
                         const glm::vec3& blockPosition, 
                         std::vector<Triangle> triangles);
\`\`\`
For placement (right-click), we need more precision. This method sorts triangles by distance, tests them, and returns the index of the closest front-facing triangle hit. This lets us calculate exactly where the new block should go.

When a mouse button is pressed, the Player calls \`GetMouseRay()\`, then loops through visible blocks (each made of 12 triangles), calling the appropriate cast function to either destroy or place.

#### From Screen Coordinates to World Space

Imagine looking at your screen: the mouse position is just pixels. But we need to know where in 3D space that pixel points to. This requires transforming coordinates through several spaces, each with its own rules.

We start with mouse coordinates $(m_x, m_y)$ in screen space (just regular pixel positions). First, we normalize these to the range $[-1, 1]$ (called Normalized Device Coordinates, or NDC), which is the standard space OpenGL uses:

$$
x_{ndc} = \\frac{2m_x}{width} - 1, \\quad y_{ndc} = 1 - \\frac{2m_y}{height}
$$

Now we have a point on the near plane of our camera's view frustum: $\\vec{r}_{clip} = (x_{ndc}, y_{ndc}, -1, 1)$. But we need the direction vector, not just a point. To get that, we transform this into eye space (relative to the camera) by applying the inverse of the projection matrix. The projection matrix compresses 3D into 2D for the screen; inverting it does the opposite:

$$
\\vec{r}_{eye} = P^{-1}\\vec{r}_{clip}
$$

We set the depth to $-1$ and the w-component to $0$ (this is a direction, not a position, so the camera doesn't affect it):

$$
\\vec{r}_{eye} = (r_x, r_y, -1, 0)
$$

We're still in camera space though. To get to world space, we apply the inverse view matrix, which transforms relative-to-camera coordinates into world coordinates:

$$
\\vec{r}_{world} = V^{-1}\\vec{r}_{eye}
$$

Finally, we normalize this to get a unit-length direction vector:

$$
\\hat{d} = \\frac{\\vec{r}_{world}}{||\\vec{r}_{world}||}
$$

Combining this with the camera's position as the origin, we get our ray: $R(t) = \\vec{o} + t\\hat{d}$ where $t \\geq 0$ represents the distance along the ray.

#### Testing Intersection with Triangles

Once we have a ray, we need to know if it actually hits anything. Blocks in MyCraft are made of triangles (two per face), and we need a fast algorithm to check if the ray passes through any of them.

Enter the **Möller-Trumbore algorithm**. It's a clever, numerically stable way to compute ray-triangle intersection. Given a ray and triangle vertices ($\\vec{v}_0, \\vec{v}_1, \\vec{v}_2$), we first compute the triangle's edge vectors:

$$
\\vec{e}_1 = \\vec{v}_1 - \\vec{v}_0, \\quad \\vec{e}_2 = \\vec{v}_2 - \\vec{v}_0
$$

The algorithm works by solving for where the ray intersects the infinite plane containing the triangle. We compute a determinant to check if the ray is nearly parallel to the triangle plane:

$$
\\vec{h} = \\hat{d} \\times \\vec{e}_2, \\quad a = \\vec{e}_1 \\cdot \\vec{h}
$$

If $|a|$ is very small (less than some epsilon), the ray is essentially parallel and we bail out early. No intersection.

Assuming there's an intersection with the plane, we now need to check if it's actually within the triangle's bounds. We use barycentric coordinates: a way of expressing any point in the triangle as a weighted combination of the three vertices. If the weights are all between 0 and 1, we're inside:

$$
f = \\frac{1}{a}, \\quad \\vec{s} = \\vec{o} - \\vec{v}_0, \\quad u = f(\\vec{s} \\cdot \\vec{h})
$$

The first barycentric coordinate, $u$, must be in $[0, 1]$:

$$
\\vec{q} = \\vec{s} \\times \\vec{e}_1, \\quad v = f(\\hat{d} \\cdot \\vec{q})
$$

The second coordinate, $v$, must also be in $[0, 1]$, and together $u + v$ must not exceed 1:

If all checks pass, we compute the actual distance to the intersection:

$$
t = f(\\vec{e}_2 \\cdot \\vec{q})
$$

If $t > \\epsilon$ (small positive threshold), we have a valid intersection at position $\\vec{p} = \\vec{o} + t\\hat{d}$ along the ray.

#### Ensuring We Hit What We See

Here's a subtle issue: triangles have two sides. When you're inside a block looking outward, you might accidentally "hit" the back side of a face. To prevent this, and to make placement intuitive (you should only place blocks on faces you're looking at), we validate that the ray is hitting a front-facing surface.

Every triangle has a surface normal (a vector perpendicular to the plane). We compute it from the edge vectors:

$$
\\hat{n} = \\frac{\\vec{e}_1 \\times \\vec{e}_2}{||\\vec{e}_1 \\times \\vec{e}_2||}
$$

If the normal and the ray direction point in roughly the same direction (their dot product is positive), we're hitting the front face:

$$
\\text{dot} = \\hat{n} \\cdot \\hat{d} > 0
$$

For block placement, once we've confirmed we hit a valid triangle, we calculate where the new block should go by moving one unit away from the hit triangle along the inverted normal:

$$
\\vec{p}_{new} = \\vec{p}_{hit} + \\hat{n}
$$

(Note: We also convert between OpenGL's coordinate system and the game's block-space coordinates here, since they use different axis conventions.)

#### From Click to World Change

When you click, a cascade of transformations and checks unfolds in milliseconds. Your mouse position becomes a ray. That ray is tested against dozens of triangles, each check validating intersection distance, barycentric coordinates, and surface orientation. The closest valid hit is identified, and if left-clicking, a DestroyPacket is queued to remove that block and add it to inventory. If right-clicking, an AddPacket places a new block adjacent to the hit. The next frame, the chunk mesh regenerates, and the change appears in your world. All of this happens because of a tiny math pipeline that turns a pixel coordinate into 3D action.

---

### ImGui

Dear ImGui handles in-game UI rendering including an inventory system with 20 slots, a selected item display, an options menu, and instruction overlays. It integrates directly into the render loop via GLFW and OpenGL, letting UI and game state update seamlessly each frame.

---

## What I Learned

I learned how chunking and face culling reduce draw calls, how to make collisions feel smooth with swept AABB and sliding, and how to integrate UI and interaction tools into a real-time render loop.`,
          title: 'About MyCraft'
        }
      }
    ]
  },
  {
    id: 6,
    slug: "figure-aggregator",
    title: "Figure Aggregator",
    description: "A Shopify-style online store for toys and models with automated data aggregation.",
    image: "/figure-aggregator/figurecenter.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/figure-aggregator"
      }
    ],
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

## Why

I wanted a single storefront for collectible figures and a project that exercised scraping, storage, and deployment in a full-stack system.

---

## Interesting Technical Points

- Puppeteer scraper running as a Kubernetes CronJob to refresh catalog data
- GKE load balancer and Ingress routing to containerized Express APIs
- Cloud SQL Proxy sidecar for secure MySQL connectivity
- React frontend deployed on Netlify with search and filters

---

## What I Learned

I learned how to keep scraped data fresh, how Kubernetes routing and scaling work in practice, and how to separate frontend, API, and data concerns.`,
          title: 'About Figure Aggregator'
        }
      }
    ]
  },
  {
    id: 3,
    slug: "receipt-scanner",
    title: "Receipt Scanner Mobile App",
    description: "A mobile app that lets users quickly store receipts with a photo and tracks spending for better budgeting.",
    image: "/reciept-scanner/pipeline/non greyscale non fix angle.jpg",
    links: [
      {
        label: "View App Repo",
        url: "https://github.com/kcccr123/receipt-scanner"
      },
      {
        label: "View Backend Repo",
        url: "https://github.com/kcccr123/receipt-scanner-backend"
      }
    ],
    components: [
      {
        type: 'image',
        props: {
          src: '/reciept-scanner/pipeline/non greyscale non fix angle.jpg',
          alt: 'Receipt scan before grayscale and angle correction',
          caption: 'Raw pipeline frame before grayscale conversion and angle correction.'
        }
      },
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
          content: `# Receipt Scanner Mobile App

## Why

I wanted a faster way to capture receipts and track spending while learning how to build an end-to-end ML product.

---

## Interesting Technical Points

### Inference Pipeline

- In-house pipeline with YOLOv8 detection, RCNN OCR, and BART cleanup
- Image preprocessing and augmentation to stabilize receipt text extraction
- Alternate GPT-4o path for comparison and faster iteration

### Cloud Deployment

- Deployed inference on GKE with a mobile client sending images to the server
- Containerized services with Docker and Gunicorn for scalable processing

### App Features

- Receipt grouping and tagging for cleaner expense organization
- Fast capture flow with camera and gallery upload support

---

## What I Learned

I learned how data quality and preprocessing drive model accuracy, how to coordinate multiple models in one pipeline, and how to deploy ML services that integrate cleanly with a mobile app.`,
          title: 'Project Details'
        }
      }
    ]
  },
  {
    id: 4,
    slug: "stud-io",
    title: "Stud.io",
    description: "An intelligent flashcard generation app that uses AI and reinforcement learning to create personalized study materials from lecture notes, adapting to each student's learning needs.",
    image: "/stud.io/hackathon thing.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/stud-io-nsbehacks-2025"
      },
      {
        label: "View on Devpost",
        url: "https://devpost.com/software/stud-io"
      }
    ],
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
          content: `# Stud.io

## Why

We wanted to build a study tool that adapts to each student instead of giving everyone the same flashcards.

---

## Interesting Technical Points

- Q-learning loop that prioritizes weak topics based on performance
- Vector search in MongoDB Atlas for fast retrieval of similar prompts
- LLM-driven generation and grading for instant feedback
- Next.js frontend with a Flask backend handling study sessions

---

## What I Learned

I learned how to connect reinforcement learning signals to a user-facing loop, how embeddings change content retrieval, and how to manage latency when LLMs are in the critical path.`,
          title: 'About Stud.io'
        }
      }
    ]
  },
  {
    id: 5,
    slug: "ue-flight-tracker",
    title: "UE Flight Tracker",
    description: "An Unreal Engine app that visualizes active commercial flights on a world-scale map with live flight data and interactive camera controls.",
    image: "/ue-flightsim/ue-flightsim-image-projectcard.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/ue-flight-tracker"
      }
    ],
    components: [
      {
        type: 'demo-link',
        props: {
          url: 'https://drive.google.com/drive/folders/1m73Ae3LnU7konZcTfJIdXvsenJ6avuYU?usp=sharing',
          text: 'Download Executable'
        }
      },
      {
        type: 'image',
        props: {
          src: '/ue-flightsim/ue-flightsim-image.png',
          alt: 'UE Flight Tracker visualization'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['Unreal Engine', 'C++', 'C#', 'Python', 'SQLite', 'Cesium', 'Flight Radar API'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'World-scale visualization of active commercial flights using Cesium',
            'Flight data ingestion with Flight Radar API and local SQLite caching',
            'Search and filter flights by ICAO code or geographic coordinates',
            'Interactive camera controls for tracking and inspecting aircraft'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About UE Flight Tracker',
          content: `# UE Flight Tracker

## Why

I wanted to combine real-world flight data with a 3D engine to make global air traffic feel tangible and explorable.

---

## Interesting Technical Points

- Flight Radar API ingestion paired with a Cesium globe for world-scale positioning
- SQLite database updated at launch for quick browsing and filtering
- Unreal Engine UI flow for ICAO search and coordinate lookup
- Python tooling for data access and preprocessing

---

## What I Learned

I learned how to synchronize live data with a real-time rendering pipeline and how to handle coordinate systems and scale in a 3D globe environment.`
        }
      }
    ]
  },
  {
    id: 7,
    slug: "cat-detector",
    title: "Cat Detector",
    description: "A personal learning project exploring image classification with scikit-learn SVMs and a simple GUI for cat detection.",
    image: "/cat-detector/cat card.jpg",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/cat-detector"
      }
    ],
    components: [
      {
        type: 'image',
        props: {
          src: '/cat-detector/cute images.jpg',
          alt: 'Cute cat photos',
          caption: 'Bonus images of my cute cat.'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['Python', 'Scikit-learn', 'SVM', 'Image Processing'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'First foray into ML and classical classifiers',
            'SVM-based model for binary cat image classification',
            'Lightweight GUI that prompts for image upload and runs inference'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About Cat Detector',
          content: `# Cat Detector

## Why

This was my first focused project in ML classifiers, and I wanted to start with a classic SVM before moving into deep learning.

## Interesting Technical Points

- Scikit-learn pipeline using a Support Vector Machine for image classification
- Basic preprocessing to normalize images into consistent model inputs
- Simple GUI that prompts for an upload and runs inference locally

## What I Learned

I learned how preprocessing affects classifier performance and how to structure a small ML workflow end-to-end.`
        }
      }
    ]
  },
  {
    id: 8,
    slug: "2d-collision-simulation",
    title: "2D Collision Simulation",
    description: "A high school physics project that simulates 2D collisions between two point masses using conservation of momentum.",
    image: "/2dcollision/day1.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/2d-collision-simulation"
      }
    ],
    components: [
      {
        type: 'demo-link',
        props: {
          url: 'https://py3.codeskulptor.org/index.html#user310_usvH3PnnvR_22.py',
          text: 'Run in CodeSkulptor3'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['Python', 'tkinter', 'CodeSkulptor3'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Interactive setup for two point masses in 2D',
            'Direction, velocity, and mass controls for each object',
            'Collision response based on conservation of momentum',
            'Ported from CodeSkulptor simplegui to tkinter'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About 2D Collision Simulation',
          content: `# 2D Collision Simulation

## Why

This physics final project was built to make conservation of momentum interactive instead of purely theoretical.

---

## Interesting Technical Points

- Two-point-mass collision simulation with user-defined mass and velocity
- Interactive setup for direction vectors and starting positions
- Ported from CodeSkulptor simplegui to a standalone tkinter app

---

## What I Learned

I learned how to translate physics equations into a working simulation and how small UI decisions make a math-heavy project more approachable.`
        }
      }
    ]
  },
];
