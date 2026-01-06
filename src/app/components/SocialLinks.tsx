'use client';

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface SocialLinksProps {
  github?: string;
  linkedin?: string;
  email?: string;
  title?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  className?: string;
}

export default function SocialLinks({ 
  github,
  linkedin,
  email,
  title = 'Socials',
  maxHeight = '400px',
  maxWidth = '100%',
  minHeight = '150px',
  className = ''
}: SocialLinksProps) {

  return (
    <div className={`glass-card ${className}`} style={{ maxHeight, maxWidth, minHeight, display: 'flex', flexDirection: 'column' }}>
      {title && <h2 className="text-[clamp(1.05rem,1.6vw,1.4rem)] font-semibold mb-4 flex-shrink-0">{title}</h2>}
      <div className="flex flex-col gap-[clamp(0.6rem,1.2vw,0.9rem)] overflow-y-auto flex-1 min-h-0">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[clamp(0.6rem,1.4vw,0.9rem)] px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.6rem,1.2vw,0.95rem)] rounded-lg border border-[var(--color-glass-border)] text-[clamp(0.95rem,1.4vw,1.15rem)] hover:border-[var(--color-glass-border-hover)] transition-all duration-300 hover:bg-[var(--color-glass)] group"
          >
            <FaGithub className="text-[clamp(1.4rem,2.2vw,1.9rem)] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors duration-300">
              GitHub
            </span>
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[clamp(0.6rem,1.4vw,0.9rem)] px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.6rem,1.2vw,0.95rem)] rounded-lg border border-[var(--color-glass-border)] text-[clamp(0.95rem,1.4vw,1.15rem)] hover:border-[var(--color-glass-border-hover)] transition-all duration-300 hover:bg-[var(--color-glass)] group"
          >
            <FaLinkedin className="text-[clamp(1.4rem,2.2vw,1.9rem)] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors duration-300">
              LinkedIn
            </span>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-[clamp(0.6rem,1.4vw,0.9rem)] px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.6rem,1.2vw,0.95rem)] rounded-lg border border-[var(--color-glass-border)] text-[clamp(0.95rem,1.4vw,1.15rem)] hover:border-[var(--color-glass-border-hover)] transition-all duration-300 hover:bg-[var(--color-glass)] group"
          >
            <FaEnvelope className="text-[clamp(1.4rem,2.2vw,1.9rem)] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors duration-300">
              {email}
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
