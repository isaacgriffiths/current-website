import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: Cloudflare Pages serves `out/` as plain files,
  // with the contact endpoint handled by a Pages Function.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
