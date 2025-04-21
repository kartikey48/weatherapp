import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Required for static export
  images: {
    unoptimized: true, // Disable image optimization for GitHub Pages
  },
  basePath: '/weatherapp', // OPTIONAL: if you're not using a custom domain
};

export default nextConfig;
