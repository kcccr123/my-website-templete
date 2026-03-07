"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaExternalLinkAlt, FaPlay } from "react-icons/fa";

interface DemoLinkProps {
  url?: string;
  text?: string;
}

const getYouTubeVideoId = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }

      const [, route, id] = parsedUrl.pathname.split("/");
      if (route === "embed" || route === "shorts") {
        return id ?? null;
      }
    }
  } catch {
    return null;
  }

  return null;
};

const getYouTubeThumbnailUrl = (videoId: string, variant: "maxresdefault" | "hqdefault") =>
  `https://i.ytimg.com/vi/${videoId}/${variant}.jpg`;

/**
 * DemoLink component for displaying a link to a live demo.
 * @param {Object} props - The component props.
 * @param {string} [props.url] - The URL for the demo link.
 * @param {string} [props.text="View Live Demo"] - The text to display for the link.
 */
export default function DemoLink({ url, text = "View Live Demo" }: DemoLinkProps) {
  return <DemoLinkContent key={url ?? "demo-link"} url={url} text={text} />;
}

function DemoLinkContent({ url, text = "View Live Demo" }: DemoLinkProps) {
  const youtubeVideoId = url ? getYouTubeVideoId(url) : null;
  const fallbackThumbnail = youtubeVideoId
    ? getYouTubeThumbnailUrl(youtubeVideoId, "hqdefault")
    : null;
  const [thumbnailUrl, setThumbnailUrl] = useState(
    youtubeVideoId ? getYouTubeThumbnailUrl(youtubeVideoId, "maxresdefault") : null
  );

  if (!url) return null;

  const handleThumbnailError = () => {
    if (!fallbackThumbnail) {
      return;
    }

    setThumbnailUrl((current) => (current === fallbackThumbnail ? current : fallbackThumbnail));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center"
    >
      {youtubeVideoId && thumbnailUrl ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full max-w-4xl overflow-hidden rounded-xl border border-glass-border bg-glass backdrop-blur-sm transition-all duration-200 hover:border-glass-border-hover"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <Image
              src={thumbnailUrl}
              alt={`${text} thumbnail`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              onError={handleThumbnailError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-18 w-18 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg transition-transform duration-200 group-hover:scale-105">
                <FaPlay className="ml-1 text-2xl" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/70">
                  YouTube
                </p>
                <p className="text-lg font-semibold text-white">{text}</p>
              </div>
              <FaExternalLinkAlt className="mb-1 shrink-0 text-sm text-white/85 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </a>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-lg border border-glass-border bg-white/10 px-6 py-3 transition-all duration-200 group hover:border-glass-border-hover hover:bg-white/20"
        >
          <span className="text-lg font-medium">{text}</span>
          <FaExternalLinkAlt className="text-sm transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      )}
    </motion.div>
  );
}
