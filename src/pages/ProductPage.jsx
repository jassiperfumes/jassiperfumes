import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Droplet, 
  Clock, 
  Share2, 
  Compass,
  CheckCircle2
} from 'lucide-react';
import { slugify } from '../data/fragrances';

export default function ProductPage({ fragrance, allFragrances, setCurrentPage, onSelectFragrance }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (fragrance) {
      const pageTitle = `${fragrance.name} - Luxury Fragrance | Jassi Perfumes Malad East Mumbai`;
      document.title = pageTitle;

      // Update meta description dynamically
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Inquire and order ${fragrance.name} at Jassi Perfumes, Malad East, Mumbai. ${fragrance.notes ? `Scent notes: ${fragrance.notes}. ` : ''}${fragrance.description || ''} 100% alcohol-free attars and inspired perfumes.`
        );
      }
    }

    return () => {
      document.title = "Jassi Perfumes | Premium Attar & Inspired Fragrances | Malad East, Mumbai";
    };
  }, [fragrance]);

  if (!fragrance) {
    return (
      <div style={{ backgroundColor: 'var(--bg-warm-beige)', minHeight: '80vh', padding: '5rem 1rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-espresso)', marginBottom: '1rem' }}>
            Fragrance Not Found
          </h2>
          <p style={{ color: 'var(--text-espresso-muted)', marginBottom: '2rem' }}>
            The requested fragrance profile could not be found or may have been updated.
          </p>
          <a
            href="#/catalogue"
            onClick={(e) => { e.preventDefault(); setCurrentPage('catalogue'); window.location.hash = '#/catalogue'; }}
            className="btn-gold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={16} />
            <span>Return to Full Catalogue</span>
          </a>
        </div>
      </div>
    );
  }

  // Related items from same category
  const relatedItems = (allFragrances || [])
    .filter(item => item.id !== fragrance.id && (item.category === fragrance.category || item.type === fragrance.type))
    .slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Hi Jassi Perfumes! I am viewing "${fragrance.name}" on your website (https://jassiperfumes.in/#/products/${slugify(fragrance.name)}). Please share price, available bottle sizes (e.g. 6ml/12ml attar or spray) & availability.`
  );
  const whatsappUrl = `https://wa.me/919619113993?text=${whatsappMessage}`;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${fragrance.name} | Jassi Perfumes`,
        text: `Check out ${fragrance.name} at Jassi Perfumes Malad East Mumbai:`,
        url: url
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <article className="animate-fade-in" style={{ backgroundColor: 'var(--bg-warm-beige)', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Breadcrumbs Banner */}
      <nav aria-label="Breadcrumb" style={{ backgroundColor: 'var(--accent-dark-brown)', borderBottom: '1px solid var(--accent-gold-border)', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <ol style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, padding: 0, fontSize: '0.825rem', color: 'rgba(255, 249, 240, 0.7)' }}>
            <li>
              <a 
                href="#/" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.location.hash = '#/'; }}
                style={{ color: 'var(--accent-gold-light)', textDecoration: 'none' }}
              >
                Home
              </a>
            </li>
            <li aria-hidden="true" style={{ color: 'rgba(255, 249, 240, 0.4)' }}>/</li>
            <li>
              <a 
                href="#/catalogue" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('catalogue'); window.location.hash = '#/catalogue'; }}
                style={{ color: 'var(--accent-gold-light)', textDecoration: 'none' }}
              >
                Catalogue
              </a>
            </li>
            <li aria-hidden="true" style={{ color: 'rgba(255, 249, 240, 0.4)' }}>/</li>
            <li aria-current="page" style={{ color: '#FFF9F0', fontWeight: 600 }}>
              {fragrance.name}
            </li>
          </ol>

          <button
            onClick={handleShare}
            style={{
              background: 'none',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '20px',
              padding: '4px 12px',
              color: 'var(--accent-gold-light)',
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Share2 size={13} />
            <span>Share Fragrance</span>
          </button>
        </div>
      </nav>

      {/* Main Product Showcase */}
      <div className="container" style={{ maxWidth: '1100px', margin: '2.5rem auto 0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          
          {/* Left: High-Res Visual Presentation */}
          <div style={{ position: 'sticky', top: '2rem' }}>
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #ECE5DB',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 30px rgba(43, 33, 27, 0.08)',
                position: 'relative'
              }}
            >
              <img
                src={fragrance.image}
                alt={`${fragrance.name} - ${fragrance.notes || fragrance.description || 'Luxury Attar & Perfume'} | Jassi Perfumes Malad East Mumbai`}
                style={{
                  maxHeight: '420px',
                  width: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto'
                }}
              />

              <div 
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  display: 'flex',
                  gap: '6px'
                }}
              >
                <span 
                  style={{
                    backgroundColor: 'var(--accent-dark-brown)',
                    color: 'var(--accent-gold-light)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em'
                  }}
                >
                  {fragrance.category}
                </span>
                {fragrance.isFeatured && (
                  <span 
                    style={{
                      backgroundColor: 'rgba(212, 175, 55, 0.15)',
                      color: '#B48B25',
                      border: '1px solid #D4AF37',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 700
                    }}
                  >
                    FEATURED
                  </span>
                )}
              </div>
            </div>

            {/* Quality Badges Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '1.25rem' }}>
              <div style={{ backgroundColor: '#FAF7F2', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #F0E8DD' }}>
                <Droplet size={18} color="var(--accent-gold)" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-espresso)' }}>100% ALCOHOL-FREE</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-espresso-muted)' }}>Pure concentrated oil</div>
              </div>
              <div style={{ backgroundColor: '#FAF7F2', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #F0E8DD' }}>
                <Sparkles size={18} color="var(--accent-gold)" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-espresso)' }}>LONG-LASTING</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-espresso-muted)' }}>12 to 24 hr aura</div>
              </div>
              <div style={{ backgroundColor: '#FAF7F2', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #F0E8DD' }}>
                <ShieldCheck size={18} color="var(--accent-gold)" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-espresso)' }}>SKIN SAFE</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-espresso-muted)' }}>Gentle formulation</div>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Funnel */}
          <div>
            
            {/* Type badge */}
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
              {fragrance.type || 'INSPIRED FRAGRANCES'}
            </span>

            {/* H1 Heading for SEO */}
            <h1 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                color: 'var(--text-espresso)',
                margin: '0.35rem 0 0.5rem 0',
                lineHeight: 1.15
              }}
            >
              {fragrance.name}
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: '0.95rem', color: '#7A6F68', margin: '0 0 1.5rem 0', fontWeight: 600 }}>
              {fragrance.subtitle || (fragrance.category === 'GIFT ITEMS' ? 'Premium Gift Item' : 'Luxury Inspired Fragrance Edition')}
            </p>

            {/* Fragrance Notes Box */}
            {fragrance.notes && (
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '1.25rem 1.5rem',
                  border: '1px solid var(--accent-gold-border)',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Verified Scent Notes & Accords
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-espresso)', lineHeight: 1.4 }}>
                  {fragrance.notes}
                </div>
              </div>
            )}

            {/* Plain-Language Description */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-espresso)', marginBottom: '0.5rem' }}>
                Fragrance Profile & Character
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-espresso)', lineHeight: 1.7, margin: 0 }}>
                {fragrance.description || 'A masterpiece of artisanal perfumery blending timeless traditions with modern luxury. Available in concentrated non-alcoholic attar oil and premium spray impressions.'}
              </p>
            </div>

            {/* Available Formats & Sizes */}
            <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #ECE5DB', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-espresso)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Available Options at Jassi Perfumes Store:
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-espresso)', lineHeight: 1.6 }}>
                <li><strong>Concentrated Pure Attar Oil:</strong> 6ml & 12ml luxury crystal roll-on bottles</li>
                <li><strong>Artisanal Parfum Sprays:</strong> 30ml & 50ml pocket / travel atomizers</li>
                <li><strong>Custom Gift Boxes:</strong> Available for weddings, corporate & festive gifting</li>
              </ul>
            </div>

            {/* Action CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '1rem 1.75rem',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <MessageCircle size={20} />
                <span>Inquire & Order on WhatsApp</span>
              </a>

              <a
                href="tel:9619113993"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-espresso)',
                  border: '1.5px solid var(--accent-gold)',
                  padding: '0.85rem 1.5rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
              >
                <Phone size={16} color="var(--accent-gold)" />
                <span>Call Store Hotline: 9619113993 / 8424955955</span>
              </a>
            </div>

            {/* Store Location & Pickup Guarantee */}
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '1px solid #ECE5DB',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}
            >
              <MapPin size={22} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-espresso)' }}>
                  In-Store Fragrance Exploration Available
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-espresso-muted)', lineHeight: 1.5, marginTop: '2px' }}>
                  Visit our Malad East store to sample this fragrance on tester strips before purchasing:
                  <br />
                  <strong>C/O Jalaram Store, Valmik Sadan, Near Navjeevan High School, Rani Sati Marg, Malad East, Mumbai - 400097</strong>
                  <br />
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Open 7 Days: 10:30 AM to 9:30 PM</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Related Fragrances Section */}
        {relatedItems.length > 0 && (
          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--accent-gold-border)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                SIMILAR AROMATIC PROFILES
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-espresso)', margin: '0.25rem 0 0 0' }}>
                You May Also Admire
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {relatedItems.map(item => (
                <a
                  key={item.id}
                  href={`#/products/${slugify(item.name)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSelectFragrance) onSelectFragrance(item);
                    window.location.hash = `#/products/${slugify(item.name)}`;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #ECE5DB',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 14px rgba(43, 33, 27, 0.05)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <div style={{ backgroundColor: '#FAF7F2', aspectRatio: '1 / 1', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={item.image} 
                      alt={`${item.name} | Jassi Perfumes`} 
                      style={{ maxHeight: '140px', width: '100%', objectFit: 'contain' }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {item.category}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-espresso)', margin: '2px 0 4px 0' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-espresso-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.notes || item.subtitle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>

    </article>
  );
}
