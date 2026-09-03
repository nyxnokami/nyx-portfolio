import React, { useState, useEffect } from 'react';

const AURA_COLORS = [
  { id: 'violet', label: 'Violet', hex: '#8b5cf6' },
  { id: 'indigo', label: 'Indigo', hex: '#6366f1' },
  { id: 'silver', label: 'Silver', hex: '#cbd5e1' },
];

const useIsDesktop = (breakpoint = 768) => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isDesktop;
};

const AuraSwitcherCard = () => {
  const [activeColor, setActiveColor] = useState(AURA_COLORS[0]);

  return (
    <div id="lab"
      className="nyx-glass"
      style={{
        ...styles.card,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 28px 4px ${activeColor.hex}55`,
        transition: 'box-shadow 0.4s ease',
      }}
    >
      <p style={styles.cardLabel}>Experiment 01</p>
      <h3 style={styles.cardTitle}>Ambient Aura Color Switcher</h3>
      <p style={styles.cardDescription}>
        Choose a hue to shift this card's glow ring in real time.
      </p>

      <div style={styles.swatchRow}>
        {AURA_COLORS.map((color) => {
          const isActive = activeColor.id === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => setActiveColor(color)}
              aria-label={`Set aura to ${color.label}`}
              aria-pressed={isActive}
              style={{
                ...styles.swatch,
                background: color.hex,
                transform: isActive ? 'scale(1.15)' : 'scale(1)',
                boxShadow: isActive
                  ? `0 0 12px 3px ${color.hex}99`
                  : '0 0 0 rgba(0,0,0,0)',
                outline: isActive
                  ? '2px solid rgba(255,255,255,0.7)'
                  : '2px solid transparent',
              }}
            />
          );
        })}
      </div>

      <p style={styles.statusLine}>
        Active aura: <span style={{ color: activeColor.hex }}>{activeColor.label}</span>
      </p>
    </div>
  );
};

const StardustSliderCard = () => {
  const [velocity, setVelocity] = useState(50);

  return (
    <div className="nyx-glass" style={styles.card}>
      <p style={styles.cardLabel}>Experiment 02</p>
      <h3 style={styles.cardTitle}>Stardust Speed Slider</h3>
      <p style={styles.cardDescription}>
        Drag to preview drift velocity. Wired to the background canvas soon.
      </p>

      <input
        type="range"
        min="0"
        max="100"
        value={velocity}
        onChange={(e) => setVelocity(Number(e.target.value))}
        aria-label="Stardust velocity"
        style={{
          ...styles.slider,
          background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${velocity}%, rgba(255,255,255,0.12) ${velocity}%, rgba(255,255,255,0.12) 100%)`,
        }}
      />

      <p style={styles.statusLine}>
        Velocity: <span style={styles.velocityValue}>{velocity}%</span>
      </p>
    </div>
  );
};

const NyxLab = () => {
  const isDesktop = useIsDesktop();

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Nyx Lab</h2>
        <p style={styles.subheading}>Small live experiments, built for play</p>
      </div>

      <div
        style={{
          ...styles.container,
          flexDirection: isDesktop ? 'row' : 'column',
        }}
      >
        <AuraSwitcherCard />
        <StardustSliderCard />
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
    maxWidth: '1000px',
    margin: '0 auto 32px',
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
  container: {
    display: 'flex',
    gap: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  card: {
    flex: 1,
    borderRadius: '16px',
    padding: '26px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  cardLabel: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#8b7fa8',
    margin: '0 0 8px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#f1eefb',
    margin: '0 0 10px',
  },
  cardDescription: {
    fontSize: '13.5px',
    lineHeight: 1.6,
    color: '#b8b2cc',
    margin: '0 0 24px',
  },
  swatchRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
  },
  swatch: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, outline 0.25s ease',
  },
  slider: {
    width: '100%',
    height: '6px',
    borderRadius: '999px',
    appearance: 'none',
    WebkitAppearance: 'none',
    outline: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  statusLine: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#a8a3ba',
    margin: 0,
    marginTop: 'auto',
  },
  velocityValue: {
    color: '#c4b5fd',
    fontWeight: 600,
  },
};

export default NyxLab;