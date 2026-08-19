import React, { useState, useEffect } from 'react';
import { FRAGRANCES } from '../data/fragrances';
import { Phone, MessageCircle, ArrowRight, Sparkles, Droplet, ShieldCheck, Heart, MapPin, Award, Compass } from 'lucide-react';

export default function HomePage({ setCurrentPage, onSelectFragrance }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/assets/hero_slide_1.png',
      caption: 'Pure Concentrated Perfume Oils & Artisanal Blends'
    },
    {
      image: '/assets/hero_slide_2.png',
      caption: 'Traditional Indian Attars Crafted for Character & Longevity'
    },
    {
      image: '/assets/hero_slide_3.png',
      caption: 'Iconic Inspired Fragrance Profiles for Modern Wear'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const featuredFragrances = FRAGRANCES.filter((item) => item.isFeatured).slice(0, 8);

  return (
    <div className="animate-fade-in">
      {/* HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          overflow: 'hidden',
          backgroundColor: '#2B211B',
          color: '#FFF9F0'
        }}
      >
        {/* Slideshow Background */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 1
            }}
          >
            <img
              src={slide.image}
              alt="The Perfume Corner Hero Visual"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 6s ease-out',
                filter: 'brightness(0.65)'
              }}
            />
          </div>
        ))}

        {/* Gradient Overlay for Readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(43, 33, 27, 0.4) 0%, rgba(43, 33, 27, 0.8) 100%)',
            zIndex: 2
          }}
        />

        {/* Hero Content */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            paddingTop: '3rem',
            paddingBottom: '3rem',
            maxWidth: '850px'
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: 'var(--accent-gold-light)',
                textTransform: 'uppercase',
                border: '1px solid var(--accent-gold)',
                padding: '0.35rem 1.25rem',
                borderRadius: '50px',
                backgroundColor: 'rgba(43, 33, 27, 0.6)',
                backdropFilter: 'blur(4px)'
              }}
            >
              THE PERFUME CORNER
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              lineHeight: 1.15,
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '1rem',
              color: '#FFF9F0',
              textShadow: '0 4px 15px rgba(0,0,0,0.4)'
            }}
          >
            THE ART OF FRAGRANCE
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'var(--accent-gold-light)',
              fontStyle: 'italic',
              marginBottom: '1rem',
              fontWeight: 400
            }}
          >
            Premium Attar & Branded-Inspired Fragrance Collection
          </p>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(255, 249, 240, 0.9)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '680px',
              margin: '0 auto 2.5rem auto'
            }}
          >
            Discover elegant fragrance profiles inspired by iconic perfumes and crafted for your everyday signature.
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setCurrentPage('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-gold"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => { setCurrentPage('about-contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-secondary"
              style={{ color: '#FFF9F0', borderColor: 'rgba(255, 249, 240, 0.6)' }}
            >
              <span>CONTACT US</span>
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginTop: '3rem' }}>
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                style={{
                  width: currentSlide === idx ? '30px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: currentSlide === idx ? 'var(--accent-gold)' : 'rgba(255, 249, 240, 0.4)',
                  transition: 'var(--transition-smooth)'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section
        style={{
          backgroundColor: 'var(--bg-cream)',
          borderBottom: '1px solid var(--accent-gold-border)',
          padding: '2.5rem 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              textAlign: 'center'
            }}
          >
            {/* Item 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', backgroundColor: 'var(--bg-warm-beige)' }}>
                <Droplet size={22} color="var(--accent-gold)" />
              </div>
              <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.08em', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                PREMIUM ATTAR
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-espresso-muted)' }}>
                Carefully selected fragrance oils
              </p>
            </div>

            {/* Item 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', backgroundColor: 'var(--bg-warm-beige)' }}>
                <Sparkles size={22} color="var(--accent-gold)" />
              </div>
              <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.08em', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                INSPIRED FRAGRANCES
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-espresso-muted)' }}>
                Familiar and elegant scent profiles
              </p>
            </div>

            {/* Item 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', backgroundColor: 'var(--bg-warm-beige)' }}>
                <Award size={22} color="var(--accent-gold)" />
              </div>
              <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.08em', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                PERSONAL FRAGRANCE SERVICE
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-espresso-muted)' }}>
                Find a fragrance that suits you
              </p>
            </div>

            {/* Item 4 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', backgroundColor: 'var(--bg-warm-beige)' }}>
                <MapPin size={22} color="var(--accent-gold)" />
              </div>
              <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.08em', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                MALAD EAST, MUMBAI
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-espresso-muted)' }}>
                Visit our local boutique store
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT INTRO SECTION */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-warm-beige)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '3.5rem', alignItems: 'center' }} className="responsive-split">
            {/* Left Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ border: '1px solid var(--accent-gold)', padding: '1rem', background: 'var(--bg-cream)', boxShadow: 'var(--shadow-medium)' }}>
                <img
                  src="/assets/about_attar.png"
                  alt="Traditional Attar Bottle"
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ position: 'absolute', bottom: '-15px', right: '-15px', background: 'var(--accent-dark-brown)', color: 'var(--accent-gold)', padding: '1rem 1.5rem', fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontStyle: 'italic', border: '1px solid var(--accent-gold)' }}>
                Authentic Craftsmanship
              </div>
            </div>

            {/* Right Text */}
            <div>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                ABOUT THE PERFUME CORNER
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                  lineHeight: 1.25,
                  marginBottom: '1.5rem',
                  color: 'var(--text-espresso)'
                }}
              >
                Where Fragrance Meets Tradition
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-espresso-muted)', marginBottom: '2rem' }}>
                The Perfume Corner is a local fragrance destination in Malad East, Mumbai, specializing in attar and inspired fragrance profiles. We bring together timeless fragrance traditions and modern scent preferences to help you discover a fragrance that feels uniquely yours.
              </p>
              
              <button
                onClick={() => { setCurrentPage('about-contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-primary"
              >
                <span>KNOW MORE</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FRAGRANCES SECTION */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', borderTop: '1px solid var(--accent-gold-border)', borderBottom: '1px solid var(--accent-gold-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
              CURATED SELECTION
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                margin: '0.5rem 0 1rem 0'
              }}
            >
              EXPLORE OUR FRAGRANCE COLLECTION
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-espresso-muted)' }}>
              Popular fragrance profiles available at The Perfume Corner.
            </p>
          </div>

          {/* 8 Featured Fragrance Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}
          >
            {featuredFragrances.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--bg-warm-beige)',
                  border: '1px solid var(--accent-gold-border)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'var(--transition-smooth)',
                  boxShadow: 'var(--shadow-subtle)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="perfume-card"
              >
                <div style={{ position: 'relative', overflow: 'hidden', padding: '1.5rem', backgroundColor: '#FFF9F0', textAlign: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '200px', objectFit: 'contain', transition: 'transform 0.5s ease' }}
                    className="card-img"
                  />
                  <span className="gold-badge" style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '0.65rem' }}>
                    {item.category}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    INSPIRED PROFILE
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-espresso)' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-espresso-muted)', lineHeight: 1.5, marginBottom: '1.2rem', flexGrow: 1 }}>
                    {item.notes}
                  </p>

                  <button
                    onClick={() => onSelectFragrance(item)}
                    className="btn-secondary"
                    style={{ width: '100%', fontSize: '0.75rem', padding: '0.65rem 1rem' }}
                  >
                    View Fragrance
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => { setCurrentPage('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-gold"
              style={{ padding: '1rem 2.5rem', fontSize: '0.9rem' }}
            >
              <span>VIEW FULL CATALOGUE ({FRAGRANCES.length} FRAGRANCES)</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-warm-beige)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
              OUR COMMITMENT
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.5rem' }}>
              Why Choose The Perfume Corner
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {/* Block 1 */}
            <div style={{ padding: '2rem', background: 'var(--bg-cream)', border: '1px solid var(--accent-gold-border)', borderRadius: '4px' }}>
              <div style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: '0.5rem' }}>
                01
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-espresso)' }}>
                AUTHENTIC ATTAR EXPERIENCE
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-espresso-muted)', lineHeight: 1.6 }}>
                Traditional fragrance experience with modern presentation and deep long-lasting oils.
              </p>
            </div>

            {/* Block 2 */}
            <div style={{ padding: '2rem', background: 'var(--bg-cream)', border: '1px solid var(--accent-gold-border)', borderRadius: '4px' }}>
              <div style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: '0.5rem' }}>
                02
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-espresso)' }}>
                INSPIRED BY ICONIC FRAGRANCES
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-espresso-muted)', lineHeight: 1.6 }}>
                Explore scent profiles inspired by well-known fragrance styles for everyday signature wear.
              </p>
            </div>

            {/* Block 3 */}
            <div style={{ padding: '2rem', background: 'var(--bg-cream)', border: '1px solid var(--accent-gold-border)', borderRadius: '4px' }}>
              <div style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: '0.5rem' }}>
                03
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-espresso)' }}>
                PERSONALIZED GUIDANCE
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-espresso-muted)', lineHeight: 1.6 }}>
                We help you choose a fragrance according to your personal taste and occasion preference.
              </p>
            </div>

            {/* Block 4 */}
            <div style={{ padding: '2rem', background: 'var(--bg-cream)', border: '1px solid var(--accent-gold-border)', borderRadius: '4px' }}>
              <div style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: '0.5rem' }}>
                04
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-espresso)' }}>
                LOCAL & ACCESSIBLE
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-espresso-muted)', lineHeight: 1.6 }}>
                Conveniently located in Malad East, Mumbai near Rani Sati Marg for local fragrance lovers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOME — CTA SECTION */}
      <section
        style={{
          backgroundColor: 'var(--accent-dark-brown)',
          color: '#FFF9F0',
          padding: '5rem 0',
          borderTop: '2px solid var(--accent-gold)',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '750px' }}>
          <Sparkles size={28} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: '#FFF9F0',
              marginBottom: '1rem'
            }}
          >
            Find Your Signature Fragrance
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 249, 240, 0.85)',
              lineHeight: 1.7,
              marginBottom: '2.5rem'
            }}
          >
            Tell us the fragrance style you love. We'll help you explore the closest inspired fragrance profile from our collection.
          </p>

          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="tel:9619113993"
              className="btn-gold"
              style={{ padding: '1rem 2rem' }}
            >
              <Phone size={18} />
              <span>CALL NOW: 9619113993</span>
            </a>

            <a
              href="https://wa.me/919619113993?text=Hi%20The%20Perfume%20Corner,%20I%20am%20looking%20for%20a%20fragrance%20recommendation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ color: '#FFF9F0', borderColor: 'var(--accent-gold)' }}
            >
              <MessageCircle size={18} color="#25D366" />
              <span>WHATSAPP US</span>
            </a>
          </div>

          <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--accent-gold-light)' }}>
            Alternative Line: 8424955955 &bull; Visit us at Rani Sati Marg, Malad East
          </div>
        </div>
      </section>

      {/* Card Hover Inline Styling */}
      <style>{`
        @media (max-width: 768px) {
          .responsive-split {
            grid-template-columns: 1fr !important;
          }
        }
        .perfume-card:hover {
          transform: translateY(-6px);
          border-color: var(--accent-gold) !important;
          box-shadow: var(--shadow-gold) !important;
        }
        .perfume-card:hover .card-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
