import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  experimental: {
    optimizePackageImports: ["tailwindcss"],
  },
};

export default nextConfig;
