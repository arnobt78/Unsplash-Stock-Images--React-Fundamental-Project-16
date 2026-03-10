/** Unsplash API image URL variants (we use regular for grid, full for modal/download) */
export interface UnsplashUrls {
  raw?: string;
  full?: string;
  regular?: string;
  small?: string;
  thumb?: string;
}

/** Single photo from Unsplash search results */
export interface UnsplashPhoto {
  id: string;
  urls?: UnsplashUrls;
  alt_description?: string | null;
}

/** Shape of GET /search/photos response; Gallery uses response.data.results */
export interface UnsplashSearchResponse {
  /** Current page result payload */
  results: UnsplashPhoto[];
  /** Total page count provided by Unsplash search API */
  total_pages?: number;
}
