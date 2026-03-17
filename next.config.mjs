/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: "/studio", destination: "http://localhost:3333/studio" },
      { source: "/studio/:path*", destination: "http://localhost:3333/studio/:path*" },
    ];
  },
};

export default nextConfig;
