import React, { useState } from 'react';

const COMMAND_RESPONSES = {
  '/help': 'Try typing: /socials or /sudo nyx',
  '/socials': 'Opening stargates to GitHub and LinkedIn!',
  '/sudo nyx': 'God Mode Activated: Core constellation matrix realigned.',
};

const CosmicTerminal = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const command = inputValue.trim().toLowerCase();

    if (command === '/help') {
      alert(COMMAND_RESPONSES['/help']);
    } else if (command === '/socials') {
      alert(COMMAND_RESPONSES['/socials']);
    } else if (command === '/sudo nyx') {
      alert(COMMAND_RESPONSES['/sudo nyx']);
    } else if (command.length > 0) {
      alert(`Unknown command: "${inputValue}". Try /help.`);
    }

    setInputValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="nyx-glass"
      style={styles.wrapper}
    >
      <span style={styles.prompt} aria-hidden="true">
        nyx@system:~#
      </span>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type /help for secret commands..."
        aria-label="Cosmic terminal command input"
        autoComplete="off"
        spellCheck="false"
        style={styles.input}
      />
    </form>
  );
};

const styles = {
  wrapper: {
    width: '100%',
    maxWidth: '640px',
    maxHeight: '60px',
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 16px',
    borderRadius: '10px',
    boxSizing: 'border-box',
    margin: '0 auto',
  },
  prompt: {
    fontFamily: 'monospace',
    fontSize: '13px',
    fontWeight: 600,
    color: '#8b5cf6',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    minWidth: 0,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontFamily: 'monospace',
    fontSize: '13px',
    color: '#e5e3ec',
    padding: '4px 0',
  },
};

export default CosmicTerminal;