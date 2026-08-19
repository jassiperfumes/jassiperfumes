import React from 'react';
import { FRAGRANCES } from '../data/fragrances';
import { Phone, MapPin, MessageCircle, Heart, Sparkles } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer
      style={{
        backgroundColor: 'var(--accent-dark-brown)',
        color: '#FFF9F0',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
        borderTop: '2px solid var(--accent-gold)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255, 249, 240, 0.15)'
          }}
        >
          {/* Brand Col */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                letterSpacing: '0.1em',
                color: 'var(--accent-gold-light)',
                marginBottom: '0.5rem'
              }}
            >
              THE PERFUME CORNER
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 249, 240, 0.8)', fontStyle: 'italic', marginBottom: '1.2rem' }}>
              "Discover Your Signature."
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 249, 240, 0.7)', lineHeight: 1.6 }}>
              Your neighborhood boutique in Malad East, Mumbai for pure concentrated attars and signature inspired fragrance profiles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                letterSpacing: '0.12em',
                color: 'var(--accent-gold)',
                marginBottom: '1.2rem',
                textTransform: 'uppercase'
              }}
            >
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li>
                <button
                  onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ color: 'rgba(255, 249, 240, 0.8)', transition: 'var(--transition-fast)' }}
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ color: 'rgba(255, 249, 240, 0.8)', transition: 'var(--transition-fast)' }}
                >
                  Fragrance Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ color: 'rgba(255, 249, 240, 0.8)', transition: 'var(--transition-fast)' }}
                >
                  Store Location & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                letterSpacing: '0.12em',
                color: 'var(--accent-gold)',
                marginBottom: '1.2rem',
                textTransform: 'uppercase'
              }}
            >
              Store Location
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255, 249, 240, 0.8)', marginBottom: '0.8rem' }}>
              <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div>
                C/O Jalaram Store, Valmik Sadan,<br />
                Near Navjeevan High School,<br />
                Rani Sati Marg, Malad East,<br />
                Mumbai - 400097
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255, 249, 240, 0.8)', alignItems: 'center' }}>
              <Phone size={16} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
              <span>9619113993 / 8424955955</span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div style={{ padding: '1.5rem 0', fontSize: '0.75rem', color: 'rgba(255, 249, 240, 0.5)', lineHeight: 1.5, textAlign: 'center' }}>
          * Disclaimer: Fragrance profile names are used strictly for scent identification purposes. The Perfume Corner offers custom inspired fragrance profiles and traditional attars and is not affiliated with or endorsed by original trademark owners.
        </div>

        {/* Copyright */}
        <div
          style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1rem',
            fontSize: '0.8rem',
            color: 'rgba(255, 249, 240, 0.6)'
          }}
        >
          <div>&copy; 2026 The Perfume Corner. All Rights Reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Crafted with Elegance for Fragrance Lovers in Mumbai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
