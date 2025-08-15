import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  experimental: {
    optimizePackageImports: ["tailwindcss"],
  },
};

export default withNextIntl(nextConfig);
