import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  distDir: "./dist",
  experimental: {
    optimizePackageImports: ["tailwindcss"],
  },
};

export default withNextIntl(nextConfig);
