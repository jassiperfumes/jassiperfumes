import React, { useEffect } from 'react';
import { Phone, MessageCircle, Navigation, MapPin, Clock } from 'lucide-react';

export default function AboutContactPage() {
  const mapEmbedUrl = "https://maps.google.com/maps?q=19.183601,72.851187&hl=en&z=17&output=embed";
  const directMapUrl = "https://www.google.com/maps/search/?api=1&query=19.183601,72.851187";
  const whatsappUrl = "https://wa.me/919619113993?text=Hi%20Jassi%20Perfume,%20I%20would%20like%20to%20visit%20your%20store%20in%20Malad%20East.";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-warm-beige)' }}>
      {/* Header Banner */}
      <section
        style={{
          backgroundColor: 'var(--accent-dark-brown)',
          color: '#FFF9F0',
          padding: '1.75rem 0 1.5rem 0',
          borderBottom: '2px solid var(--accent-gold)',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <img
            src="/assets/Logo.jpeg"
            alt="Jassi Perfume Logo"
            style={{
              height: '60px',
              width: '60px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '2px solid var(--accent-gold)',
              margin: '0 auto 0.75rem auto',
              display: 'block',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
            }}
          />
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.25em', color: 'var(--accent-gold-light)', textTransform: 'uppercase', fontWeight: 700 }}>
            CONNECT WITH US
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              margin: '0.25rem 0 0.35rem 0',
              color: '#FFF9F0'
            }}
          >
            STORE LOCATION & CONTACT
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255, 249, 240, 0.85)', fontStyle: 'italic' }}>
            Visit our boutique or contact us directly for inquiries.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION - 3 COLUMNS IN A ROW */}
      <section id="contact" style={{ backgroundColor: 'var(--bg-warm-beige)', padding: '2.5rem 0 3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }} className="contact-3col-grid">
            {/* COLUMN 1: STORE ADDRESS */}
            <div style={{ padding: '2rem 1.5rem', backgroundColor: 'var(--bg-cream)', border: '1px solid var(--accent-gold-border)', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <MapPin size={22} color="var(--accent-gold)" />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-espresso)' }}>
                    VISIT OUR STORE
                  </h3>
                </div>

                <div style={{ fontSize: '0.95rem', color: 'var(--text-espresso)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  <strong>C/O Jalaram Store</strong><br />
                  Valmik Sadan<br />
                  Near Navjeevan High School<br />
                  Rani Sati Marg, Malad East<br />
                  Mumbai - 400097
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-espresso-muted)', borderTop: '1px solid var(--accent-gold-border)', paddingTop: '1rem' }}>
                <Clock size={16} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <span>Open Mon - Sun: 10:30 AM to 9:30 PM</span>
              </div>
            </div>

            {/* COLUMN 2: GET IN TOUCH */}
            <div style={{ padding: '2rem 1.5rem', backgroundColor: 'var(--bg-cream)', border: '1px solid var(--accent-gold-border)', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <Phone size={22} color="var(--accent-gold)" />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-espresso)' }}>
                    GET IN TOUCH
                  </h3>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    Call or Inquiry Hotline:
                  </div>
                  <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text-espresso)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <a href="tel:9619113993" style={{ color: 'var(--text-espresso)' }}>9619113993</a>
                    <a href="tel:8424955955" style={{ color: 'var(--text-espresso)' }}>8424955955</a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a
                  href="tel:9619113993"
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.65rem 1rem', fontSize: '0.775rem' }}
                >
                  <Phone size={16} />
                  <span>CALL NOW</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.65rem 1rem', fontSize: '0.775rem' }}
                >
                  <MessageCircle size={16} color="#25D366" />
                  <span>WHATSAPP</span>
                </a>

                <a
                  href={directMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.65rem 1rem', fontSize: '0.775rem' }}
                >
                  <Navigation size={16} />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>
            </div>

            {/* COLUMN 3: STORE LOCATION MAP */}
            <div style={{ padding: '2rem 1.5rem', backgroundColor: 'var(--bg-cream)', border: '1px solid var(--accent-gold-border)', borderRadius: '6px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Navigation size={22} color="var(--accent-gold)" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-espresso)' }}>
                  LOCATION MAP
                </h3>
              </div>

              <div
                style={{
                  position: 'relative',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid var(--accent-gold)',
                  boxShadow: 'var(--shadow-subtle)',
                  flexGrow: 1,
                  minHeight: '260px'
                }}
              >
                <iframe
                  title="Jassi Perfume Location Map"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '260px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-3col-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
