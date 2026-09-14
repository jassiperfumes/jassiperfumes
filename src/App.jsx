import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyBottomBar from './components/StickyBottomBar';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import AboutContactPage from './pages/AboutContactPage';
import ProductPage from './pages/ProductPage';
import { FRAGRANCES as INITIAL_FRAGRANCES, slugify } from './data/fragrances';
import { getAllFragrances } from './services/fragranceService';

// Code-split admin bundle to reduce initial JavaScript payload for visitors and Googlebot
const AdminPage = lazy(() => import('./pages/AdminPage'));

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProductSlug, setCurrentProductSlug] = useState(null);
  const [fragrances, setFragrances] = useState(INITIAL_FRAGRANCES);

  // Load latest fragrances from Firebase / cache
  const refreshFragrances = useCallback(async () => {
    try {
      const data = await getAllFragrances();
      if (data && data.length > 0) {
        setFragrances(data);
      }
    } catch (e) {
      console.warn("Could not load dynamic fragrances:", e);
    }
  }, []);

  useEffect(() => {
    refreshFragrances();
  }, [refreshFragrances]);

  // Route parser for crawlable clean URLs (e.g. #/, #/catalogue, #/products/wisdom, #/contact, #/admin)
  const parseRoute = useCallback(() => {
    const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    
    if (rawHash === 'admin') {
      setCurrentPage('admin');
      setCurrentProductSlug(null);
    } else if (rawHash === 'catalogue' || rawHash === 'catalog') {
      setCurrentPage('catalogue');
      setCurrentProductSlug(null);
    } else if (rawHash === 'about' || rawHash === 'contact' || rawHash === 'about-contact' || rawHash === 'visit-store') {
      setCurrentPage('about-contact');
      setCurrentProductSlug(null);
    } else if (rawHash.startsWith('products/')) {
      const slug = rawHash.replace('products/', '');
      setCurrentPage('product');
      setCurrentProductSlug(slug);
    } else {
      setCurrentPage('home');
      setCurrentProductSlug(null);
    }
  }, []);

  // Handle URL hash changes
  useEffect(() => {
    parseRoute();
    window.addEventListener('hashchange', parseRoute);
    return () => window.removeEventListener('hashchange', parseRoute);
  }, [parseRoute]);

  // Stable, descriptive title management
  useEffect(() => {
    const SITE_TITLE = "Jassi Perfumes | Premium Attar & Inspired Fragrances in Malad East, Mumbai";
    if (currentPage === 'home') {
      document.title = SITE_TITLE;
    } else if (currentPage === 'catalogue') {
      document.title = "Fragrance Catalogue & Collection | Jassi Perfumes Malad East Mumbai";
    } else if (currentPage === 'about-contact') {
      document.title = "Visit Our Store & Contact | Jassi Perfumes Rani Sati Marg Malad East";
    } else if (currentPage === 'admin') {
      document.title = "Store Admin Dashboard | Jassi Perfumes";
    }
  }, [currentPage]);

  // Find selected fragrance when on product route
  const currentFragrance = currentProductSlug
    ? fragrances.find(f => slugify(f.name) === currentProductSlug || String(f.id) === currentProductSlug)
    : null;

  const handleSelectFragrance = (fragrance) => {
    if (!fragrance) return;
    const slug = slugify(fragrance.name);
    window.location.hash = `#/products/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (pageName) => {
    if (pageName === 'home') {
      window.location.hash = '#/';
    } else if (pageName === 'catalogue') {
      window.location.hash = '#/catalogue';
    } else if (pageName === 'contact' || pageName === 'about' || pageName === 'about-contact') {
      window.location.hash = '#/contact';
    } else if (pageName === 'admin') {
      window.location.hash = '#/admin';
    }
    setCurrentPage(pageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Global Header */}
      <Header currentPage={currentPage} setCurrentPage={navigateTo} />

      {/* Main Page Content with Crawlable Routes */}
      <main style={{ flexGrow: 1 }}>
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={navigateTo}
            onSelectFragrance={handleSelectFragrance}
            fragrances={fragrances}
          />
        )}

        {currentPage === 'catalogue' && (
          <CataloguePage
            onSelectFragrance={handleSelectFragrance}
            fragrances={fragrances}
          />
        )}

        {currentPage === 'product' && (
          <ProductPage
            fragrance={currentFragrance}
            allFragrances={fragrances}
            setCurrentPage={navigateTo}
            onSelectFragrance={handleSelectFragrance}
          />
        )}

        {currentPage === 'about-contact' && (
          <AboutContactPage currentPage={currentPage} />
        )}

        {currentPage === 'admin' && (
          <Suspense fallback={
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A1412', color: '#D4AF37' }}>
              <div>Loading Admin Portal...</div>
            </div>
          }>
            <AdminPage
              setCurrentPage={navigateTo}
              onFragrancesUpdated={refreshFragrances}
            />
          </Suspense>
        )}
      </main>

      {/* Global Footer */}
      <Footer setCurrentPage={navigateTo} />

      {/* Sticky Mobile Action Bar */}
      <StickyBottomBar />
    </div>
  );
}
