import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Bump this manually whenever the page content meaningfully changes.
const LAST_CONTENT_CHANGE = "2026-09-03";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://isaacgriffiths.com/",
      lastModified: new Date(LAST_CONTENT_CHANGE),
    },
  ];
}
