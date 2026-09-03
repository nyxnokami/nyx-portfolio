import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  const handleSubmit = (e) => {
    setStatus('submitting');
    // Netlify intercepts the POST natively; this just tracks local UI state.
    // No preventDefault so the native form submission reaches Netlify.
  };

  const getInputStyle = (fieldName) => ({
    ...styles.input,
    borderColor:
      focusedField === fieldName
        ? 'var(--accent-violet)'
        : 'rgba(255, 255, 255, 0.14)',
    boxShadow:
      focusedField === fieldName
        ? '0 0 0 3px rgba(139, 92, 246, 0.18)'
        : 'none',
  });

  return (
    <section style={styles.section} id="contact">
      <div className="nyx-glass nyx-interactive" style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Get in Touch</h2>
          <p style={styles.subheading}>
            Have a project in mind? Send a message.
          </p>
        </div>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input type="hidden" name="form-name" value="contact" />

          <div style={styles.field}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              placeholder="Your name"
              style={getInputStyle('name')}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              placeholder="you@example.com"
              style={getInputStyle('email')}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="message" style={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              placeholder="Tell me about your project..."
              style={{ ...getInputStyle('message'), resize: 'vertical' }}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

const styles = {
  section: {
    width: '100%',
    padding: '48px 24px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '560px',
    borderRadius: '16px',
    padding: '36px 32px',
  },
  header: {
    marginBottom: '28px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#f1eefb',
    margin: '0 0 6px',
  },
  subheading: {
    fontSize: '14px',
    color: '#9a94ab',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: '#a8a3ba',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '14px',
    color: '#e5e3ec',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  submitButton: {
    marginTop: '8px',
    width: '100%',
    padding: '13px 20px',
    borderRadius: '10px',
    border: 'none',
    background:
      'linear-gradient(90deg, var(--accent-violet), var(--accent-indigo))',
    color: '#f9f8fd',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
  },
};

export default ContactForm;