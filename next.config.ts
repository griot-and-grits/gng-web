import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Disable server-based image optimization when deploying the static
   * marketing site. This remains compatible with SSR features needed
   * for the admin portal.
   */
  images: {
    unoptimized: true,
  },
  /**
   * Enable standalone output for Docker deployments
   */
  output: 'standalone',
};

export default nextConfig;
