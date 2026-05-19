import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    qualities: [25, 50, 75, 90, 100],
  },
};

export default nextConfig;
