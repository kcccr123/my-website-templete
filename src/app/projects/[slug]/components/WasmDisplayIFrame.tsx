"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface WasmDisplayIFrameProps {
  embedUrl?: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
}

/**
 * WasmDisplayIFrame component for embedding WebAssembly applications via iframe.
 * This approach ensures complete isolation and fresh loading on each navigation,
 * solving the stale state issue where Emscripten runtime remains bound to old canvas.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.embedUrl="/wasm/mycraft-embed.html"] - The URL of the embed HTML file.
 * @param {string} [props.title="WebAssembly Application"] - The title for the application.
 * @param {string} [props.caption] - Optional caption for the application.
 * @param {number} [props.width=1200] - The width of the iframe.
 * @param {number} [props.height=800] - The height of the iframe.
 */
export default function WasmDisplayIFrame({
  embedUrl = "/wasm/mycraft-embed.html",
  title = "WebAssembly Application",
  caption,
  width = 1200,
  height = 800,
}: WasmDisplayIFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  // Set iframe src with timestamp to ensure fresh load
  useEffect(() => {
    const timestamp = Date.now();
    const separator = embedUrl.includes('?') ? '&' : '?';
    setIframeSrc(`${embedUrl}${separator}_t=${timestamp}`);
    
    return () => {
      setIframeSrc(null);
    };
  }, [embedUrl]);

  // Handle messages from the iframe
  const handleMessage = useCallback((event: MessageEvent) => {
    if (iframeRef.current && event.source === iframeRef.current.contentWindow) {
      const { type, message } = event.data;
      
      switch (type) {
        case 'ready':
          break;
        case 'loaded':
          setIsLoading(false);
          break;
        case 'error':
          setError(message || 'An error occurred');
          setIsLoading(false);
          break;
        case 'pointerlock':
          break;
      }
    }
  }, []);

  // Add message event listener for iframe communication
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  // Fallback: assume loaded after 5 seconds if no message
  const handleIframeLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  // Handle iframe load error
  const handleIframeError = () => {
    setError("Failed to load WebAssembly application");
    setIsLoading(false);
  };

  // Early return if no embed URL
  if (!embedUrl) {
    return null;
  }

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
        {iframeSrc && (
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            width={width}
            height={height}
            className="w-full h-auto block"
            style={{ border: 'none', aspectRatio: `${width}/${height}` }}
            allow="pointer-lock; fullscreen"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title={title}
          />
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-glass-border border-t-white rounded-full animate-spin" />
              <div className="text-white text-lg font-medium">Loading WebAssembly...</div>
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
