import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = absoluteUrl().replace(/\/$/, "");

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
      images: [absoluteUrl("/lifestyle-assembling.png")],
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      // FAQPage JSON-LD on this page — higher priority for rich result eligibility
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: [absoluteUrl("/fashion-dux-eyewear.png"), absoluteUrl("/lifestyle-assembling.png")],
    },
  ];

  // Dynamically index active product pages
  const productRoutes = products
    .filter((p) => p.isPublished)
    .map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [absoluteUrl(p.image)],
    }));

  return [...routes, ...productRoutes];
}
