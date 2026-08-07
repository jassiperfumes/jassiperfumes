import React, { useState } from 'react';
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
