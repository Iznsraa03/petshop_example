import { getUnsplashImageUrl } from '@/lib/unsplash';

/**
 * Global fixed background for the whole site.
 * Uses the hero image as a base background so it stays behind while scrolling.
 */
export const SiteBackground = () => {
  const bg = getUnsplashImageUrl('pets', 1920, 1080);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10"
      style={{
        backgroundImage: `url('${bg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* soft overlay to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-petshop-background" />
    </div>
  );
};
