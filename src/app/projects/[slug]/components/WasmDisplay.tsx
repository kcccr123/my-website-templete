"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface WasmDisplayProps {
  wasmUrl?: string;
  jsUrl?: string;
  dataUrl?: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
  canvasId?: string;
  moduleConfig?: Record<string, any>;
}

const wasmState = {
  loaded: false,
  loading: false,
};

/**
 * WasmDisplay component for embedding WebAssembly applications with pointer lock support.
 * @param {Object} props - The component props.
 * @param {string} [props.wasmUrl] - The URL of the WebAssembly file.
 * @param {string} [props.jsUrl] - The URL of the JavaScript glue file.
 * @param {string} [props.dataUrl] - The URL of the data file.
 * @param {string} [props.title="WebAssembly Application"] - The title for the application.
 * @param {string} [props.caption] - Optional caption for the application.
 * @param {number} [props.width=1200] - The width of the canvas.
 * @param {number} [props.height=800] - The height of the canvas.
 * @param {string} [props.canvasId="canvas"] - The ID for the canvas element.
 * @param {Record<string, any>} [props.moduleConfig={}] - Additional configuration for the Emscripten Module.
 */
export default function WasmDisplay({
  wasmUrl,
  jsUrl,
  dataUrl,
  title = "WebAssembly Application",
  caption,
  width = 1200,
  height = 800,
  canvasId = "canvas",
  moduleConfig = {},
}: WasmDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastLockReleaseTime = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [canRequestLock, setCanRequestLock] = useState(true);

  useEffect(() => {
    if (isPointerLocked) {
      setGameStarted(true);
    }
  }, [isPointerLocked]);

  useEffect(() => {
    const handlePointerLockChange = () => {
      const lockedElement = document.pointerLockElement;
      const canvas = canvasRef.current;
      
      const locked = lockedElement !== null && 
        ((lockedElement as HTMLElement)?.id === canvasId || lockedElement === canvas);
      
      setIsPointerLocked(locked);
      
      if (!locked) {
        lastLockReleaseTime.current = Date.now();
        setCanRequestLock(false);
        setTimeout(() => setCanRequestLock(true), 1000);
      }
      
      if (locked) {
        canvas?.focus();
      }
    };

    const handlePointerLockError = (e: Event) => {
      console.error("Pointer lock error:", e);
      lastLockReleaseTime.current = Date.now();
      setCanRequestLock(false);
      setTimeout(() => setCanRequestLock(true), 1000);
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.pointerLockElement === canvasRef.current) {
      }
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('pointerlockerror', handlePointerLockError);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('pointerlockerror', handlePointerLockError);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvasId]);

  useEffect(() => {
    if (!jsUrl) {
      setError("No JavaScript file URL provided");
      setIsLoading(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    if (wasmState.loaded) {
      if ((window as any).Module) {
        (window as any).Module.canvas = canvas;
      }
      setIsLoading(false);
      return;
    }

    if (wasmState.loading) {
      return;
    }

    wasmState.loading = true;

    (window as any).Module = {
      canvas: canvas,
      preRun: [],
      postRun: [],
      print: (text: string) => console.log(`[WASM] ${text}`),
      printErr: (text: string) => {
        if (!text.includes("can't fopen") && !text.includes("pointer lock")) {
          console.error(`[WASM Error] ${text}`);
        }
      },
      setStatus: (text: string) => {
        if (!text) {
          setIsLoading(false);
          setLoadingStatus("Running");
        } else if (text.includes("Exception")) {
          setError(text);
          setIsLoading(false);
        } else {
          setLoadingStatus(text);
        }
      },
      totalDependencies: 0,
      monitorRunDependencies: function(left: number) {
        this.totalDependencies = Math.max(this.totalDependencies, left);
        const status = left 
          ? `Loading... (${this.totalDependencies - left}/${this.totalDependencies})`
          : "Processing...";
        (window as any).Module?.setStatus?.(status);
      },
      locateFile: (path: string, prefix: string) => {
        if (path.endsWith('.wasm') || path.endsWith('.data') || path.endsWith('.mem')) {
          return `/wasm/${path}`;
        }
        if (!path.startsWith('http') && !path.startsWith('/')) {
          return `/wasm/${path}`;
        }
        return prefix + path;
      },
      onAbort: (what: any) => {
        const errorMsg = typeof what === 'string' ? what : 'Application aborted';
        if (!errorMsg.includes("can't fopen")) {
          setError(errorMsg);
          setIsLoading(false);
        }
      },
      ...moduleConfig,
    };

    const script = document.createElement("script");
    script.src = jsUrl;
    script.async = true;
    
    script.onload = () => {
      wasmState.loaded = true;
      wasmState.loading = false;
    };
    
    script.onerror = () => {
      wasmState.loading = false;
      setError("Failed to load WebAssembly application");
      setIsLoading(false);
    };

    document.body.appendChild(script);
  }, [jsUrl, moduleConfig]);

  useEffect(() => {
    return () => {
      if (document.pointerLockElement === canvasRef.current) {
        document.exitPointerLock();
      }
    };
  }, []);

  if (!jsUrl) {
    return null;
  }

  const handleCanvasClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const canvas = canvasRef.current;
    
    const timeSinceRelease = Date.now() - lastLockReleaseTime.current;
    const minWaitTime = 300; // milliseconds
    
    if (!isLoading && !error && canvas && timeSinceRelease >= minWaitTime) {
      canvas.focus();
      
      try {
        const result = canvas.requestPointerLock();
        if (result && typeof result.then === 'function') {
          await result;
        }
      } catch (err) {
        console.error("Pointer lock request failed:", err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
      ref={containerRef}
    >
      {title && (
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
      )}
      
      <div className="relative rounded-lg overflow-hidden bg-glass backdrop-blur-sm border border-glass-border">
        <canvas
          ref={canvasRef}
          id={canvasId}
          width={width}
          height={height}
          className="w-full h-auto block"
          tabIndex={0}
          onContextMenu={(e) => e.preventDefault()}
          onClick={handleCanvasClick}
        />
        
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-glass-border border-t-white rounded-full animate-spin" />
              <div className="text-white text-lg font-medium">{loadingStatus}</div>
            </div>
          </div>
        )}

        {!isLoading && !error && !isPointerLocked && canRequestLock && (
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer transition-opacity hover:bg-black/50"
            onClick={handleCanvasClick}
          >
            <div className="flex flex-col items-center gap-4 text-white pointer-events-none">
              <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div className="text-xl font-medium">
                {gameStarted ? "Click to Resume" : "Click to Play"}
              </div>
              <div className="text-sm text-white/70">Press ESC to pause</div>
            </div>
          </div>
        )}

        {!isLoading && !error && !isPointerLocked && !canRequestLock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-white">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              <div className="text-xl font-medium">Pausing...</div>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 bg-red-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-6">
            <div className="text-white text-center">
              <div className="text-xl font-bold mb-2">Error Loading WebAssembly</div>
              <div className="text-sm text-red-200">{error}</div>
            </div>
          </div>
        )}
      </div>

      {caption && !error && (
        <p className="text-text-muted text-sm mt-3 text-center">{caption}</p>
      )}
    </motion.div>
  );
}
