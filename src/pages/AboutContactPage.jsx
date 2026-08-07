import React, { useEffect } from 'react';
import { Phone, MessageCircle, Navigation, MapPin, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export default function AboutContactPage({ currentPage }) {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.489115715206!2d72.8552!3d19.1764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b71891b0f51d%3A0x6b8f36c56b797b10!2sRani%20Sati%20Marg%2C%20Malad%20East%2C%20Mumbai%2C%20Maharashtra%20400097!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
  const directMapUrl = "https://www.google.com/maps/search/?api=1&query=Jalaram+Store+Valmik+Sadan+Near+Navjeevan+High+School+Rani+Sati+Marg+Malad+East+Mumbai+400097";
  const whatsappUrl = "https://wa.me/919619113993?text=Hi%20The%20Perfume%20Corner,%20I%20would%20like%20to%20visit%20your%20store%20in%20Malad%20East.";

  useEffect(() => {
    if (currentPage === 'contact') {
      const timer = setTimeout(() => {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (currentPage === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-warm-beige)' }}>
      {/* Hero Banner */}
      <section
        style={{
          backgroundColor: 'var(--accent-dark-brown)',
          color: '#FFF9F0',
          padding: '4.5rem 0 4rem 0',
          borderBottom: '2px solid var(--accent-gold)',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.25em', color: 'var(--accent-gold-light)', textTransform: 'uppercase', fontWeight: 700 }}>
            OUR HERITAGE & LOCATION
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              margin: '0.5rem 0 1rem 0',
              color: '#FFF9F0'
            }}
          >
            ABOUT THE PERFUME CORNER
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 249, 240, 0.85)', fontStyle: 'italic' }}>
            Your neighbourhood destination for attar and inspired fragrances.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-warm-beige)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '3.5rem', alignItems: 'center' }} className="about-split">
            {/* Story Text */}
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                OUR PHILOSOPHY
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                  margin: '0.5rem 0 1.5rem 0',
                  color: 'var(--text-espresso)',
                  lineHeight: 1.2
                }}
              >
                Fragrance That Feels Personal
              </h2>
              
              <p style={{ fontSize: '1rem', color: 'var(--text-espresso-muted)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                At The Perfume Corner, we believe fragrance is more than a scent — it is part of your personality. Our collection focuses on attar and inspired fragrance profiles, offering customers a wide range of familiar, elegant and contemporary scent experiences.
              </p>

              <p style={{ fontSize: '1rem', color: 'var(--text-espresso-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Whether you prefer fresh, woody, floral, sweet, oriental or oud-based fragrances, our collection gives you plenty of profiles to explore.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-dark-brown)' }}>
                  <CheckCircle2 size={18} color="var(--accent-gold)" />
                  <span>100% Alcohol-Free Pure Attars</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-dark-brown)' }}>
                  <CheckCircle2 size={18} color="var(--accent-gold)" />
                  <span>Inspired Profile Expert Guidance</span>
                </div>
              </div>
            </div>

            {/* Visual Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ border: '1px solid var(--accent-gold)', padding: '1rem', background: 'var(--bg-cream)', boxShadow: 'var(--shadow-medium)' }}>
                <img
                  src="/assets/hero_slide_2.png"
                  alt="Attar Bottles at The Perfume Corner"
                  style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SPECIALITY - 3 LARGE CARDS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', borderTop: '1px solid var(--accent-gold-border)', borderBottom: '1px solid var(--accent-gold-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
              WHAT SETS US APART
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.5rem' }}>
              OUR SPECIALITY
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Card 01 */}
            <div style={{ padding: '2.5rem 2rem', backgroundColor: 'var(--bg-warm-beige)', border: '1px solid var(--accent-gold-border)', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                01
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-espresso)', marginBottom: '1rem' }}>
                ATTAR SPECIALISTS
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-espresso-muted)', lineHeight: 1.6 }}>
                Discover concentrated fragrance oils with timeless character and rich traditional depth.
              </p>
            </div>

            {/* Card 02 */}
            <div style={{ padding: '2.5rem 2rem', backgroundColor: 'var(--bg-warm-beige)', border: '1px solid var(--accent-gold-border)', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                02
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-espresso)', marginBottom: '1rem' }}>
                INSPIRED FRAGRANCE PROFILES
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-espresso-muted)', lineHeight: 1.6 }}>
                Explore fragrance styles inspired by iconic scent families for everyday signature elegance.
              </p>
            </div>

            {/* Card 03 */}
            <div style={{ padding: '2.5rem 2rem', backgroundColor: 'var(--bg-warm-beige)', border: '1px solid var(--accent-gold-border)', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                03
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-espresso)', marginBottom: '1rem' }}>
                PERSONAL SERVICE
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-espresso-muted)', lineHeight: 1.6 }}>
                Visit us in store and find a fragrance perfectly suited to your personal preference and style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - 2 COLUMNS */}
      <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-warm-beige)', scrollMarginTop: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
              CONNECT WITH US
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.5rem' }}>
              VISIT OUR BOUTIQUE
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="contact-split">
            {/* LEFT: STORE ADDRESS */}
            <div style={{ padding: '2.5rem', backgroundColor: 'var(--bg-cream)', border: '1px solid var(--accent-gold-border)', borderRadius: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <MapPin size={24} color="var(--accent-gold)" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-espresso)' }}>
                  VISIT OUR STORE
                </h3>
              </div>

              <div style={{ fontSize: '1.05rem', color: 'var(--text-espresso)', lineHeight: 1.8, marginBottom: '2rem' }}>
                <strong>C/O Jalaram Store</strong><br />
                Valmik Sadan<br />
                Near Navjeevan High School<br />
                Rani Sati Marg, Malad East<br />
                Mumbai - 400097
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-espresso-muted)' }}>
                <Clock size={18} color="var(--accent-gold)" />
                <span>Open Mon - Sun: 10:30 AM to 9:30 PM</span>
              </div>
            </div>

            {/* RIGHT: GET IN TOUCH */}
            <div style={{ padding: '2.5rem', backgroundColor: 'var(--bg-cream)', border: '1px solid var(--accent-gold-border)', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Phone size={24} color="var(--accent-gold)" />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-espresso)' }}>
                    GET IN TOUCH
                  </h3>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    Call or Inquiry Hotline:
                  </div>
                  <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text-espresso)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <a href="tel:9619113993" style={{ color: 'var(--text-espresso)' }}>9619113993</a>
                    <a href="tel:8424955955" style={{ color: 'var(--text-espresso)' }}>8424955955</a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <a
                  href="tel:9619113993"
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Phone size={18} />
                  <span>CALL NOW</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={18} color="#25D366" />
                  <span>WHATSAPP</span>
                </a>

                <a
                  href={directMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Navigation size={18} />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', borderTop: '1px solid var(--accent-gold-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <MapPin size={22} color="var(--accent-gold)" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-espresso)' }}>
              Store Location Map
            </h3>
          </div>

          <div
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid var(--accent-gold)',
              boxShadow: 'var(--shadow-medium)',
              height: '450px'
            }}
          >
            <iframe
              title="The Perfume Corner Location Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-split, .contact-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
