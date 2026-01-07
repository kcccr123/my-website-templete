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
  commitLinks?: Array<{ sha: string; url: string; message?: string }>;
  payload: {
    commits?: Array<{ message?: string; sha?: string }>;
    action?: string;
    size?: number;
    distinct_size?: number;
    before?: string;
    head?: string;
    ref?: string;
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
        const response = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=${eventCount}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        if (!response.ok) throw new Error('Failed to fetch GitHub activity');
        const data = await response.json();
        const enriched = await Promise.all(
          (data as GitHubEvent[]).map(async (event) => {
            if (event.type !== 'PushEvent') {
              return event;
            }

            const repoName = event.repo?.name;
            const head = event.payload.head;
            if (!repoName || !head) {
              return event;
            }

            const [owner, repo] = repoName.split('/');
            if (!owner || !repo) {
              return event;
            }

            try {
              const commitResponse = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/commits/${head}`,
                {
                  headers: {
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                  },
                }
              );
              if (!commitResponse.ok) {
                throw new Error('Failed to fetch commit');
              }
              const commitData = await commitResponse.json();
              const commitUrl =
                typeof commitData.html_url === 'string'
                  ? commitData.html_url
                  : `https://github.com/${repoName}/commit/${head}`;
              const commitMessage =
                typeof commitData.commit?.message === 'string'
                  ? commitData.commit.message
                  : undefined;
              return {
                ...event,
                commitLinks: [{ sha: head, url: commitUrl, message: commitMessage }]
              };
            } catch {
              return {
                ...event,
                commitLinks: [{ sha: head, url: `https://github.com/${repoName}/commit/${head}` }]
              };
            }
          })
        );
        setEvents(enriched);
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
        return event.payload.ref
          ? `Pushed to ${event.payload.ref.split('/').pop()}`
          : 'Pushed commits';
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

      <div className="relative space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-glass-border)] scrollbar-track-transparent flex-1 min-h-0">
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
                {event.commitLinks && event.commitLinks.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {event.commitLinks.slice(0, 2).map((commit) => {
                      const label = commit.message?.split("\n")[0]?.trim() || `Commit ${commit.sha.slice(0, 7)}`;
                      return (
                        <a
                          key={commit.sha}
                          href={commit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-300 hover:text-blue-200 transition-colors"
                          title={commit.message}
                        >
                          {label}
                        </a>
                      );
                    })}
                    {event.commitLinks.length > 2 && (
                      <span className="text-xs text-[var(--color-text-muted)]">
                        +{event.commitLinks.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                {formatDate(event.created_at)}
              </div>
            </div>
          </div>
        ))}

        {loading && !error && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3 text-sm text-white/80">
              <div className="h-8 w-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>Loading activity...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
