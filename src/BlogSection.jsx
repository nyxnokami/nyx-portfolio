import React, { useState, useEffect, useCallback } from 'react';

const BLOG_POSTS = [
  {
    id: 'post-1',
    date: 'Networking / OSINT · ~3 min read',
    title: 'What Your Instagram Post Is Actually Telling a Stranger',
    excerpt:
      "You post a coffee cup on a wooden table. Nice light, cute mug, \"good morning\" caption. Innocent, right?",
    body: `You post a coffee cup on a wooden table. Nice light, cute mug, "good morning" caption. Innocent, right?

A stranger with ten minutes and no hacking skills can pull: your rough location (metadata, background reflections, that one time you geotagged), your daily routine (post times), your workplace (badge in the background of an old photo), and your relationship status (who keeps commenting "miss you"). None of that required breaking into anything. It's called OSINT — open-source intelligence — and it's the same skillset governments and journalists use, except anyone can do it with a search bar and patience.

This isn't paranoia bait. It's the actual plot of LifeHack (2026), a heist thriller where a crew of teenage hackers doesn't break any encryption to rob a billionaire — they just study his daughter's overshared social media until they know enough to impersonate their way past customer support. The scary part isn't the hacking. It's how little hacking was required.

The fix isn't "delete social media." It's knowing what you're leaking. Turn off geotagging. Post the coffee photo, skip the location pin. Assume anything public is permanent and searchable, because it is.

If you want to see this play out on screen, watch LifeHack — it's a decent case study disguised as a heist movie.`,
  },
  {
    id: 'post-2',
    date: 'Frontend / UX · ~2 min read',
    title: 'Micro-Interactions Are the Difference Between "Fine" and "Expensive"',
    excerpt:
      'Two buttons do the exact same thing. One feels cheap, one feels expensive. The difference is never the color.',
    body: `Two buttons do the exact same thing. One feels cheap, one feels expensive. The difference is never the color — it's what happens in the 200 milliseconds after you click.

A button that just changes color on click feels like a light switch. A button that scales down slightly, holds for a beat, then releases with a subtle bounce — that feels like you did something. Your brain registers physical feedback even though nothing physical happened. That's the whole trick.

Good micro-interactions follow one rule: they should explain themselves without a tooltip. A form field that shakes gently on a validation error tells you "wrong" faster than red text does. A loading spinner that morphs into a checkmark tells the story of a request completing without you reading a single word.

The trap is doing too much. If every element on the page animates, nothing feels special — it's just noise. Save the flourish for moments that deserve attention: form submission, a successful save, an important state change. Everything else should just work, quietly.

Cheap products move fast and jarring. Expensive ones move like they have somewhere to be but aren't in a rush.`,
  },
  {
    id: 'post-3',
    date: 'Full-stack / Backend · ~3 min read',
    title: 'What Actually Happens When You Click "Submit"',
    excerpt:
      'You fill out a form, click submit, and half a second later you see "Success!" More happened than you think.',
    body: `You fill out a form, click submit, and half a second later you see "Success!" In that half second, more happened than most users will ever think about.

First, the browser validates your input client-side — checking the email field looks like an email before it even leaves your device, so you don't waste a round trip on an obvious typo. Then it packages your data and sends an HTTP request to a server somewhere, carrying your data plus metadata like headers and cookies.

The server receives it and immediately distrusts it. Client-side validation is a courtesy, not a security measure — anyone can bypass it with dev tools. So the server re-validates everything: right format, right length, no malicious script hiding in a text field. This is where a lot of beginner backends fail quietly, trusting the frontend's word for it.

If validation passes, the server usually writes to a database, maybe triggers a side effect — an email, a notification, a log entry — then sends a response back. Your frontend receives that response and finally shows you "Success," or, if something went wrong, an error message that (hopefully) doesn't leak internal details about your server.

All of that, in under a second, dozens of times a day, mostly invisible. Next time a form loads a little slow, you'll know exactly what it's doing back there.`,
  },
  {
    id: 'post-4',
    date: 'Security · ~2 min read',
    title: "What HTTPS Actually Protects You From (And What It Doesn't)",
    excerpt:
      'The padlock icon gets treated like a trust badge. "It\'s HTTPS, so it\'s safe." That\'s only half true.',
    body: `The padlock icon gets treated like a trust badge. "It's HTTPS, so it's safe." That's only half true, and the half that's wrong is the dangerous half.

HTTPS encrypts the connection between your browser and the server. That means someone snooping on the same public WiFi as you — a classic coffee shop attack — can't read your password as it travels, and can't quietly swap the page content mid-transit. That part is real, and it matters a lot more than people give it credit for.

What HTTPS does not do: verify that the site is legitimate. Scam sites can have a padlock too — certificates are cheap and easy to get. It doesn't stop the server itself from being malicious or badly secured. It doesn't stop you from typing your card details into a beautifully cloned phishing page that also happens to have HTTPS.

Think of HTTPS as a sealed envelope, not a background check on the person receiving it. It guarantees the letter wasn't opened in transit. It says nothing about who's opening it on the other end.

The padlock is necessary. It was never sufficient.`,
  },
];

