import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all standard bots (Google, Bing, etc.)
        userAgent: "*",
        allow: "/",
      },
      {
        // Allow OpenAI GPTBot to crawl for AI search attribution
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        // Allow Anthropic Claude's crawler
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        // Allow Google-Extended (Gemini training/search)
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        // Allow PerplexityBot
        userAgent: "PerplexityBot",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

