export interface UnsplashUrls {
  raw?: string;
  full?: string;
  regular?: string;
  small?: string;
  thumb?: string;
}

export interface UnsplashPhoto {
  id: string;
  urls?: UnsplashUrls;
  alt_description?: string | null;
}

export interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
}
