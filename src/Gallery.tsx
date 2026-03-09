/**
 * Gallery: fetches images from Unsplash API (React Query), shows skeleton while loading,
 * grid of images with download button and click-to-open full-size modal.
 */
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BsDownload } from 'react-icons/bs';
import { useGlobalContext } from './context';
import type { UnsplashSearchResponse, UnsplashPhoto } from './types/unsplash';

/** Base Unsplash search API URL; query and per_page are appended (per_page=12 for even grid) */
const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}&per_page=12`;

/**
 * Triggers a file download: fetches image as blob, creates object URL, programmatic <a download> click.
 * Fallback: open image in new tab if fetch fails (e.g. CORS).
 */
const downloadImage = async (imageUrl: string, filename: string) => {
  try {
    const res = await fetch(imageUrl, { mode: 'cors' });
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename || 'unsplash-image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = filename || 'unsplash-image.jpg';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  /** When set, the full-size modal is open showing this photo */
  const [modalImage, setModalImage] = useState<UnsplashPhoto | null>(null);

  /** Escape key closes modal; lock body scroll while modal is open */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalImage(null);
    };
    if (modalImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [modalImage]);

  /** React Query: cache key includes searchTerm so new search refetches; results cached per term */
  const response = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async (): Promise<UnsplashSearchResponse> => {
      const result = await axios.get<UnsplashSearchResponse>(
        `${url}&query=${searchTerm}`
      );
      return result.data;
    },
  });
  /** Skeleton grid: same layout as image grid (12 cards) so no layout shift */
  if (response.isLoading) {
    return (
      <section className='image-container'>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className='skeleton-card' aria-hidden='true' />
        ))}
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className='image-container'>
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className='image-container'>
        <h4>No results found...</h4>
      </section>
    );
  }

  /** Grid of images: click image → modal; click download icon → save file (stopPropagation so modal doesn't open) */
  return (
    <>
      <section className='image-container'>
        {results.map((item) => {
          const imgUrl = item?.urls?.regular;
          const fullUrl = item?.urls?.full ?? imgUrl;
          return (
            <div key={item.id} className='gallery-item-wrapper'>
              <img
                src={imgUrl}
                alt={item.alt_description ?? ''}
                className='img gallery-img'
                onClick={() => setModalImage(item)}
              />
              <button
                type='button'
                className='gallery-download-btn'
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(
                    fullUrl ?? '',
                    `unsplash-${item.id}.jpg`
                  );
                }}
                aria-label='Download image'
              >
                <BsDownload className='gallery-download-icon' />
              </button>
            </div>
          );
        })}
      </section>
      {/* Full-size modal: overlay click or × closes; image shown at max 90vh */}
      {modalImage && (
        <div
          className='gallery-modal-overlay'
          onClick={() => setModalImage(null)}
          role='button'
          tabIndex={0}
          aria-label='Close modal'
        >
          <div
            className='gallery-modal-content'
            onClick={(e) => e.stopPropagation()}
            role='presentation'
          >
            <button
              type='button'
              className='gallery-modal-close'
              onClick={() => setModalImage(null)}
              aria-label='Close'
            >
              ×
            </button>
            <img
              src={modalImage?.urls?.full ?? modalImage?.urls?.regular}
              alt={modalImage?.alt_description ?? ''}
              className='gallery-modal-img'
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Gallery;
