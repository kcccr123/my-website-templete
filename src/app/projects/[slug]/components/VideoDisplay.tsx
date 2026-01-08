"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface VideoDisplayProps {
  src?: string;
  poster?: string;
  caption?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

/**
 * VideoDisplay component for displaying project videos with play/pause controls.
 * @param {Object} props - The component props.
 * @param {string} [props.src] - The source URL of the video.
 * @param {string} [props.poster] - The poster image URL for the video.
 * @param {string} [props.caption] - Optional caption for the video.
 * @param {boolean} [props.autoplay=false] - Whether the video should autoplay.
 * @param {boolean} [props.loop=false] - Whether the video should loop.
 * @param {boolean} [props.muted=false] - Whether the video should be muted.
 */
export default function VideoDisplay({ 
  src, 
  poster,
  caption,
  autoplay = false,
  loop = false,
  muted = false
}: VideoDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  
  if (!src) return null;

  const handlePlayPause = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-glass backdrop-blur-sm border border-glass-border rounded-lg overflow-hidden"
    >
      <div className="relative w-full group">
        <video
          className="w-full h-auto cursor-pointer"
          onClick={handlePlayPause}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          poster={poster}
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
            {isPlaying ? (
              <FaPause className="text-white text-3xl" />
            ) : (
              <FaPlay className="text-white text-3xl ml-1" />
            )}
          </div>
        </div>
      </div>
      
      {caption && (
        <div className="p-4 bg-black/20">
          <p className="text-sm text-text-secondary text-center italic">
            {caption}
          </p>
        </div>
      )}
    </motion.div>
  );
}
