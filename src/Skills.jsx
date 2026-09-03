import React from 'react';

const SKILL_CATEGORIES = [
  {
    id: 'languages',
    label: 'Languages',
    skills: ['JavaScript', 'HTML5', 'CSS3'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Libraries',
    skills: ['React.js', 'Vite', 'Node.js', 'RESTful APIs'],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    skills: [
      'Git',
      'GitHub',
      'Figma / UI-UX',
      'Firebase',
      'Cloudflare Pages',
      'Linux Fundamentals',
      'Kali Linux',
    ],
  },
];

const Skills = () => {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Skills</h2>
        <p style={styles.subheading}>Tools and technologies I work with</p>
      </div>

      <div className="skills-category-grid" style={styles.categoryGrid}>
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.id} className="nyx-glass" style={styles.categoryCard}>
            <h3 style={styles.categoryLabel}>{category.label}</h3>
            <div style={styles.badgeGrid}>
              {category.skills.map((skill) => (
                <SkillBadge key={skill} label={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const SkillBadge = ({ label }) => {
  return (
    <span className="nyx-glass nyx-skill-badge" style={styles.badge}>
      {label}
    </span>
  );
};

const styles = {
  section: {
    width: '100%',
    padding: '48px 24px',
  },
  header: {
    maxWidth: '1200px',
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
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  categoryCard: {
    borderRadius: '14px',
    padding: '22px',
  },
  categoryLabel: {
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#c4b5fd',
    margin: '0 0 16px',
  },
  badgeGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '13px',
    fontWeight: 500,
    color: '#e5e3ec',
    padding: '8px 14px',
    borderRadius: '10px',
    cursor: 'default',
  },
};

export default Skills;
