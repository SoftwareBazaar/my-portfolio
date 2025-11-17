/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: (() => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl) return [];

      try {
        const { hostname } = new URL(supabaseUrl);
        return [
          {
            protocol: 'https',
            hostname,
            pathname: '/storage/v1/object/public/**',
          },
        ];
      } catch {
        return [];
      }
    })(),
  },
};

export default nextConfig;

