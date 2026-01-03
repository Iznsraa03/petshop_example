// Configuration for image sources
// Menggunakan gambar dari Internet (bukan Unsplash API)

/**
 * Collection of direct image URLs from internet sources
 * These are royalty-free images that can be used freely
 * 
 * Sumber gambar bebas:
 * - Pixabay: https://pixabay.com/
 * - Pexels: https://www.pexels.com/
 * - Unsplash (Direct): https://unsplash.com/
 * - Pikioi: https://pikioai.com/
 * - Lorem Picsum: https://picsum.photos/
 */

interface ImageUrlOptions {
  width?: number;
  height?: number;
  quality?: number;
}

/**
 * Collection of pet images from free sources
 * You can replace these URLs with your own images
 */
const PET_IMAGE_URLS = {
  // Gallery images (6 gambar untuk galeri)
  gallery: [
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', // Kucing lucu
    'https://images.pexels.com/photos/356694/pexels-photo-356694.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', // Anjing bahagia
    'https://images.pexels.com/photos/1346438/pexels-photo-1346438.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', // Anak anjing
    'https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', // Perawatan hewan
    'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', // Grooming
    'https://images.pexels.com/photos/2882556/pexels-photo-2882556.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'  // Hewan bahagia
  ],
  
  // Hero background image (background hero section)
  hero: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
};

/**
 * Build image URL with optional parameters
 * @param imageUrl - Direct image URL
 * @param options - Optional formatting options
 * @returns Image URL
 */
const buildImageUrl = (
  imageUrl: string,
  options: ImageUrlOptions = {}
): string => {
  // Jika URL sudah lengkap, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // Jika path lokal, tambahkan base URL
  return `/images/${imageUrl}`;
};

/**
 * Fetch gallery images dari internet
 * Tidak menggunakan Unsplash API, cukup mengambil dari array URLs yang sudah disiapkan
 * @param query - Search query (tidak digunakan, hanya untuk kompatibilitas)
 * @param count - Jumlah gambar yang diinginkan
 * @returns Array berisi URL gambar
 */
export const fetchUnsplashImages = async (
  query: string = 'pets',
  count: number = 6
): Promise<string[]> => {
  try {
    // Ambil gambar dari koleksi lokal
    const images = PET_IMAGE_URLS.gallery.slice(0, count);
    
    console.log(`Loaded ${images.length} pet images from internet sources`);
    return images;
  } catch (error) {
    console.error('Error loading images:', error);
    
    // Return default pet images jika ada error
    return PET_IMAGE_URLS.gallery.slice(0, count);
  }
};

/**
 * Get hero/background image URL dari internet
 * Tidak menggunakan Unsplash API
 * @param query - Search query (tidak digunakan, hanya untuk kompatibilitas)
 * @param width - Lebar gambar yang diinginkan
 * @param height - Tinggi gambar yang diinginkan
 * @returns URL gambar hero
 */
export const getUnsplashImageUrl = (
  query: string = 'pets',
  width: number = 1920,
  height: number = 1080
): string => {
  // Return hero image URL langsung dari internet
  // Anda bisa mengganti URL ini dengan gambar pilihan Anda
  return PET_IMAGE_URLS.hero;
};
