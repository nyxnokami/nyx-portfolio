import React, { useState, useRef, useCallback } from 'react';
import './ProjectCards.css';

const PROJECTS = [
  {
    id: 'proj-1',
    title: 'Sentinel',
    description:
      'A backend-focused uptime and latency monitor with a real-time analytics dashboard for tracking service health across environments.',
    tech: ['Node.js', 'Express', 'React', 'Firebase'],
    githubLink: 'https://github.com/nyxnokami/sentinel',
    liveLink: 'https://818f51a1.sentinel-dashboard-6kj.pages.dev/',
  },
  {
    id: 'proj-2',
    title: 'Acts 29',
    description:
      'A memorial and yearbook website for a church cell group, built with a focus on smooth navigation and archival storytelling.',
    tech: ['React', 'Vite', 'Firebase', 'Cloudflare Pages'],
    githubLink: 'https://github.com/nyxnokami/Acts29webpage',
    liveLink: 'https://acts29.pages.dev',
  },
  {
    id: 'proj-3',
    title: 'Nyx Calculator',
    description:
      'A personal Flutter calculator app with a custom deployment pipeline, designed for speed and a minimal, distraction-free interface.',
    tech: ['Flutter', 'Dart', 'CI/CD'],
    githubLink: 'https://github.com/nyxnokami/Calculator-app',
    liveLink: 'https://nyxnokami.github.io/Calculator-app/',
  },
  {
    id: 'proj-4', // 👈 Added your new portfolio as the 4th project card
    title: 'Nyx Portfolio',
    description:
      'A premium, single-page creative showcase featuring low-overhead HTML5 canvas particles, 3D mouse parallax tracking, and custom context state transitions.',
    tech: ['React', 'Vite', 'CSS Variables', 'HTML5 Canvas'],
    githubLink: 'https://github.com/nyxnokami', // Replace with your portfolio repo if needed
    liveLink: 'http://localhost:5173',          // This loops into itself seamlessly
  },

{
  id: 'proj-5', 
  title: 'Epicure — Fine Dining, Full Stack',
  description:
    'Restaurant ordering site with a live cart, reservation system, and a passcode-gated admin dashboard for managing bookings.',
  tech: ['Git/GitHub', 'Client-side Data Persistence', 'Security-conscious Development', 'HTML5 Canvas'],
  githubLink: 'https://github.com/nyxnokami/epicure',
  liveLink: 'https://epicure-4uq.pages.dev/',          
},
{
id: 'proj-6', 
title: 'Rehoboth Crest Homes — Real Estate',
description:
  'Photography-free real estate site — hand-drawn architectural SVG illustrations in place of stock photos, built on a navy-and-brass blueprint design system.',
tech: ['Vanilla JavaScript', 'Typography', 'Design Systems', 'SVG (hand-authored)'],
githubLink: 'https://github.com/nyxnokami/rehoboth-crest-homes',
liveLink: 'https://rehoboth-crest-homes.pages.dev/',          
},
];

const MAX_TILT_DEG = 12;

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState(
    'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const rotateY = percentX * MAX_TILT_DEG;
    const rotateX = -percentY * MAX_TILT_DEG;

    setTransformStyle(
      `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(1.03, 1.03, 1.03)`
    );

    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTransformStyle('rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPosition({ x: 50, y: 50 });
  }, []);

  return (
    <div id="projects"
      style={styles.cardOuter}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          ...styles.shadowTrail,
          opacity: isHovering ? 0.55 : 0,
          transform: `translate(${(glowPosition.x - 50) * 0.4}px, ${
            (glowPosition.y - 50) * 0.4 + 20
          }px)`,
        }}
        aria-hidden="true"
      />

      <div
        ref={cardRef}
        className="nyx-glass nyx-interactive"
        style={{
          ...styles.card,
          transform: transformStyle,
          transition: isHovering
            ? 'transform 0.05s ease-out'
            : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div
          style={{
            ...styles.hoverGlow,
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(139, 92, 246, 0.25), transparent 60%)`,
          }}
          aria-hidden="true"
        />

        <div style={styles.cardContent}>
          <h3 style={styles.title}>{project.title}</h3>
          <p style={styles.description}>{project.description}</p>

          <div style={styles.tagRow}>
            {project.tech.map((tag) => (
              <span key={tag} style={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div style={styles.linkRow}>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.linkButton}
            >
              GitHub
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.linkButton, ...styles.linkButtonPrimary }}
            >
              Live Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCards = () => {
  return (
    <section className="project-cards-section">
      <div className="project-cards-grid">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const styles = {
  cardOuter: {
    position: 'relative',
    perspective: '1000px',
  },
  shadowTrail: {
    position: 'absolute',
    inset: '10% 5%',
    borderRadius: '20px',
    background:
      'radial-gradient(ellipse at center, var(--accent-violet, #8b5cf6) 0%, transparent 70%)',
    filter: 'blur(28px)',
    transition: 'opacity 0.4s ease, transform 0.3s ease',
    pointerEvents: 'none',
    zIndex: 0,
  },
  card: {
    position: 'relative',
    zIndex: 1,
    borderRadius: '16px',
    padding: '28px',
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    transformStyle: 'preserve-3d',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  hoverGlow: {
    position: 'absolute',
    inset: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
  cardContent: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transform: 'translateZ(20px)',
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#f1eefb',
    margin: '0 0 10px',
  },
  description: {
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#b8b2cc',
    margin: '0 0 20px',
    flexGrow: 1,
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px',
  },
  tag: {
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.02em',
    color: '#c4b5fd',
    background: 'rgba(139, 92, 246, 0.14)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '999px',
    padding: '4px 10px',
  },
  linkRow: {
    display: 'flex',
    gap: '12px',
  },
  linkButton: {
    flex: 1,
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: 500,
    color: '#e5e3ec',
    textDecoration: 'none',
    padding: '9px 14px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    background: 'rgba(255, 255, 255, 0.03)',
    transition: 'background 0.2s ease, border-color 0.2s ease',
  },
  linkButtonPrimary: {
    color: '#f1eefb',
    background: 'rgba(139, 92, 246, 0.22)',
    borderColor: 'rgba(139, 92, 246, 0.45)',
  },
};

export default ProjectCards;
