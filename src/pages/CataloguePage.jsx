import React, { useState } from 'react';
import { FRAGRANCES, ATTAR_CATEGORIES } from '../data/fragrances';
import { Search, Filter, Sparkles, MessageCircle, AlertCircle, Star, ShoppingCart } from 'lucide-react';

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
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #ECE5DB',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 16px rgba(43, 33, 27, 0.06)'
                  }}
                  className="catalogue-card"
                >
                  {/* Top Image Container */}
                  <div
                    style={{
                      position: 'relative',
                      padding: '1.25rem',
                      backgroundColor: '#FAF7F2',
                      textAlign: 'center',
                      borderBottom: '1px solid #F3EDE3'
                    }}
                    className="cat-card-img-wrap"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '180px', objectFit: 'contain', transition: 'transform 0.4s ease' }}
                      className="cat-card-img"
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        fontSize: '0.65rem',
                        padding: '0.25rem 0.65rem',
                        backgroundColor: 'var(--accent-dark-brown)',
                        color: 'var(--accent-gold-light)',
                        borderRadius: '50px',
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      {/* Title & Star Rating Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: 'var(--text-espresso)',
                            margin: 0,
                            lineHeight: 1.25
                          }}
                        >
                          {item.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0, marginTop: '2px' }}>
                          <Star size={15} color="#EAB308" fill="#EAB308" />
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-espresso)' }}>
                            4.9
                          </span>
                        </div>
                      </div>

                      {/* Subtitle / Category text */}
                      <p style={{ fontSize: '0.775rem', color: '#7A6F68', margin: '0 0 1rem 0', lineHeight: 1.4 }}>
                        {item.type === 'ATTAR' ? 'Pure Attar Oil' : item.type === 'GIFT SET' ? 'Luxury Gift Set' : 'Inspired Fragrance'} ({item.category})
                      </p>
                    </div>

                    {/* WhatsApp Order Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const text = encodeURIComponent(
                          `Hi The Perfume Corner! I would like to order/inquire about "${item.name}". Please share availability & details.`
                        );
                        window.open(`https://wa.me/919619113993?text=${text}`, '_blank', 'noopener,noreferrer');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.85rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)',
                        transition: 'all 0.25s ease',
                        marginTop: '0.5rem'
                      }}
                      className="btn-whatsapp-order"
                    >
                      <MessageCircle size={16} color="#FFFFFF" />
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
            gap: 1.25rem;
          }
        }
        @media (max-width: 640px) {
          .catalogue-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.85rem;
          }
          .catalogue-card .cat-card-img-wrap {
            padding: 0.85rem !important;
          }
          .catalogue-card .cat-card-img {
            height: 135px !important;
          }
          .catalogue-card h3 {
            font-size: 0.95rem !important;
          }
          .btn-whatsapp-order {
            padding: 0.5rem 0.75rem !important;
            font-size: 0.75rem !important;
          }
        }
        .catalogue-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(43, 33, 27, 0.12) !important;
          border-color: #D6CBBF !important;
        }
        .catalogue-card:hover .cat-card-img {
          transform: scale(1.08);
        }
        .btn-whatsapp-order:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 18px rgba(37, 211, 102, 0.5) !important;
        }
      `}</style>
    </div>
  );
}
