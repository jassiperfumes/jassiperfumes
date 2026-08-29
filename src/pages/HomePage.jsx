import React, { useState, useEffect } from 'react';
import { FRAGRANCES } from '../data/fragrances';
import { Phone, MessageCircle, ArrowRight, Sparkles, Droplet, ShieldCheck, Heart, MapPin, Award, Compass, Star, CheckCircle2 } from 'lucide-react';

export default function HomePage({ setCurrentPage, onSelectFragrance }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/assets/hero_slide_1.png',
      badge: '100% NON-ALCOHOLIC & INSPIRED',
      title: 'THE ART OF FRAGRANCE',
      description: 'Discover luxury inspired perfumes and 100% pure non-alcoholic attars crafted for your everyday signature.'
    },
    {
      image: '/assets/hero_slide_2.png',
      badge: '100% PURE ATTARS',
      title: 'TIMELESS ESSENCE',
      description: 'Hand-poured 100% alcohol-free pure oils crafted for depth, richness, and long-lasting character.'
    },
    {
      image: '/assets/hero_slide_3.png',
      badge: 'INSPIRED EDITIONS',
      title: 'SIGNATURE SCENTS',
      description: 'Explore custom inspired fragrance versions of world-renowned luxury perfume creations.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const featuredFragrances = FRAGRANCES.filter((item) => item.isFeatured).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* HERO SECTION */}
      <section
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#2B211B',
          color: '#FFF9F0'
        }}
        className="home-hero-section"
      >
        {/* Slideshow Background */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              zIndex: 1
            }}
          >
            <img
              src={slide.image}
              alt="Jassi Perfume Hero Visual"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: currentSlide === index ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 2s ease-out',
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

        {/* Hero Content with Bottom-to-Up Slide Animations */}
        <div
          key={currentSlide}
          className="container hero-animated-content"
        >
          {/* Brand Emblem Logo */}
          <div className="hero-logo-crest">
            <img
              src="/assets/Logo.jpeg"
              alt="Jassi Perfume Logo Crest"
              className="hero-logo-img"
            />
          </div>

          <div className="hero-badge-wrap">
            <span className="hero-badge-text">
              {heroSlides[currentSlide].badge}
            </span>
          </div>

          <h1 className="hero-slide-title">
            {heroSlides[currentSlide].title}
          </h1>

          <p className="hero-slide-desc">
            {heroSlides[currentSlide].description}
          </p>

          <div className="hero-slide-buttons">
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
          <div className="hero-dots-wrap">
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

      {/* HIGHLIGHTED KEY FEATURES RIBBON */}
      <div
        style={{
          backgroundColor: '#1E1612',
          borderTop: '2px solid var(--accent-gold)',
          borderBottom: '2px solid var(--accent-gold)',
          color: '#FFF9F0',
          padding: '0.9rem 1rem'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justify: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-gold-light)' }}>
            <Droplet size={18} color="var(--accent-gold)" />
            <span>100% NON-ALCOHOLIC PURE ATTARS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-gold-light)' }}>
            <Sparkles size={18} color="var(--accent-gold)" />
            <span>INSPIRED FRAGRANCE VERSIONS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-gold-light)' }}>
            <ShieldCheck size={18} color="var(--accent-gold)" />
            <span>100% SKIN-SAFE & LONG-LASTING</span>
          </div>
        </div>
      </div>

      {/* TRUST STRIP (3 Circle Items with Headings Only) */}
      <section
        style={{
          backgroundColor: 'var(--bg-cream)',
          borderBottom: '1px solid var(--accent-gold-border)',
          padding: '2.5rem 0'
        }}
        className="home-trust-section"
      >
        <div className="container">
          <div className="trust-3-grid">
            {/* Item 1 */}
            <div className="trust-card">
              <div className="trust-icon-badge">
                <Droplet size={26} color="var(--accent-gold)" />
              </div>
              <h4 className="trust-card-title">
                100% NON-ALCOHOLIC
              </h4>
            </div>

            {/* Item 2 */}
            <div className="trust-card">
              <div className="trust-icon-badge">
                <Sparkles size={26} color="var(--accent-gold)" />
              </div>
              <h4 className="trust-card-title">
                INSPIRED VERSIONS
              </h4>
            </div>

            {/* Item 3 */}
            <div className="trust-card">
              <div className="trust-icon-badge">
                <Award size={26} color="var(--accent-gold)" />
              </div>
              <h4 className="trust-card-title">
                PERSONAL SERVICE
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT INTRO SECTION (Minimalist on Mobile) */}
      <section className="section-padding about-home-section" style={{ backgroundColor: 'var(--bg-warm-beige)' }}>
        <div className="container">
          <div className="about-home-split">
            {/* Left Image */}
            <div className="about-img-wrapper">
              <div className="about-img-card">
                <img
                  src="/assets/about_attar.png"
                  alt="Traditional Attar Bottle"
                  className="about-main-img"
                />
              </div>
              <div className="about-badge-floating">
                Authentic Craftsmanship
              </div>
            </div>

            {/* Right Text */}
            <div className="about-text-content">
              <div className="about-subtitle-wrap">
                <img
                  src="/assets/Logo.jpeg"
                  alt="Jassi Perfume Seal"
                  className="about-crest-logo"
                />
                <span className="about-subtitle-text">
                  ABOUT JASSI PERFUME
                </span>
              </div>
              <h2 className="about-heading">
                Where Fragrance Meets Tradition
              </h2>

              {/* Desktop Full Text */}
              <div className="about-desktop-text">
                <p className="about-paragraph">
                  Jassi Perfume is your local fragrance boutique in Malad East, Mumbai, specializing in concentrated attars and inspired fragrance profiles. We believe fragrance is more than a scent — it is part of your personal identity.
                </p>
                <p className="about-paragraph">
                  Whether you prefer fresh, woody, floral, sweet, oriental or rich oud-based scents, our collection brings together timeless traditions and modern scent preferences.
                </p>

                {/* Highlights */}
                <div className="about-highlights-list">
                  <div className="about-highlight-item">
                    <CheckCircle2 size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                    <span>100% Alcohol-Free Pure Attar Oils</span>
                  </div>
                  <div className="about-highlight-item">
                    <CheckCircle2 size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                    <span>Designer-Inspired Signature Fragrance Profiles</span>
                  </div>
                  <div className="about-highlight-item">
                    <CheckCircle2 size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                    <span>Personalized Scent Selection & Store Consultation</span>
                  </div>
                </div>
              </div>

              {/* Mobile Minimalist Text */}
              <div className="about-mobile-text">
                <p className="about-paragraph">
                  Your boutique in Malad East, Mumbai — specializing in 100% pure alcohol-free attars and iconic inspired fragrance profiles for your daily signature.
                </p>
              </div>
              
              <div className="about-cta-buttons">
                <button
                  onClick={() => { setCurrentPage('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="btn-gold"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="btn-secondary"
                >
                  <span>STORE LOCATION</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FRAGRANCES SECTION */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', borderTop: '1px solid var(--accent-gold-border)', borderBottom: '1px solid var(--accent-gold-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }} className="section-header-wrap">
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
              Popular fragrance profiles available at Jassi Perfume.
            </p>
          </div>

          {/* 4 Featured Fragrance Grid */}
          <div className="curated-grid">
            {featuredFragrances.map((item) => (
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
                    backgroundColor: '#FAF7F2',
                    textAlign: 'center',
                    borderBottom: '1px solid #F3EDE3',
                    overflow: 'hidden',
                    aspectRatio: '4 / 5'
                  }}
                  className="cat-card-img-wrap"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', transition: 'transform 0.4s ease' }}
                    className="cat-card-img"
                  />
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

                    {/* Subtitle text */}
                    <p style={{ fontSize: '0.725rem', color: '#7A6F68', margin: '0 0 1rem 0', lineHeight: 1.4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      {item.subtitle || (item.category === 'GIFT ITEMS' || item.type === 'GIFT SET' ? 'PREMIUM GIFT ITEM' : 'INSPIRED FRAGRANCE FROM ORIGINAL VERSION')}
                    </p>
                  </div>

                  {/* WhatsApp Order Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const text = encodeURIComponent(
                        `Hi Jassi Perfume! I would like to order/inquire about "${item.name}". Please share availability & details.`
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
                      justify: 'center',
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

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => { setCurrentPage('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-gold"
              style={{ padding: '1rem 2.5rem', fontSize: '0.9rem' }}
            >
              <span>VIEW FULL CATALOGUE</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-warm-beige)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem auto' }} className="section-header-wrap">
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
              OUR COMMITMENT
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.5rem' }}>
              Why Choose Jassi Perfume
            </h2>
          </div>

          <div className="why-choose-grid">
            {/* Block 1 */}
            <div className="why-choose-card">
              <div className="why-number">01</div>
              <h3 className="why-title">100% PURE ATTAR</h3>
              <p className="why-desc">
                Alcohol-free, long-lasting concentrated oils.
              </p>
            </div>

            {/* Block 2 */}
            <div className="why-choose-card">
              <div className="why-number">02</div>
              <h3 className="why-title">INSPIRED PROFILES</h3>
              <p className="why-desc">
                Designer-inspired luxury scent profiles.
              </p>
            </div>

            {/* Block 3 */}
            <div className="why-choose-card">
              <div className="why-number">03</div>
              <h3 className="why-title">SCENT CONSULTATION</h3>
              <p className="why-desc">
                Personalized fragrance advice & selection.
              </p>
            </div>

            {/* Block 4 */}
            <div className="why-choose-card">
              <div className="why-number">04</div>
              <h3 className="why-title">MALAD BOUTIQUE</h3>
              <p className="why-desc">
                Visit store at Rani Sati Marg, Malad East.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOME — CTA / EXPLORE SECTION */}
      <section
        style={{
          backgroundColor: 'var(--accent-dark-brown)',
          color: '#FFF9F0',
          borderTop: '2px solid var(--accent-gold)',
          textAlign: 'center'
        }}
        className="home-cta-section"
      >
        <div className="container" style={{ maxWidth: '680px' }}>
          <Sparkles size={24} color="var(--accent-gold)" style={{ marginBottom: '0.4rem' }} />

          <span
            style={{
              fontSize: '0.725rem',
              letterSpacing: '0.2em',
              color: 'var(--accent-gold-light)',
              textTransform: 'uppercase',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.35rem'
            }}
          >
            LUXURY FRAGRANCE BOUTIQUE
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)',
              color: '#FFF9F0',
              marginBottom: '0.6rem',
              letterSpacing: '0.02em',
              fontWeight: 700,
              lineHeight: 1.2
            }}
          >
            DISCOVER YOUR SIGNATURE SCENT
          </h2>

          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(255, 249, 240, 0.85)',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
              maxWidth: '580px',
              margin: '0 auto 1.25rem auto'
            }}
          >
            Explore artisanal attars and inspired fragrance oils crafted for character, depth and daily signature wear.
          </p>

          <div className="home-cta-btns">
            <button
              onClick={() => { setCurrentPage('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-gold home-cta-btn"
              style={{ padding: '0.65rem 1.6rem', fontSize: '0.8rem' }}
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => { setCurrentPage('about-contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-secondary home-cta-btn"
              style={{ color: '#FFF9F0', borderColor: 'var(--accent-gold)', padding: '0.65rem 1.6rem', fontSize: '0.8rem' }}
            >
              <span>VISIT OUR STORE</span>
            </button>
          </div>

          <div style={{ marginTop: '0.85rem', fontSize: '0.775rem', color: 'var(--accent-gold-light)', letterSpacing: '0.05em' }}>
            Rani Sati Marg, Malad East, Mumbai
          </div>
        </div>
      </section>

      {/* Card Hover Inline Styling */}
      <style>{`
        .home-hero-section {
          min-height: 85vh;
        }
        .home-trust-section {
          padding: 3.5rem 0;
        }
        .home-cta-section {
          padding: 2.25rem 1rem;
        }
        .home-cta-btns {
          display: flex;
          gap: 0.85rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .home-hero-section {
            min-height: 60vh !important;
          }
          .hero-animated-content {
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }
          .home-trust-section {
            padding: 1.5rem 0 !important;
          }
          .home-cta-section {
            padding: 1.5rem 0.75rem !important;
          }
          .home-cta-btns {
            flex-direction: column;
            gap: 0.6rem;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
          }
          .home-cta-btn {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.6rem 1.25rem !important;
          }
          .section-header-wrap {
            margin-bottom: 1.5rem !important;
          }
        }

        .curated-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 1024px) {
          .curated-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
        }
        @media (max-width: 640px) {
          .curated-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
            margin-bottom: 1.5rem !important;
          }
          .curated-grid .catalogue-card h3 {
            font-size: 0.95rem !important;
          }
          .curated-grid .btn-whatsapp-order {
            padding: 0.5rem 0.75rem !important;
            font-size: 0.75rem !important;
          }
        }
        /* About Section Styles */
        .about-home-split {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 3.5rem;
          align-items: center;
        }
        .about-img-wrapper {
          position: relative;
        }
        .about-img-card {
          border: 1px solid var(--accent-gold);
          padding: 1rem;
          background: var(--bg-cream);
          box-shadow: var(--shadow-medium);
          border-radius: 4px;
        }
        .about-main-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
          border-radius: 2px;
        }
        .about-badge-floating {
          position: absolute;
          bottom: -15px;
          right: -15px;
          background: var(--accent-dark-brown);
          color: var(--accent-gold);
          padding: 1rem 1.5rem;
          font-family: var(--font-serif);
          font-size: 0.9rem;
          font-style: italic;
          border: 1px solid var(--accent-gold);
        }
        .about-subtitle-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.75rem;
        }
        .about-crest-logo {
          height: 36px;
          width: 36px;
          object-fit: cover;
          border-radius: 50%;
          border: 1.5px solid var(--accent-gold);
          flex-shrink: 0;
        }
        .about-subtitle-text {
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: var(--accent-gold);
          font-weight: 700;
          text-transform: uppercase;
        }
        .about-heading {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3vw, 2.8rem);
          line-height: 1.2;
          margin-bottom: 1.25rem;
          color: var(--text-espresso);
        }
        .about-paragraph {
          font-size: 0.975rem;
          line-height: 1.8;
          color: var(--text-espresso-muted);
          margin-bottom: 1rem;
        }
        .about-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 2rem;
        }
        .about-highlight-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-espresso);
        }
        .about-cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .about-mobile-text {
          display: none;
        }
        .about-desktop-text {
          display: block;
        }

        @media (max-width: 768px) {
          .about-home-split {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .about-img-card {
            padding: 0.4rem !important;
            border-radius: 8px !important;
          }
          .about-main-img {
            height: 180px !important;
            border-radius: 6px !important;
          }
          .about-badge-floating {
            bottom: -6px !important;
            right: -4px !important;
            padding: 0.35rem 0.75rem !important;
            font-size: 0.7rem !important;
          }
          .about-subtitle-wrap {
            margin-bottom: 0.35rem !important;
          }
          .about-crest-logo {
            height: 26px !important;
            width: 26px !important;
          }
          .about-subtitle-text {
            font-size: 0.68rem !important;
          }
          .about-heading {
            font-size: 1.35rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.2 !important;
          }
          .about-desktop-text {
            display: none !important;
          }
          .about-mobile-text {
            display: block !important;
            margin-bottom: 0.95rem !important;
          }
          .about-mobile-text .about-paragraph {
            font-size: 0.825rem !important;
            line-height: 1.5 !important;
            margin-bottom: 0 !important;
          }
          .about-cta-buttons {
            gap: 0.5rem !important;
          }
          .about-cta-buttons .btn-gold,
          .about-cta-buttons .btn-secondary {
            padding: 0.55rem 1rem !important;
            font-size: 0.75rem !important;
          }
        }

        /* Trust Strip 3 Circle Items Grid */
        .trust-3-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .trust-3-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
        }
        @media (max-width: 480px) {
          .trust-3-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
        }
        .trust-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.5rem 1rem;
          background: rgba(255, 249, 240, 0.85);
          border: 1px solid var(--accent-gold-border);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .trust-card:hover {
          transform: translateY(-6px);
          border-color: var(--accent-gold);
          box-shadow: 0 12px 28px rgba(43, 33, 27, 0.1);
          background: #FFFFFF;
        }
        .trust-card-title {
          font-size: 0.875rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-espresso);
          font-weight: 700;
          line-height: 1.3;
          margin: 0;
        }
        @media (max-width: 768px) {
          .trust-card {
            padding: 1rem 0.5rem;
            border-radius: 14px;
          }
          .trust-card-title {
            font-size: 0.7rem;
            letter-spacing: 0.04em;
          }
        }
        @media (max-width: 420px) {
          .trust-card {
            padding: 0.85rem 0.35rem;
            border-radius: 12px;
          }
          .trust-card-title {
            font-size: 0.62rem;
            letter-spacing: 0.02em;
          }
          .trust-icon-badge {
            width: 46px !important;
            height: 46px !important;
            margin-bottom: 0.6rem !important;
          }
          .trust-icon-badge svg {
            width: 20px !important;
            height: 20px !important;
          }
        }
        .trust-icon-badge {
          position: relative;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 2px solid var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          background-color: var(--bg-warm-beige);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: circleFloat 3s ease-in-out infinite;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.18);
        }
        .trust-card:nth-child(1) .trust-icon-badge { animation-delay: 0s; }
        .trust-card:nth-child(2) .trust-icon-badge { animation-delay: 0.5s; }
        .trust-card:nth-child(3) .trust-icon-badge { animation-delay: 1s; }

        /* Expanding Ripple Pulse Aura for 3 Circle Cards */
        .trust-icon-badge::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid var(--accent-gold);
          opacity: 0;
          animation: ripplePulse 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .trust-card:nth-child(1) .trust-icon-badge::before { animation-delay: 0s; }
        .trust-card:nth-child(2) .trust-icon-badge::before { animation-delay: 0.6s; }
        .trust-card:nth-child(3) .trust-icon-badge::before { animation-delay: 1.2s; }

        .trust-card:hover .trust-icon-badge {
          background-color: var(--accent-dark-brown);
          transform: scale(1.18) rotate(10deg);
          border-color: var(--accent-gold-light);
          box-shadow: 0 0 22px rgba(212, 175, 55, 0.5);
        }
        .trust-card:hover .trust-icon-badge svg {
          stroke: var(--accent-gold-light);
          transform: scale(1.15);
          transition: transform 0.3s ease;
        }

        @keyframes circleFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes ripplePulse {
          0% {
            transform: scale(0.9);
            opacity: 0.85;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        /* Hero Dynamic Slide Text Animations (Bottom to Up) */
        .hero-animated-content .hero-slide-badge {
          animation: slideUpBottom 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hero-animated-content .hero-slide-title {
          animation: slideUpBottom 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }
        .hero-animated-content .hero-slide-italic {
          animation: slideUpBottom 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.14s both;
        }
        .hero-animated-content .hero-slide-desc {
          animation: slideUpBottom 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
        }
        .hero-animated-content .hero-slide-buttons {
          animation: slideUpBottom 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both;
        }

        @keyframes slideUpBottom {
          0% {
            opacity: 0;
            transform: translateY(45px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Why Choose Us 4 Cards Section */
        .why-choose-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .why-choose-card {
          position: relative;
          padding: 1.75rem 1.25rem;
          background: var(--bg-cream);
          border: 1px solid var(--accent-gold-border);
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 14px rgba(43, 33, 27, 0.04);
          animation: whySlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          overflow: hidden;
        }
        .why-choose-card:nth-child(1) { animation-delay: 0.1s; }
        .why-choose-card:nth-child(2) { animation-delay: 0.25s; }
        .why-choose-card:nth-child(3) { animation-delay: 0.4s; }
        .why-choose-card:nth-child(4) { animation-delay: 0.55s; }

        /* Top Glowing Gold Accent Line on Hover */
        .why-choose-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3.5px;
          background: linear-gradient(90deg, var(--accent-gold), var(--accent-gold-light), var(--accent-gold));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .why-choose-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: var(--accent-gold);
          box-shadow: 0 16px 32px rgba(181, 138, 69, 0.2);
          background: #FFFFFF;
        }

        .why-choose-card:hover::before {
          transform: scaleX(1);
        }

        .why-number {
          font-size: 1.9rem;
          color: var(--accent-gold);
          font-family: var(--font-serif);
          font-weight: 700;
          margin-bottom: 0.5rem;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: inline-block;
        }

        .why-choose-card:hover .why-number {
          transform: scale(1.25) translateX(3px);
          color: #B58A45;
          text-shadow: 0 0 12px rgba(181, 138, 69, 0.4);
        }

        .why-title {
          font-size: 1rem;
          margin-bottom: 0.75rem;
          color: var(--text-espresso);
          font-family: var(--font-sans);
          font-weight: 700;
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .why-choose-card:hover .why-title {
          color: var(--accent-dark-brown);
        }

        .why-desc {
          font-size: 0.825rem;
          color: var(--text-espresso-muted);
          line-height: 1.55;
          transition: color 0.3s ease;
        }

        .why-choose-card:hover .why-desc {
          color: var(--text-espresso);
        }

        @keyframes whySlideUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .why-choose-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }
        @media (max-width: 640px) {
          .why-choose-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
          }
          .why-choose-card {
            padding: 1.15rem 0.85rem !important;
            border-radius: 10px !important;
          }
          .why-number {
            font-size: 1.4rem !important;
            margin-bottom: 0.3rem !important;
          }
          .why-title {
            font-size: 0.85rem !important;
            margin-bottom: 0.4rem !important;
          }
          .why-desc {
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
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
