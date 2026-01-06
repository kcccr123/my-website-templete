'use client';

import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';

interface GitHubActivityProps {
  username: string;
  title?: string;
  eventCount?: number;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  className?: string;
  showIcon?: boolean;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload: {
    commits?: Array<{ message: string }>;
    action?: string;
  };
}

export default function GitHubActivity({
  username,
  title = 'GitHub Activity',
  eventCount = 10,
  maxHeight = '400px',
  maxWidth = '100%',
  minHeight = '200px',
  className = '',
  showIcon = true
}: GitHubActivityProps) {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=${eventCount}`);
        if (!response.ok) throw new Error('Failed to fetch GitHub activity');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activity');
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [username, eventCount]);

  const getEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case 'PushEvent':
        const commitCount = event.payload.commits?.length || 0;
        return `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''}`;
      case 'CreateEvent':
        return 'Created repository';
      case 'PullRequestEvent':
        return `${event.payload.action} pull request`;
      case 'IssuesEvent':
        return `${event.payload.action} issue`;
      case 'WatchEvent':
        return 'Starred repository';
      case 'ForkEvent':
        return 'Forked repository';
      default:
        return event.type.replace('Event', '');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`glass-card ${className}`} style={{ maxHeight, maxWidth, minHeight, display: 'flex', flexDirection: 'column' }}>
      {title && (
        <div className="flex items-center gap-2 mb-4 flex-shrink-0">
          {showIcon && <FaGithub className="text-2xl" />}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      )}

      <div className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-glass-border)] scrollbar-track-transparent flex-1 min-h-0">
        {loading && (
          <div className="text-[var(--color-text-muted)] text-sm">Loading activity...</div>
        )}

        {error && (
          <div className="text-[var(--color-text-muted)] text-sm">{error}</div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-[var(--color-text-muted)] text-sm">No recent activity</div>
        )}

        {!loading && !error && events.map((event) => (
          <div
            key={event.id}
            className="p-3 rounded-lg border border-[var(--color-glass-border)] hover:border-[var(--color-glass-border-hover)] transition-all duration-300 hover:bg-[var(--color-glass)]"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[var(--color-text-secondary)] truncate">
                  {getEventDescription(event)}
                </div>
                <a
                  href={`https://github.com/${event.repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors truncate block"
                >
                  {event.repo.name}
                </a>
              </div>
              <div className="text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                {formatDate(event.created_at)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
