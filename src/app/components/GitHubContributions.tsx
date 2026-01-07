'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  contributions: Activity[];
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
  const [rawContributions, setRawContributions] = useState<Activity[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sizingForWidth = (width: number) => {
    const blockSize = Math.max(12, Math.min(20, Math.round(width / 50)));
    const blockMargin = Math.max(3, Math.min(6, Math.round(blockSize / 3)));
    const fontSize = Math.max(12, Math.min(16, Math.round(blockSize * 0.85)));
    return { blockSize, blockMargin, fontSize };
  };

  const selectLastWeeks = (contributions: Activity[]) => {
    const now = new Date();
    const cutoff = new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
    return contributions.filter((activity: Activity) => new Date(activity.date) >= cutoff);
  };

  const filteredContributions = useMemo(() => {
    if (!rawContributions) {
      return null;
    }
    return selectLastWeeks(rawContributions);
  }, [rawContributions, weeks]);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    setError(null);

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(async (response) => {
        const data = (await response.json()) as ApiResponse & { error?: string };
        if (!response.ok) {
          throw new Error(data.error || response.statusText || 'Unable to load GitHub activity.');
        }
        return data;
      })
      .then((data) => {
        if (!isActive) {
          return;
        }
        setRawContributions(data.contributions || []);
      })
      .catch((err: unknown) => {
        if (!isActive) {
          return;
        }
        setError(err instanceof Error ? err.message : 'Unable to load GitHub activity.');
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [username]);

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

  const calendarLoading = isLoading || (!filteredContributions && !error);

  return (
    <div className={`glass-card ${className}`} style={{ maxHeight, maxWidth, minHeight, display: 'flex', flexDirection: 'column' }}>
      <h2 className="text-[clamp(1.05rem,1.6vw,1.4rem)] font-semibold mb-4 flex-shrink-0">{title}</h2>
      <div ref={containerRef} className="relative flex items-center justify-center w-full overflow-x-auto flex-1 min-h-0">
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
        {error ? (
          <div className="flex w-full items-center justify-center text-sm text-red-400">
            Unable to load GitHub activity.
          </div>
        ) : (
          <ActivityCalendar
            data={filteredContributions ?? []}
            labels={{
              totalCount: `{{count}} contributions in the last ${weeks} weeks`
            }}
            colorScheme="dark"
            blockSize={calendarSizing.blockSize}
            blockMargin={calendarSizing.blockMargin}
            fontSize={calendarSizing.fontSize}
            loading={calendarLoading}
            theme={{
              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              dark: ['rgba(255, 255, 255, 0.1)', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
          />
        )}
        {calendarLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm"
            role="status"
            aria-live="polite"
          >
            <div className="h-9 w-9 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <span className="sr-only">Loading GitHub activity</span>
          </div>
        )}
      </div>
    </div>
  );
}
