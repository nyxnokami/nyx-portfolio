import React, { useState, useEffect, useRef, useCallback } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', targetId: 'hero' },
  { id: 'projects', label: 'Projects', targetId: 'projects' },
  { id: 'lab', label: 'Nyx Lab', targetId: 'lab' },
  { id: 'blog', label: 'Blog', targetId: 'blog' },
  { id: 'skills', label: 'Skills', targetId: 'skills' },
  { id: 'experience', label: 'Experience', targetId: 'experience' },
  { id: 'contact', label: 'Contact', targetId: 'contact' },
];

const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isEclipseMode, setIsEclipseMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Global hotkey listener: Ctrl+K / Cmd+K to toggle, Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';

      if (isCmdK) {
        e.preventDefault();
        toggleMenu();
        return;
      }

      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleMenu, closeMenu]);

  // Autofocus the search input whenever the menu opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  const handleNavigation = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleEclipseToggle = () => {
    document.body.classList.toggle('twilight-eclipse');
    setIsEclipseMode((prev) => !prev);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  const normalizedQuery = query.trim().toLowerCase();

  const filteredNav = NAV_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(normalizedQuery)
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) =>
        filteredNav.length === 0 ? 0 : (prev + 1) % filteredNav.length
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        filteredNav.length === 0
          ? 0
          : (prev - 1 + filteredNav.length) % filteredNav.length
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredNav[activeIndex];
      if (!selected) return;
      handleNavigation(selected.targetId);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={openMenu}
        aria-label="Open command menu"
        title="Open command menu (Ctrl+K)"
        style={styles.moonButton}
      >
        <MoonIcon />
      </button>
    );
  }

  return (
    <div
      style={styles.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={panelRef}
        className="nyx-glass"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        style={styles.panel}
      >
        <div style={styles.inputWrapper}>
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or search..."
            aria-label="Search commands"
            style={styles.input}
          />
          <kbd style={styles.escHint}>Esc</kbd>
        </div>

        <div style={styles.resultsScrollArea}>
          {filteredNav.length > 0 && (
            <div role="group" aria-labelledby="cmd-nav-heading">
              <p id="cmd-nav-heading" style={styles.groupHeading}>
                Navigation
              </p>
              <ul style={styles.list}>
                {filteredNav.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleNavigation(item.targetId)}
                        onMouseEnter={() => setActiveIndex(index)}
                        style={{
                          ...styles.listItem,
                          ...(isActive ? styles.listItemActive : {}),
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {filteredNav.length === 0 && (
            <p style={styles.noResults}>No results found.</p>
          )}
        </div>

        <div style={styles.eclipseRow}>
          <span style={styles.eclipseLabel}>Core Matrix Level</span>
          <button
            type="button"
            onClick={handleEclipseToggle}
            aria-pressed={isEclipseMode}
            style={{
              ...styles.eclipseButton,
              ...(isEclipseMode ? styles.eclipseButtonActive : {}),
            }}
          >
            {isEclipseMode ? '🌑 Full Twilight' : '🌙 Midnight Obsidian'}
          </button>
        </div>
      </div>
    </div>
  );
};

const MoonIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0, opacity: 0.6 }}
  >
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M21 21l-4.35-4.35"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const styles = {
  moonButton: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    border: '1px solid rgba(139, 92, 246, 0.35)',
    background: 'rgba(20, 18, 30, 0.75)',
    color: '#c4b5fd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 24px rgba(139, 92, 246, 0.25)',
    zIndex: 1000,
    backdropFilter: 'blur(6px)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(8, 6, 14, 0.55)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '12vh',
    zIndex: 1100,
  },
  panel: {
    width: 'min(560px, 90vw)',
    maxHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '14px',
    background: 'rgba(24, 20, 36, 0.7)',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#e5e3ec',
    fontSize: '15px',
  },
  escHint: {
    fontSize: '11px',
    color: '#9a94ab',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '4px',
    padding: '2px 6px',
  },
  resultsScrollArea: {
    overflowY: 'auto',
    padding: '8px 8px 12px',
    flex: 1,
  },
  groupHeading: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#8b7fa8',
    padding: '10px 12px 4px',
    margin: 0,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    color: '#e5e3ec',
    fontSize: '14px',
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  listItemActive: {
    background: 'rgba(139, 92, 246, 0.18)',
  },
  noResults: {
    padding: '20px 12px',
    textAlign: 'center',
    color: '#8b7fa8',
    fontSize: '13px',
  },
  eclipseRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '14px 16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  },
  eclipseLabel: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#8b7fa8',
  },
  eclipseButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#e5e3ec',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    borderRadius: '999px',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
  },
  eclipseButtonActive: {
    background: 'rgba(139, 92, 246, 0.18)',
    borderColor: 'rgba(139, 92, 246, 0.45)',
    boxShadow: '0 0 16px rgba(139, 92, 246, 0.35)',
  },
};

export default CommandMenu;