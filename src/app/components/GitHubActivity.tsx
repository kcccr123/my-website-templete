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
    ref_type?: string;
    review?: { state?: string; html_url?: string };
    release?: { tag_name?: string };
    member?: { login?: string };
    pull_request?: { html_url?: string; number?: number; merged?: boolean; title?: string };
    issue?: { html_url?: string; pull_request?: { html_url?: string } };
    comment?: { html_url?: string };
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

  const formatAction = (action: string | undefined, noun: string, fallback: string) => {
    if (!action) return fallback;
    const actionMap: Record<string, string> = {
      opened: `Opened ${noun}`,
      closed: `Closed ${noun}`,
      reopened: `Reopened ${noun}`,
      created: `Created ${noun}`,
      edited: `Edited ${noun}`,
      deleted: `Deleted ${noun}`,
      published: `Published ${noun}`,
      released: `Released ${noun}`,
      prereleased: `Pre-released ${noun}`,
      publicized: `Publicized ${noun}`,
      assigned: `Assigned ${noun}`,
      unassigned: `Unassigned ${noun}`,
      labeled: `Labeled ${noun}`,
      unlabeled: `Unlabeled ${noun}`,
      synchronize: `Updated ${noun}`,
      synchronized: `Updated ${noun}`,
      review_requested: `Requested review for ${noun}`,
      review_request_removed: `Removed review request for ${noun}`,
      ready_for_review: `Marked ${noun} ready for review`,
      locked: `Locked ${noun}`,
      unlocked: `Unlocked ${noun}`,
      pinned: `Pinned ${noun}`,
      unpinned: `Unpinned ${noun}`,
      transferred: `Transferred ${noun}`,
      restored: `Restored ${noun}`,
      added: `Added ${noun}`,
      removed: `Removed ${noun}`,
      started: `Starred ${noun}`,
      submitted: `Reviewed ${noun}`,
      dismissed: `Dismissed review on ${noun}`
    };
    if (actionMap[action]) return actionMap[action];

    const humanized = action
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (match) => match.toUpperCase());
    return `${humanized} ${noun}`;
  };

  const formatReviewState = (state: string | undefined) => {
    switch (state) {
      case 'approved':
        return 'Approved';
      case 'changes_requested':
        return 'Requested changes on';
      case 'commented':
        return 'Commented on';
      case 'dismissed':
        return 'Dismissed review on';
      default:
        return 'Reviewed';
    }
  };

  const getEventLink = (event: GitHubEvent) => {
    const prUrl =
      event.payload.pull_request?.html_url || event.payload.issue?.pull_request?.html_url;
    const prNumber = event.payload.pull_request?.number;

    switch (event.type) {
      case 'PullRequestEvent':
      case 'PullRequestReviewEvent':
      case 'PullRequestReviewCommentEvent':
        if (prUrl) {
          return {
            url: prUrl,
            label: prNumber ? `PR #${prNumber}` : 'View PR'
          };
        }
        if (event.payload.review?.html_url) {
          return { url: event.payload.review.html_url, label: 'View review' };
        }
        if (event.payload.comment?.html_url) {
          return { url: event.payload.comment.html_url, label: 'View comment' };
        }
        return null;
      case 'IssueCommentEvent':
        if (prUrl) {
          return { url: prUrl, label: 'View PR' };
        }
        if (event.payload.issue?.html_url) {
          return { url: event.payload.issue.html_url, label: 'View issue' };
        }
        if (event.payload.comment?.html_url) {
          return { url: event.payload.comment.html_url, label: 'View comment' };
        }
        return null;
      default:
        return null;
    }
  };

  const getEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case 'PushEvent':
        return event.payload.ref
          ? `Pushed to ${event.payload.ref.split('/').pop()}`
          : 'Pushed commits';
      case 'CreateEvent':
        if (event.payload.ref_type === 'repository') return 'Created repository';
        if (event.payload.ref_type && event.payload.ref) {
          return `Created ${event.payload.ref_type} ${event.payload.ref}`;
        }
        return 'Created';
      case 'PullRequestEvent':
        if (event.payload.action === 'closed' && event.payload.pull_request?.merged) {
          return 'Merged pull request';
        }
        return formatAction(event.payload.action, 'pull request', 'Updated pull request');
      case 'IssuesEvent':
        return formatAction(event.payload.action, 'issue', 'Updated issue');
      case 'IssueCommentEvent':
        return event.payload.action === 'created' || !event.payload.action
          ? 'Commented on issue'
          : formatAction(event.payload.action, 'issue comment', 'Commented on issue');
      case 'PullRequestReviewEvent': {
        const verb = formatReviewState(event.payload.review?.state);
        return `${verb} pull request`;
      }
      case 'PullRequestReviewCommentEvent':
        return event.payload.action === 'created' || !event.payload.action
          ? 'Commented on pull request review'
          : formatAction(event.payload.action, 'pull request review', 'Commented on pull request review');
      case 'CommitCommentEvent':
        return event.payload.action === 'created' || !event.payload.action
          ? 'Commented on commit'
          : formatAction(event.payload.action, 'commit comment', 'Commented on commit');
      case 'ReleaseEvent': {
        const release = formatAction(event.payload.action, 'release', 'Published release');
        return event.payload.release?.tag_name
          ? `${release} ${event.payload.release.tag_name}`
          : release;
      }
      case 'WatchEvent':
        return 'Starred repository';
      case 'ForkEvent':
        return 'Forked repository';
      case 'DeleteEvent':
        if (event.payload.ref_type && event.payload.ref) {
          return `Deleted ${event.payload.ref_type} ${event.payload.ref}`;
        }
        return 'Deleted';
      case 'PublicEvent':
        return 'Open-sourced repository';
      case 'GollumEvent':
        return 'Updated wiki';
      case 'MemberEvent':
        return event.payload.member?.login
          ? `Added ${event.payload.member.login} as collaborator`
          : 'Added collaborator';
      default:
        return event.type
          .replace('Event', '')
          .replace(/([a-z])([A-Z])/g, '$1 $2');
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

        {!loading && !error && events.map((event) => {
          const eventLink = getEventLink(event);
          return (
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
                  {eventLink && (
                    <a
                      href={eventLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-300 hover:text-blue-200 transition-colors truncate block"
                    >
                      {eventLink.label}
                    </a>
                  )}
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
          );
        })}

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
