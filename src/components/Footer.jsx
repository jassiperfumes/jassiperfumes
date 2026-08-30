import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer
      style={{
        backgroundColor: 'var(--accent-dark-brown)',
        color: '#FFF9F0',
        padding: '2rem 0 1.25rem 0',
        borderTop: '2px solid var(--accent-gold)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid rgba(255, 249, 240, 0.12)'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
              <img
                src="/assets/Logo.jpeg"
                alt="Jassi Perfumes Logo"
                style={{
                  height: '48px',
                  width: '48px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '1.5px solid var(--accent-gold-light)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  flexShrink: 0
                }}
              />
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    letterSpacing: '0.08em',
                    color: 'var(--accent-gold-light)',
                    margin: 0,
                    lineHeight: 1.2
                  }}
                >
                  JASSI PERFUMES
                </h3>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                  Attar & Inspired Fragrances
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255, 249, 240, 0.75)', lineHeight: 1.5, margin: 0 }}>
              Pure concentrated attars & signature inspired fragrance profiles in Malad East, Mumbai.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '0.775rem',
                letterSpacing: '0.1em',
                color: 'var(--accent-gold)',
                margin: '0 0 0.6rem 0',
                textTransform: 'uppercase'
              }}
            >
              Navigation
            </h4>
            <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.825rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ color: 'rgba(255, 249, 240, 0.85)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Home
              </button>
              <button
                onClick={() => { setCurrentPage('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ color: 'rgba(255, 249, 240, 0.85)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Catalogue
              </button>
              <button
                onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ color: 'rgba(255, 249, 240, 0.85)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Store Contact */}
          <div>
            <h4
              style={{
                fontSize: '0.775rem',
                letterSpacing: '0.1em',
                color: 'var(--accent-gold)',
                margin: '0 0 0.6rem 0',
                textTransform: 'uppercase'
              }}
            >
              Store Location
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255, 249, 240, 0.8)', margin: '0 0 0.35rem 0', lineHeight: 1.4 }}>
              <MapPin size={14} color="var(--accent-gold)" style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              Rani Sati Marg, Malad East, Mumbai - 400097
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255, 249, 240, 0.8)', margin: 0 }}>
              <Phone size={14} color="var(--accent-gold)" style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              9619113993 / 8424955955
            </p>
          </div>
        </div>

        {/* Minimal Copyright & Disclaimer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            paddingTop: '0.85rem',
            fontSize: '0.725rem',
            color: 'rgba(255, 249, 240, 0.5)'
          }}
        >
          <div>&copy; 2026 Jassi Perfumes. All Rights Reserved.</div>
          <div>* Scent names used solely for fragrance profile identification.</div>
        </div>
      </div>
    </footer>
  );
}
