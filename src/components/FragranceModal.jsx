import React from 'react';
import { X, MessageCircle, Phone, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FragranceModal({ fragrance, onClose }) {
  if (!fragrance) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi! I am inquiring about the inspired fragrance profile "${fragrance.name}" from Jassi Perfumes. Could you please share availability and pricing details?`
  );
  const whatsappUrl = `https://wa.me/919619113993?text=${whatsappMessage}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--accent-gold-border)',
            backgroundColor: 'var(--bg-warm-beige)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img
              src="/assets/Logo.jpeg"
              alt="Jassi Perfumes Logo"
              style={{
                height: '28px',
                width: '28px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '1px solid var(--accent-gold)'
              }}
            />
            <span className="gold-badge">{fragrance.type}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              color: 'var(--text-espresso)',
              padding: '0.2rem',
              borderRadius: '50%',
              transition: 'var(--transition-fast)'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem 1.5rem 2rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem', alignItems: 'center' }} className="modal-grid">
            {/* Image */}
            <div
              style={{
                backgroundColor: 'var(--bg-warm-beige)',
                border: '1px solid var(--accent-gold-border)',
                borderRadius: '4px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={fragrance.image}
                alt={fragrance.name}
                style={{ width: '100%', maxHeight: '220px', objectFit: 'contain' }}
              />
            </div>

            {/* Content */}
            <div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Category: {fragrance.category}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  lineHeight: 1.2,
                  marginBottom: '0.75rem',
                  color: 'var(--text-espresso)'
                }}
              >
                {fragrance.name}
              </h2>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--accent-gold)',
                  letterSpacing: '0.02em',
                  marginBottom: '0.75rem',
                  fontWeight: 600
                }}
              >
                {fragrance.subtitle || (fragrance.category === 'GIFT ITEMS' || fragrance.type === 'GIFT SET' ? 'PREMIUM GIFT ITEM' : 'Inspired version from original fragrance')}
              </p>
              
              <div style={{ fontSize: '0.85rem', color: 'var(--text-espresso-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                <strong>Key Scent Notes:</strong> {fragrance.notes}<br />
                {fragrance.description}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  color: 'var(--accent-olive)',
                  backgroundColor: 'rgba(111, 112, 82, 0.1)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '4px',
                  marginBottom: '1.5rem'
                }}
              >
                <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
                <span>Long-lasting oil concentration available for daily signature wear.</span>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={18} />
                  <span>ENQUIRE ON WHATSAPP</span>
                </a>

                <a
                  href="tel:9619113993"
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Phone size={16} />
                  <span>CALL TO ENQUIRE</span>
                </a>
              </div>
            </div>
          </div>

          {/* Legal Notice */}
          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(43, 33, 27, 0.08)',
              fontSize: '0.7rem',
              color: 'rgba(43, 33, 27, 0.5)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}
          >
            <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              Disclaimer: Fragrance profile names are used strictly for scent profile identification. Jassi Perfumes offers custom inspired fragrance profiles and is not affiliated with original brand owners.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
