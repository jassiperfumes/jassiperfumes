import React from 'react';
import { Phone, MessageCircle, Navigation } from 'lucide-react';

export default function StickyBottomBar() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Jalaram+Store+Valmik+Sadan+Near+Navjeevan+High+School+Rani+Sati+Marg+Malad+East+Mumbai+400097";
  const whatsappUrl = "https://wa.me/919619113993?text=Hi%20The%20Perfume%20Corner,%20I%20would%20like%20to%20inquire%20about%20your%20fragrance%20collection.";

  return (
    <div
      className="mobile-bottom-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 990,
        backgroundColor: 'var(--accent-dark-brown)',
        borderTop: '2px solid var(--accent-gold)',
        padding: '0.6rem 0.75rem',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.25)',
        display: 'none'
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', maxWidth: '500px', margin: '0 auto' }}>
        <a
          href="tel:9619113993"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            padding: '0.5rem 0.25rem',
            backgroundColor: 'rgba(255, 249, 240, 0.1)',
            color: '#FFF9F0',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}
        >
          <Phone size={18} color="var(--accent-gold)" style={{ marginBottom: '2px' }} />
          <span>CALL</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            padding: '0.5rem 0.25rem',
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}
        >
          <MessageCircle size={18} color="#FFFFFF" style={{ marginBottom: '2px' }} />
          <span>WHATSAPP</span>
        </a>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            padding: '0.5rem 0.25rem',
            backgroundColor: 'rgba(255, 249, 240, 0.1)',
            color: '#FFF9F0',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}
        >
          <Navigation size={18} color="var(--accent-gold)" style={{ marginBottom: '2px' }} />
          <span>DIRECTIONS</span>
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-bar {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
