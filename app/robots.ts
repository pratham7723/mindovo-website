import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://mindovo.com/sitemap.xml",
    host: "https://mindovo.com",
  };
}
