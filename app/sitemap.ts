import type { MetadataRoute } from "next";
import { SITE_URL, PRIVACY_PATH } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${PRIVACY_PATH}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
