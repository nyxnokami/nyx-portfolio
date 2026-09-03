import React from 'react';

const Hero = () => {
  return (
    <section style={styles.section} id="hero">
      <div style={styles.content}>
        {/* Added nyx-fade-in-delayed class for the text cascade */}
        <p className="nyx-fade-in-delayed" style={styles.subHeading}>Welcome to the Night</p>

        {/* Added nyx-fade-in class so your name lifts smoothly into view */}
        <h1 className="nyx-fade-in" style={styles.headline}>
          Olamiposi Ayomide <span style={styles.headlineAccent}>(Nyx)</span>
        </h1>

        {/* Added nyx-fade-in-delayed class */}
        <div className="nyx-fade-in-delayed" style={styles.statusRow}>
          <span style={styles.statusDotWrapper} aria-hidden="true">
            <span style={styles.statusDotPulse} />
            <span style={styles.statusDotCore} />
          </span>
          <span style={styles.statusText}>Available for new projects</span>
        </div>

        {/* Added nyx-fade-in-delayed class */}
        <div className="nyx-glass nyx-fade-in-delayed" style={styles.chronicleCard}>
          <p style={styles.chronicleLabel}> THE CHRONICLE</p>
          <div style={styles.chronicleBody}>
            <p style={styles.chronicleParagraph}>
            Hi, I'm Nyx. I build things that live on the internet and occasionally break 
            things that live on my terminal (by mistake, mostly).
            By day I'm a computer science student; by night and most of the day too, 
            honestly I'm knee-deep in React components, chasing pixel-perfect UI, or 
            poking around Kali Linux just to understand how things fall apart so I can build them sturdier.
            Enough Linux to be dangerous, enough Git to be humble.
            </p>
            <p style={styles.chronicleParagraph}>
            Not a 10x developer. Just a very stubborn one.I ship things, then immediately want to rebuild them better.
            But I'm still figuring it out, one commit at a time.When I'm not shipping 
            something, I'm probably learning Japanese badly or losing a chess game I was 
            definitely winning ten moves ago.I debug like I play chess — 
            three moves ahead, then suddenly very lost.
            </p>
          </div>
        </div>

        {/* Added nyx-fade-in-delayed class, and removed comment glitch */}
        <a 
          href="#projects"
          className="nyx-glass nyx-interactive nyx-fade-in-delayed"
          style={styles.ctaButton}
        >
          Explore the Archive
        </a>

      </div>
    </section>
  );
};

const styles = {
  section: {
    width: '100%',
    // UPDATED: Added clamp padding to the top edge to push the layout safely below the viewport
    padding: 'clamp(8rem, 15vw, 12rem) 0 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '760px',
    padding: '0 24px',
  },
  subHeading: {
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    margin: '0 0 20px',
  },
  headline: {
    fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    margin: '0 0 20px',
    letterSpacing: '-0.02em',
  },
  headlineAccent: {
    display: 'inline-block',
    background:
      'linear-gradient(90deg, var(--accent-violet), var(--accent-indigo))',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '32px',
  },
  statusDotWrapper: {
    position: 'relative',
    width: '10px',
    height: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDotCore: {
    position: 'absolute',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#4ade80',
    zIndex: 2,
  },
  statusDotPulse: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'rgba(74, 222, 128, 0.55)',
    animation: 'pulse 2s ease-out infinite',
    zIndex: 1,
  },
  statusText: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#a8a3ba',
  },
  chronicleCard: {
    width: '100%',
    borderRadius: '16px',
    padding: '28px 30px',
    marginBottom: '32px',
    textAlign: 'left',
    boxSizing: 'border-box',
  },
  chronicleLabel: {
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#8b7fa8',
    margin: '0 0 16px',
    fontFamily: 'monospace',
  },
  chronicleBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  chronicleParagraph: {
    fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
    lineHeight: 1.7,
    color: '#c9c3db',
    margin: 0,
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 32px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    color: '#f1eefb',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default Hero;
