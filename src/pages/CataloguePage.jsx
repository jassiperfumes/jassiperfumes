import React, { useState } from 'react';
import { FRAGRANCES, ATTAR_CATEGORIES } from '../data/fragrances';
import { Search, Filter, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';

export default function CataloguePage({ onSelectFragrance }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    'ALL',
    'FRAGRANCES',
    'GIFT ITEMS'
  ];

  const filteredFragrances = FRAGRANCES.filter((item) => {
    // Category match
    let matchesCategory = true;
    if (activeCategory === 'FRAGRANCES') {
      matchesCategory = item.category !== 'GIFT ITEMS' && item.type !== 'GIFT SET';
    } else if (activeCategory === 'GIFT ITEMS') {
      matchesCategory = item.category === 'GIFT ITEMS' || item.type === 'GIFT SET';
    }

    // Search query match
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-warm-beige)', minHeight: '100vh' }}>
      {/* Header Banner */}
      <section
        style={{
          backgroundColor: 'var(--accent-dark-brown)',
          color: '#FFF9F0',
          padding: '4rem 0 3.5rem 0',
          borderBottom: '2px solid var(--accent-gold)',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '750px' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.25em', color: 'var(--accent-gold-light)', textTransform: 'uppercase', fontWeight: 700 }}>
            CATALOGUE & INQUIRY
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              margin: '0.5rem 0 1rem 0',
              color: '#FFF9F0'
            }}
          >
            FRAGRANCE COLLECTION
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 249, 240, 0.85)', lineHeight: 1.6 }}>
            Explore {FRAGRANCES.length} fragrance profiles available at The Perfume Corner.
          </p>
        </div>
      </section>

      {/* Search & Filter Controls */}
      <section style={{ backgroundColor: 'var(--bg-cream)', padding: '2rem 0', borderBottom: '1px solid var(--accent-gold-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '550px' }}>
              <Search
                size={18}
                color="var(--accent-gold)"
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search fragrance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem 0.9rem 2.8rem',
                  fontSize: '0.95rem',
                  backgroundColor: 'var(--bg-warm-beige)',
                  border: '1px solid var(--accent-gold-border)',
                  borderRadius: '50px',
                  color: 'var(--text-espresso)',
                  outline: 'none',
                  boxShadow: 'var(--shadow-subtle)',
                  fontFamily: 'var(--font-sans)'
                }}
              />
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '0.5rem 1.25rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      borderRadius: '50px',
                      border: isActive ? '1px solid var(--accent-gold)' : '1px solid rgba(43, 33, 27, 0.15)',
                      backgroundColor: isActive ? 'var(--accent-dark-brown)' : 'transparent',
                      color: isActive ? 'var(--accent-gold-light)' : 'var(--text-espresso)',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-espresso-muted)', fontStyle: 'italic' }}>
              Showing {filteredFragrances.length} of {FRAGRANCES.length} fragrance profiles
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Grid */}
      <section className="section-padding">
        <div className="container">
          {filteredFragrances.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-espresso)' }}>
                No fragrance matching "{searchQuery}" found.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); }}
                className="btn-gold"
                style={{ marginTop: '1rem' }}
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="catalogue-grid">
              {filteredFragrances.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectFragrance(item)}
                  style={{
                    backgroundColor: 'var(--bg-cream)',
                    border: '1px solid var(--accent-gold-border)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    transition: 'var(--transition-smooth)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                  className="catalogue-card"
                >
                  <div style={{ position: 'relative', padding: '1.25rem', backgroundColor: 'var(--bg-warm-beige)', textAlign: 'center' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '170px', objectFit: 'contain', transition: 'transform 0.4s ease' }}
                      className="cat-card-img"
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        fontSize: '0.65rem',
                        padding: '0.2rem 0.6rem',
                        backgroundColor: 'var(--accent-dark-brown)',
                        color: 'var(--accent-gold)',
                        borderRadius: '3px',
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                      {item.type}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-espresso)', margin: '0.2rem 0 0.4rem 0' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '0.775rem', color: 'var(--text-espresso-muted)', lineHeight: 1.4, marginBottom: '1rem', flexGrow: 1 }}>
                      {item.notes}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const text = encodeURIComponent(
                          `Hi The Perfume Corner! I would like to order/inquire about "${item.name}". Please share availability & pricing.`
                        );
                        window.open(`https://wa.me/919619113993?text=${text}`, '_blank', 'noopener,noreferrer');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)'
                      }}
                      className="btn-whatsapp-order"
                    >
                      <MessageCircle size={15} color="#FFFFFF" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legal Disclaimer */}
          <div
            style={{
              marginTop: '4rem',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-cream)',
              border: '1px solid var(--accent-gold-border)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '900px',
              margin: '4rem auto 0 auto'
            }}
          >
            <AlertCircle size={20} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-espresso-muted)', lineHeight: 1.5 }}>
              <strong>Brand Safety Disclaimer:</strong> Fragrance names are used solely for scent-profile identification. The Perfume Corner offers custom inspired fragrance profiles and traditional attars, and is not affiliated with the respective original brand owners.
            </p>
          </div>
        </div>
      </section>

      {/* ATTAR SPECIALITY FEATURE SECTION */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', borderTop: '2px solid var(--accent-gold)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
              THE HEART OF OUR COLLECTION
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                margin: '0.5rem 0 1rem 0'
              }}
            >
              Premium Attar, Your Way
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-espresso-muted)', lineHeight: 1.7 }}>
              Our speciality is attar — concentrated fragrance crafted for those who appreciate depth, character and long-lasting fragrance experiences.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {ATTAR_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-warm-beige)',
                  border: '1px solid var(--accent-gold-border)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  textAlign: 'center'
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-espresso)', marginBottom: '0.3rem' }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                    {cat.subtitle}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-espresso-muted)', lineHeight: 1.5 }}>
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="https://wa.me/919619113993?text=Hi%20The%20Perfume%20Corner,%20I%20would%20like%20to%20ask%20about%20your%20concentrated%20Attar%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ padding: '0.9rem 2.2rem' }}
            >
              <MessageCircle size={18} />
              <span>ASK ABOUT ATTAR ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* Grid CSS */}
      <style>{`
        .catalogue-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .catalogue-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .catalogue-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
        .catalogue-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-gold) !important;
          box-shadow: var(--shadow-gold) !important;
        }
        .catalogue-card:hover .cat-card-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}
