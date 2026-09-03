import React, { useState, useEffect } from 'react';

const MILESTONES = [
  {
    id: 'ms-1',
    year: '2025',
    role: 'B.Sc. Computer Science',
    org: 'Obafemi Awolowo University',
    summary:
      'Began a five-year program covering computer science, mathematics, statistics, and physics fundamentals.',
  },
  {
    id: 'ms-2',
    year: '2026',
    role: 'Linux 100: Fundamentals Certification',
    org: 'TCM Security',
    summary:
      'Completed a 2 CEU-hour certification building a solid foundation in Linux fundamentals.',
  },
  {
    id: 'ms-3',
    year: '2026',
    role: 'IoT and Digital Transformation Certification',
    org: 'Cisco Networking Academy',
    summary:
      'Earned a certificate exploring the fundamentals of IoT and digital transformation.',
  },
  {
    id: 'ms-4',
    year: '2026',
    role: 'Sentinel — Uptime & Latency Monitor',
    org: 'Personal Project',
    summary:
      'Built a Node.js backend and React dashboard for real-time service health monitoring.',
  },
  {
    id: 'ms-5',
    year: '2026',
    role: 'Frontend / Full-Stack Developer',
    org: 'Oito Consulting Agency',
    summary:
      'Joined Oito Consulting Agency, contributing full-stack builds with a UI/UX-driven approach.',
  },
];

const useIsDesktop = (breakpoint = 768) => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isDesktop;
};

const Experience = () => {
  const isDesktop = useIsDesktop();

  return (
    <section style={styles.section} id="experience">
      <div style={styles.header}>
        <h2 style={styles.heading}>Experience</h2>
        <p style={styles.subheading}>A timeline of work, projects, and study</p>
      </div>

      <div style={styles.timelineWrapper}>
        <div
          style={{
            ...styles.track,
            left: isDesktop ? '50%' : '18px',
            transform: isDesktop ? 'translateX(-50%)' : 'none',
          }}
          aria-hidden="true"
        />

        <ul style={styles.list}>
          {MILESTONES.map((item, index) => {
            const isLeftSide = isDesktop && index % 2 === 0;
            const isRightSide = isDesktop && index % 2 === 1;

            return (
              <li
                key={item.id}
                style={{
                  ...styles.item,
                  paddingLeft: isDesktop ? (isRightSide ? '52%' : 0) : '48px',
                  paddingRight: isDesktop ? (isLeftSide ? '52%' : 0) : 0,
                  textAlign: isDesktop
                    ? isLeftSide
                      ? 'right'
                      : 'left'
                    : 'left',
                }}
              >
                <span
                  style={{
                    ...styles.bullet,
                    left: isDesktop ? '50%' : '10px',
                    transform: isDesktop ? 'translateX(-50%)' : 'none',
                  }}
                  aria-hidden="true"
                >
                  <span style={styles.bulletCore} />
                  <span style={styles.bulletPulse} />
                </span>

                <div
                  className="nyx-glass"
                  style={{
                    ...styles.card,
                    marginLeft: isDesktop && isRightSide ? '24px' : undefined,
                    marginRight: isDesktop && isLeftSide ? '24px' : undefined,
                    display: 'inline-block',
                    width: isDesktop ? '100%' : 'auto',
                  }}
                >
                  <div
                    style={{
                      ...styles.cardHeader,
                      justifyContent:
                        isDesktop && isLeftSide ? 'flex-end' : 'space-between',
                      flexDirection:
                        isDesktop && isLeftSide ? 'row-reverse' : 'row',
                    }}
                  >
                    <span style={styles.year}>{item.year}</span>
                  </div>
                  <h3 style={styles.role}>{item.role}</h3>
                  <p style={styles.org}>{item.org}</p>
                  <p style={styles.summary}>{item.summary}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

const styles = {
  section: {
    width: '100%',
    padding: '48px 24px',
  },
  header: {
    maxWidth: '900px',
    margin: '0 auto 40px',
  },
  heading: {
    fontSize: '26px',
    fontWeight: 600,
    color: '#f1eefb',
    margin: '0 0 6px',
  },
  subheading: {
    fontSize: '14px',
    color: '#9a94ab',
    margin: 0,
  },
  timelineWrapper: {
    position: 'relative',
    maxWidth: '900px',
    margin: '0 auto',
  },
  track: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '2px',
    background:
      'linear-gradient(to bottom, var(--accent-indigo, #6366f1), transparent 92%)',
    boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  item: {
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
  },
  bullet: {
    position: 'absolute',
    top: '8px',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  bulletCore: {
    position: 'absolute',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#a5b4fc',
    boxShadow: '0 0 8px 2px rgba(99, 102, 241, 0.7)',
    zIndex: 2,
  },
  bulletPulse: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: 'rgba(99, 102, 241, 0.25)',
    animation: 'nyxBulletPulse 2.4s ease-in-out infinite',
    zIndex: 1,
  },
  card: {
    borderRadius: '14px',
    padding: '18px 20px',
    boxSizing: 'border-box',
    maxWidth: '100%',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '6px',
  },
  year: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: '#a5b4fc',
  },
  role: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#f1eefb',
    margin: '0 0 4px',
    lineHeight: 1.35,
  },
  org: {
    fontSize: '12.5px',
    fontWeight: 500,
    color: '#c4b5fd',
    margin: '0 0 10px',
    lineHeight: 1.4,
  },
  summary: {
    fontSize: '13px',
    lineHeight: 1.55,
    color: '#b8b2cc',
    margin: 0,
  },
};

export default Experience;