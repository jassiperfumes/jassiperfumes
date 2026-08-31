import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Sparkles, MapPin } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'catalogue', label: 'CATALOGUE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    if (id === 'contact') {
      setTimeout(() => {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'var(--transition-smooth)',
        backgroundColor: isScrolled ? 'rgba(244, 235, 221, 0.94)' : 'var(--bg-warm-beige)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--accent-gold-border)' : '1px solid transparent',
        boxShadow: isScrolled ? 'var(--shadow-subtle)' : 'none'
      }}
    >
      {/* Top Banner Strip */}
      <div
        className="header-top-banner"
        style={{
          backgroundColor: 'var(--accent-dark-brown)',
          color: 'var(--bg-cream)',
          padding: '0.4rem 1rem',
          fontSize: '0.75rem',
          textAlign: 'center',
          letterSpacing: '0.08em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <Sparkles size={12} color="var(--accent-gold)" />
        <span>100% NON-ALCOHOLIC PERFUMES &bull; INSPIRED VERSIONS FRAGRANCE &bull; MALAD EAST, MUMBAI</span>
        <Sparkles size={12} color="var(--accent-gold)" />
      </div>

      <div className="container header-main-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <img
            src="/assets/Logo.jpeg"
            alt="Jassi Perfumes Logo"
            className="header-brand-logo"
            style={{
              height: '46px',
              width: '46px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '1.5px solid var(--accent-gold)',
              boxShadow: '0 2px 8px rgba(43, 33, 27, 0.15)',
              flexShrink: 0
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className="header-brand-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--text-espresso)',
                lineHeight: 1.1
              }}
            >
              JASSI PERFUMES
            </span>
            <span
              className="header-brand-subtitle"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                marginTop: '2px'
              }}
            >
              Attar & Inspired Fragrances
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.2rem' }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = currentPage === item.id || (currentPage === 'about-contact' && (item.id === 'about' || item.id === 'contact'));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  fontSize: '0.825rem',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.12em',
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-espresso)',
                  position: 'relative',
                  padding: '0.3rem 0',
                  transition: 'var(--transition-fast)'
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--accent-gold)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Quick Call CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="desktop-cta">
          <a
            href="tel:9619113993"
            className="btn-gold"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.75rem' }}
          >
            <Phone size={14} />
            <span>9619113993</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          style={{
            padding: '0.5rem',
            color: 'var(--text-espresso)',
            display: 'none'
          }}
          className="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            width: '100%',
            backgroundColor: 'var(--bg-cream)',
            borderBottom: '1px solid var(--accent-gold-border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            boxShadow: '0 10px 25px rgba(43, 33, 27, 0.15)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: currentPage === item.id ? 700 : 500,
                color: currentPage === item.id ? 'var(--accent-gold)' : 'var(--text-espresso)',
                letterSpacing: '0.1em',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(43, 33, 27, 0.06)'
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="tel:9619113993"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Phone size={16} /> CALL NOW: 9619113993
            </a>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS for Header */}
      <style>{`
        @media (max-width: 880px) {
          .desktop-nav, .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
