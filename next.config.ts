import type { NextConfig } from "next";

// STATIC_PREVIEW=1 builds a folder of plain HTML files that open by double-click (no server).
const preview = process.env.STATIC_PREVIEW === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(preview && {
    output: "export",
    assetPrefix: "/__REL__",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
