import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingExcludes: {
    "*": [
      "./public/**/*",
      "./assets/**/*",
      "./assets_backup/**/*",
      "./assets_compressed/**/*",
      "./.next/cache/**/*",
      "./.next/dev/**/*",
      "./node_modules/.prisma/**/*",
      "./node_modules/@prisma/**/*",
      "./node_modules/prisma/**/*",
      "./node_modules/@google-cloud/storage/**/*",
      "./*.pdf",
      "./*.log",
      "./test-*.js",
    ],
  },
  images: {
    qualities: [25, 50, 75, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
