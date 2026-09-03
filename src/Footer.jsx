import React from 'react';

const Footer = () => {
  return (
    <footer className="nyx-footer" style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.iconRow}>
          <a
            href="https://github.com/nyxnokami"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={styles.iconLink}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/olamiposi-ayomide-93723a420/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B0AKRTHr9Tr2diTEhoNUqUQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={styles.iconLink}
          >
            <LinkedInIcon />
          </a>
          <a
            href="mailto:olamia225@gmail.com"
            aria-label="Email"
            style={styles.iconLink}
          >
            <EmailIcon />
          </a>
        </div>

        <p className="nyx-footer-copy" style={styles.copyText}>
          © 2026 Nyx. Built with React &amp; Vite.
        </p>
      </div>
    </footer>
  );
};

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.28 8.75h3.7V21h-3.7V8.75ZM9.75 8.75h3.55v1.68h.05c.5-.9 1.71-1.85 3.52-1.85 3.76 0 4.46 2.35 4.46 5.41V21h-3.7v-6.32c0-1.51-.03-3.45-2.1-3.45-2.11 0-2.44 1.62-2.44 3.34V21h-3.7V8.75Z"
      fill="currentColor"
    />
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="m4 7 8 6 8-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const styles = {
  footer: {
    width: '100%',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '32px 24px',
  },
  inner: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '18px',
    textAlign: 'center',
  },
  iconRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  iconLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    color: '#b8b2cc',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(255, 255, 255, 0.02)',
    transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
  },
  copyText: {
    fontSize: '13px',
    color: '#9a94ab',
    margin: 0,
  },
};

export default Footer;
