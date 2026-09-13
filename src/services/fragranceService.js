import { db, storage } from '../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from 'firebase/storage';
import { FRAGRANCES as INITIAL_FRAGRANCES } from '../data/fragrances';

const COLLECTION_NAME = 'perfumes';
const LOCAL_STORAGE_CUSTOM_KEY = 'jassi_custom_perfumes';

// Helper: Compress/Resize image to lightweight Base64 Data URL as fallback
function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function getLocalCustomPerfumes() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalCustomPerfumes(items) {
  try {
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
}

/**
 * Fetch all fragrances (combining base dataset, Firestore, and local items)
 */
export async function getAllFragrances() {
  const localItems = getLocalCustomPerfumes();
  let firestoreItems = [];

  try {
    const perfumesRef = collection(db, COLLECTION_NAME);
    const q = query(perfumesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q).catch(async () => {
      return await getDocs(perfumesRef);
    });

    snapshot.forEach((docSnap) => {
      firestoreItems.push({
        ...docSnap.data(),
        id: docSnap.id,
        isCustom: true
      });
    });
  } catch (error) {
    console.warn("Firestore offline or not yet initialized in console; using local storage fallback.");
  }

  // Deduplicate by ID
  const dynamicMap = new Map();
  // Add local items first
  localItems.forEach(item => dynamicMap.set(item.id, item));
  // Add firestore items (overwriting if same id)
  firestoreItems.forEach(item => dynamicMap.set(item.id, item));

  const dynamicList = Array.from(dynamicMap.values());

  // Dynamic custom added items appear at top, followed by initial 44 base perfumes
  return [...dynamicList, ...INITIAL_FRAGRANCES];
}

/**
 * Upload & process perfume image file
 * Automatically compresses into high-performance web-optimized image format
 * Stores directly inside Firestore without needing credit card or Blaze billing!
 */
export async function uploadPerfumeImage(file, onProgress) {
  if (!file) throw new Error("No image file provided");

  if (onProgress) onProgress(30);
  // Compress to lightweight web image (~40-60 KB)
  const compressedDataUrl = await fileToBase64(file);
  if (onProgress) onProgress(100);

  return compressedDataUrl;
}

/**
 * Add a new perfume (tries Firestore, falls back to local storage)
 */
export async function addFragrance(perfumeData) {
  const newId = 'local_' + Date.now();
  const payload = {
    name: (perfumeData.name || '').trim().toUpperCase(),
    category: perfumeData.category || 'UNISEX',
    type: perfumeData.type || 'INSPIRED FRAGRANCES',
    subtitle: (perfumeData.subtitle || '').trim(),
    notes: (perfumeData.notes || '').trim(),
    description: (perfumeData.description || '').trim(),
    image: perfumeData.image || '',
    isFeatured: Boolean(perfumeData.isFeatured),
    createdAt: new Date().toISOString()
  };

  try {
    const perfumesRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(perfumesRef, {
      ...payload,
      createdAt: serverTimestamp()
    });

    const firestoreProduct = {
      ...payload,
      id: docRef.id,
      isCustom: true
    };

    // Also cache locally
    const currentLocals = getLocalCustomPerfumes();
    saveLocalCustomPerfumes([firestoreProduct, ...currentLocals]);

    return firestoreProduct;
  } catch (err) {
    console.warn("Saving to local storage as fallback:", err.message);
    const localProduct = {
      ...payload,
      id: newId,
      isCustom: true
    };

    const currentLocals = getLocalCustomPerfumes();
    saveLocalCustomPerfumes([localProduct, ...currentLocals]);

    return localProduct;
  }
}

/**
 * Delete a custom perfume
 */
export async function deleteFragrance(id) {
  if (!id) return;

  // Remove from local storage
  const currentLocals = getLocalCustomPerfumes();
  const updated = currentLocals.filter(item => item.id !== id);
  saveLocalCustomPerfumes(updated);

  // Try removing from Firestore if it's a firestore id
  if (!id.startsWith('local_')) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (e) {
      console.warn("Could not delete from Firestore:", e.message);
    }
  }
}
