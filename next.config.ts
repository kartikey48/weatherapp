import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Required for static export
  eslint: {
    ignoreDuringBuilds: true, // Prevent ESLint errors from breaking the build
  },
};

export default nextConfig;

