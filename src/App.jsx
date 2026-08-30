import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyBottomBar from './components/StickyBottomBar';
import FragranceModal from './components/FragranceModal';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import AboutContactPage from './pages/AboutContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedFragrance, setSelectedFragrance] = useState(null);

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
          />
        )}

        {currentPage === 'catalogue' && (
          <CataloguePage
            onSelectFragrance={handleSelectFragrance}
          />
        )}

        {(currentPage === 'about' || currentPage === 'contact' || currentPage === 'about-contact') && (
          <AboutContactPage currentPage={currentPage} />
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
