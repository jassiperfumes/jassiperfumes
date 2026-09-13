import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyBottomBar from './components/StickyBottomBar';
import FragranceModal from './components/FragranceModal';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import AboutContactPage from './pages/AboutContactPage';
import AdminPage from './pages/AdminPage';
import { FRAGRANCES as INITIAL_FRAGRANCES } from './data/fragrances';
import { getAllFragrances } from './services/fragranceService';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.hash === '#admin' ? 'admin' : 'home';
  });
  const [selectedFragrance, setSelectedFragrance] = useState(null);
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

  // Handle URL hash changes (e.g. user visits #admin or #catalogue)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin') {
        setCurrentPage('admin');
      } else if (hash === 'catalogue') {
        setCurrentPage('catalogue');
      } else if (hash === 'about' || hash === 'contact') {
        setCurrentPage('about-contact');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamic Blinking Browser Tab Title when user switches tabs
  useEffect(() => {
    const SITE_TITLE = "Jassi Perfumes | Premium Attar & Inspired Fragrances in Malad East";
    let delayTimer = null;
    let blinkInterval = null;

    const stopBlinkingAndRestore = () => {
      if (delayTimer) {
        clearTimeout(delayTimer);
        delayTimer = null;
      }
      if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
      }
      document.title = SITE_TITLE;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Wait 2 seconds before starting the blinking effect
        delayTimer = setTimeout(() => {
          let toggle = false;
          document.title = "👉 Come here";

          // Blink title every 0.5 seconds (500ms) alternating between "Jassi Perfumes" and "👉 Come here"
          blinkInterval = setInterval(() => {
            document.title = toggle ? "👉 Come here" : "Jassi Perfumes";
            toggle = !toggle;
          }, 500);
        }, 2000);
      } else {
        // Customer returned to tab - immediately restore website title
        stopBlinkingAndRestore();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', stopBlinkingAndRestore);

    // Initial check on mount
    document.title = SITE_TITLE;

    return () => {
      stopBlinkingAndRestore();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', stopBlinkingAndRestore);
    };
  }, []);

  const handleSelectFragrance = (fragrance) => {
    setSelectedFragrance(fragrance);
  };

  const handleCloseModal = () => {
    setSelectedFragrance(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Global Header */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={setCurrentPage}
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

        {(currentPage === 'about' || currentPage === 'contact' || currentPage === 'about-contact') && (
          <AboutContactPage currentPage={currentPage} />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            setCurrentPage={setCurrentPage}
            onFragrancesUpdated={refreshFragrances}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Sticky Mobile Action Bar */}
      <StickyBottomBar />

      {/* Fragrance Detail Modal */}
      <FragranceModal
        fragrance={selectedFragrance}
        onClose={handleCloseModal}
      />
    </div>
  );
}
