'use client';

import { useEffect, useRef, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubContributionsProps {
  username: string;
  title?: string;
  weeks?: number;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  className?: string;
}

export default function GitHubContributions({
  username,
  title = 'GitHub Activity',
  weeks = 52,
  maxHeight = '400px',
  maxWidth = '100%',
  minHeight = '200px',
  className = ''
}: GitHubContributionsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [calendarSizing, setCalendarSizing] = useState(() => ({
    blockSize: 12,
    blockMargin: 4,
    fontSize: 14
  }));

  const sizingForWidth = (width: number) => {
    const blockSize = Math.max(10, Math.min(18, Math.round(width / 55)));
    const blockMargin = Math.max(2, Math.min(5, Math.round(blockSize / 3)));
    const fontSize = Math.max(12, Math.min(16, Math.round(blockSize)));
    return { blockSize, blockMargin, fontSize };
  };

  const selectLastWeeks = (contributions: Activity[]) => {
    const now = new Date();
    const cutoff = new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
    return contributions.filter((activity: Activity) => new Date(activity.date) >= cutoff);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') {
      return;
    }

    const updateSizing = () => {
      const width = container.clientWidth;
      if (!width) {
        return;
      }
      const next = sizingForWidth(width);
      setCalendarSizing((prev) =>
        prev.blockSize === next.blockSize &&
        prev.blockMargin === next.blockMargin &&
        prev.fontSize === next.fontSize
          ? prev
          : next
      );
    };

    updateSizing();
    const observer = new ResizeObserver(updateSizing);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`glass-card ${className}`} style={{ maxHeight, maxWidth, minHeight, display: 'flex', flexDirection: 'column' }}>
      <h2 className="text-[clamp(1.05rem,1.6vw,1.4rem)] font-semibold mb-4 flex-shrink-0">{title}</h2>
      <div ref={containerRef} className="flex items-center justify-center w-full overflow-x-auto flex-1 min-h-0">
        <style jsx>{`
          div :global(svg) {
            max-width: 100%;
            height: auto;
          }
          div :global(text) {
            fill: #9ca3af !important;
          }
          div :global(.react-activity-calendar) {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}</style>
        <GitHubCalendar
          username={username}
          transformData={selectLastWeeks}
          labels={{
            totalCount: `{{count}} contributions in the last ${weeks} weeks`
          }}
          colorScheme="dark"
          blockSize={calendarSizing.blockSize}
          blockMargin={calendarSizing.blockMargin}
          fontSize={calendarSizing.fontSize}
          theme={{
            dark: ['rgba(255, 255, 255, 0.1)', '#0e4429', '#006d32', '#26a641', '#39d353'],
          }}
        />
      </div>
    </div>
  );
}