const BlogSection = () => {
  const [activePost, setActivePost] = useState(null);

  const closeModal = useCallback(() => {
    setActivePost(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activePost) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePost, closeModal]);

  useEffect(() => {
    if (activePost) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [activePost]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <section style={styles.section} id="blog">
      <div style={styles.header}>
        <h2 style={styles.heading}>From the Archive</h2>
        <p style={styles.subheading}>Notes on frontend, security, and the web</p>
      </div>

      <div style={styles.grid}>
        {BLOG_POSTS.map((post) => (
          <button
            key={post.id}
            type="button"
            className="nyx-glass nyx-interactive"
            style={styles.card}
            onClick={() => setActivePost(post)}
          >
            <p style={styles.cardDate}>{post.date}</p>
            <h3 style={styles.cardTitle}>{post.title}</h3>
            <p style={styles.cardExcerpt}>{post.excerpt}</p>
            <span style={styles.readMore}>Read more →</span>
          </button>
        ))}
      </div>

      {activePost && (
        <div
          style={styles.overlay}
          onClick={handleBackdropClick}
          role="presentation"
        >
          <div
            className="nyx-glass"
            role="dialog"
            aria-modal="true"
            aria-label={activePost.title}
            style={styles.modal}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close article"
              style={styles.closeButton}
            >
              ✕
            </button>

            <div style={styles.modalScroll}>
              <p style={styles.modalDate}>{activePost.date}</p>
              <h2 style={styles.modalTitle}>{activePost.title}</h2>
              <div style={styles.modalBody}>
                {activePost.body.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} style={styles.modalParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    textAlign: 'left',
    borderRadius: '14px',
    padding: '22px',
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    font: 'inherit',
  },
  cardDate: {
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: '#8b7fa8',
    margin: 0,
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: 600,
    color: '#f5f3fb',
    textShadow: '0 0 18px rgba(226, 220, 245, 0.25)',
    margin: 0,
    lineHeight: 1.35,
  },
  cardExcerpt: {
    fontSize: '13.5px',
    lineHeight: 1.55,
    color: '#b8b2cc',
    margin: 0,
  },
  readMore: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#c4b5fd',
    marginTop: '6px',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(8, 6, 14, 0.6)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    zIndex: 1200,
  },
  modal: {
    position: 'relative',
    width: 'min(680px, 100%)',
    maxHeight: '85vh',
    borderRadius: '16px',
    padding: '36px 32px 28px',
    display: 'flex',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    background: 'rgba(255, 255, 255, 0.03)',
    color: '#e5e3ec',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    overflowY: 'auto',
    paddingRight: '4px',
  },
  modalDate: {
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: '#8b7fa8',
    margin: '0 0 10px',
  },
  modalTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#f1eefb',
    lineHeight: 1.3,
    margin: '0 0 20px',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  modalParagraph: {
    fontSize: '14.5px',
    lineHeight: 1.75,
    color: '#c9c3db',
    margin: 0,
  },
};

export default BlogSection;
