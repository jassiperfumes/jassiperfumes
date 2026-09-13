import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Upload,
  Sparkles,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Star,
  Eye,
  LogOut,
  RefreshCw,
  Search
} from 'lucide-react';
import {
  getAllFragrances,
  uploadPerfumeImage,
  addFragrance,
  deleteFragrance
} from '../services/fragranceService';

// Supported PINs for the store owner (easy to remember)
const VALID_PINS = ['03082011'];

export default function AdminPage({ setCurrentPage, onFragrancesUpdated }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('jassi_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Image Upload State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  // Product List State
  const [fragrancesList, setFragrancesList] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef(null);

  // Load product list on auth
  useEffect(() => {
    if (isAuthenticated) {
      loadFragrances();
    }
  }, [isAuthenticated]);

  const loadFragrances = async () => {
    setIsLoadingList(true);
    try {
      const items = await getAllFragrances();
      setFragrancesList(items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingList(false);
    }
  };

  // Handle PIN Submission
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (VALID_PINS.includes(pinInput.trim())) {
      setIsAuthenticated(true);
      sessionStorage.setItem('jassi_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect PIN. Please try again.');
      setPinInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('jassi_admin_auth');
    setPinInput('');
  };

  // Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Product Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a perfume name.' });
      return;
    }
    if (!imageFile && !imagePreview) {
      setStatusMessage({ type: 'error', text: 'Please select a photo or pick a bottle image.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);
    setUploadProgress(15);

    try {
      let imageUrl = imagePreview;
      // If a new file is chosen, upload it (tries Firebase, falls back to optimized base64)
      if (imageFile) {
        imageUrl = await uploadPerfumeImage(imageFile, (progress) => {
          setUploadProgress(progress);
        });
      }

      // 2. Save metadata to Firestore (with local storage fallback)
      const newProduct = await addFragrance({
        name,
        category: 'FRAGRANCES',
        type: 'INSPIRED FRAGRANCES',
        notes: '',
        description,
        image: imageUrl,
        isFeatured: true
      });

      // Reset form
      setName('');
      setDescription('');
      setImageFile(null);
      setImagePreview('');
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';

      setStatusMessage({
        type: 'success',
        text: `"${newProduct.name}" added successfully and is now live on the website!`
      });

      // Reload products list & notify parent app
      await loadFragrances();
      if (onFragrancesUpdated) onFragrancesUpdated();

      // Scroll to message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error saving perfume:", error);
      setStatusMessage({
        type: 'error',
        text: 'Failed to upload perfume. Please check your internet connection or Firebase setup.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete product
  const handleDelete = async (item) => {
    if (!item.isCustom) {
      alert("This is a core template perfume and cannot be deleted directly from here.");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete "${item.name}"?`);
    if (!confirmDelete) return;

    try {
      await deleteFragrance(item.id);
      setStatusMessage({ type: 'success', text: `"${item.name}" was deleted.` });
      await loadFragrances();
      if (onFragrancesUpdated) onFragrancesUpdated();
    } catch (error) {
      console.error("Delete error:", error);
      setStatusMessage({ type: 'error', text: 'Could not delete product.' });
    }
  };

  // Filter list
  const filteredList = fragrancesList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // ----------------------------------------------------
  // LOCK SCREEN IF NOT LOGGED IN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
          backgroundColor: '#1C1512'
        }}
      >
        <div
          style={{
            maxWidth: '420px',
            width: '100%',
            backgroundColor: '#271D18',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 55, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              border: '1px solid rgba(212, 175, 55, 0.4)'
            }}
          >
            <Lock size={30} color="#D4AF37" />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.75rem',
              color: '#FFF9F0',
              margin: '0 0 0.5rem 0'
            }}
          >
            Jassi Perfumes Admin
          </h2>
          <p style={{ color: 'rgba(255, 249, 240, 0.7)', fontSize: '0.875rem', marginBottom: '2rem' }}>
            Enter your secret store PIN to add and manage perfume photos & products.
          </p>

          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              maxLength={8}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN"
              autoFocus
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '1.25rem',
                textAlign: 'center',
                letterSpacing: '0.25em',
                borderRadius: '8px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                backgroundColor: '#18120F',
                color: '#FFF9F0',
                outline: 'none',
                marginBottom: '1rem',
                boxSizing: 'border-box'
              }}
            />

            {authError && (
              <div style={{ color: '#FF7B7B', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {authError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.9rem',
                backgroundColor: 'var(--accent-gold)',
                color: '#1C1512',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.2s'
              }}
            >
              Unlock Dashboard
            </button>
          </form>

          <button
            onClick={() => setCurrentPage('home')}
            style={{
              marginTop: '1.5rem',
              background: 'none',
              border: 'none',
              color: 'rgba(255, 249, 240, 0.6)',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft size={14} /> Return to Storefront
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // ----------------------------------------------------
  return (
    <div style={{ backgroundColor: '#1A1412', color: '#FFF9F0', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* Top Admin Bar */}
      <div
        style={{
          backgroundColor: '#271D18',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setCurrentPage('home')}
            style={{
              backgroundColor: 'rgba(255, 249, 240, 0.1)',
              border: '1px solid rgba(255, 249, 240, 0.2)',
              color: '#FFF9F0',
              padding: '0.5rem 0.9rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem'
            }}
          >
            <ArrowLeft size={15} /> Back to Store
          </button>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: 0, color: 'var(--accent-gold-light)' }}>
              Jassi Perfumes • Product Manager
            </h1>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 249, 240, 0.6)' }}>
              Add photos and fragrance names directly to your website
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 100, 100, 0.3)',
            color: '#FF9B9B',
            padding: '0.5rem 0.9rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem'
          }}
        >
          <LogOut size={15} /> Logout
        </button>
      </div>

      <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>

        {/* Status Toast */}
        {statusMessage && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: statusMessage.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${statusMessage.type === 'success' ? '#22C55E' : '#EF4444'}`,
              color: statusMessage.type === 'success' ? '#4ADE80' : '#FCA5A5'
            }}
          >
            {statusMessage.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span style={{ fontSize: '0.925rem', fontWeight: 500 }}>{statusMessage.text}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>

          {/* LEFT: ADD NEW PERFUME FORM */}
          <div
            style={{
              backgroundColor: '#271D18',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '12px',
              padding: '1.75rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Plus size={18} color="var(--accent-gold)" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', margin: 0, color: '#FFF9F0' }}>
                Add New Perfume
              </h2>
            </div>

            <form onSubmit={handleFormSubmit}>

              {/* Image Upload Box */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--accent-gold-light)' }}>
                  Perfume Bottle Photo *
                </label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed rgba(212, 175, 55, 0.4)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#1F1714',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s'
                  }}
                >
                  {imagePreview ? (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxHeight: '180px',
                          maxWidth: '100%',
                          objectFit: 'contain',
                          borderRadius: '6px',
                          marginBottom: '0.5rem'
                        }}
                      />
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                        Click to change photo
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload size={32} color="#D4AF37" style={{ margin: '0 auto 0.5rem auto' }} />
                      <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#FFF9F0' }}>
                        Click to upload photo
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255, 249, 240, 0.6)', marginTop: '4px' }}>
                        Take a photo with your phone or select from gallery
                      </div>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', marginBottom: '4px' }}>
                      Uploading photo: {uploadProgress}%
                    </div>
                    <div style={{ height: '4px', backgroundColor: '#33241E', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${uploadProgress}%`, height: '100%', backgroundColor: 'var(--accent-gold)', transition: 'width 0.2s' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Perfume Name */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--accent-gold-light)' }}>
                  Perfume Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. AMBER SUPREME"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 249, 240, 0.2)',
                    backgroundColor: '#1E1613',
                    color: '#FFF9F0',
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--accent-gold-light)' }}>
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief note about the scent character or inspiration..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 249, 240, 0.2)',
                    backgroundColor: '#1E1613',
                    color: '#FFF9F0',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  backgroundColor: isSubmitting ? '#A3842C' : 'var(--accent-gold)',
                  color: '#1C1512',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  letterSpacing: '0.04em',
                  transition: 'background-color 0.2s'
                }}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Uploading & Publishing...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Publish Perfume Live
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: CURRENT PERFUMES LIST */}
          <div>
            <div
              style={{
                backgroundColor: '#271D18',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                height: 'calc(100% - 3rem)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: 0, color: '#FFF9F0' }}>
                    Store Fragrances ({fragrancesList.length})
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255, 249, 240, 0.6)' }}>
                    Items added via this portal can be deleted anytime
                  </span>
                </div>
                <button
                  onClick={loadFragrances}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255, 249, 240, 0.2)',
                    color: '#FFF9F0',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <Search size={16} color="rgba(255,249,240,0.5)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Filter perfumes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.6rem 0.6rem 2.2rem',
                    backgroundColor: '#1E1613',
                    border: '1px solid rgba(255,249,240,0.15)',
                    borderRadius: '6px',
                    color: '#FFF9F0',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Product List Scrollable */}
              <div style={{ overflowY: 'auto', maxHeight: '580px', flexGrow: 1, paddingRight: '4px' }}>
                {isLoadingList ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,249,240,0.6)' }}>
                    <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem auto' }} />
                    <div>Loading perfumes...</div>
                  </div>
                ) : filteredList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,249,240,0.6)', fontSize: '0.9rem' }}>
                    No perfumes found matching "{searchTerm}"
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {filteredList.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          backgroundColor: '#1F1714',
                          border: item.isCustom ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(255, 249, 240, 0.1)',
                          borderRadius: '8px',
                          padding: '0.65rem 0.85rem',
                          position: 'relative'
                        }}
                      >
                        {/* Image Thumb */}
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            backgroundColor: '#271D18',
                            flexShrink: 0
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>

                        {/* Details */}
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#FFF9F0', textTransform: 'uppercase' }}>
                              {item.name}
                            </span>
                            {item.isCustom && (
                              <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(212, 175, 55, 0.25)', color: '#D4AF37', padding: '1px 5px', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
                                Client Added
                              </span>
                            )}
                            {item.isFeatured && (
                              <Star size={12} fill="#D4AF37" color="#D4AF37" title="Featured" />
                            )}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 249, 240, 0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.category} • {item.notes || item.description || 'No notes specified'}
                          </div>
                        </div>

                        {/* Actions */}
                        {item.isCustom && (
                          <button
                            onClick={() => handleDelete(item)}
                            title="Delete this perfume"
                            style={{
                              backgroundColor: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#F87171',
                              padding: '6px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
