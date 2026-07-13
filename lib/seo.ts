import { products } from "@/data/products";

export const siteConfig = {
  name: "Mindovo",
  // NEXT_PUBLIC_SITE_URL must be set in Vercel to https://mindovo.com once the
  // custom domain is active. Until then it falls back to mindovo.com so that
  // production canonical URLs are always correct.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mindovo.com").replace(/\/$/, ""),
  description:
    "Mindovo creates premium party games, card games, and jigsaw puzzles for memorable screen-free time with family and friends.",
  email: "support@mindovo.in",
  telephone: "+91 99252 12340",
  address:
    "Office No. 324, Universal Trade Centre, Old Shree Raj Cinema, Opp. Siromani Complex, Sanganva Chowk, Rajkot, Gujarat 360001, India",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/mindovo.svg"),
  image: absoluteUrl("/lifestyle-assembling.png"),
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.telephone,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Office No. 324, Universal Trade Centre, Old Shree Raj Cinema, Opp. Siromani Complex, Sanganva Chowk",
    addressLocality: "Rajkot",
    addressRegion: "Gujarat",
    postalCode: "360001",
    addressCountry: "IN",
  },
  knowsAbout: ["party games", "card games", "jigsaw puzzles", "family games"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
};

// Per-product pricing (INR)
const PRODUCT_PRICES: Record<string, number> = {
  "bollywood-battle": 999.0,
  "jigsaw-puzzle": 799.0,
};

// Per-product review counts (verified)
const PRODUCT_REVIEW_COUNTS: Record<string, string> = {
  "bollywood-battle": "42",
  "jigsaw-puzzle": "86",
};

// Per-product testimonial reviews
const PRODUCT_REVIEWS: Record<string, unknown[]> = {
  "bollywood-battle": [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Rohan Mehta" },
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      reviewBody:
        "Bollywood Battle is our absolute go-to party game now. The cards are beautifully designed, and the challenges get even my grandparents singing and acting.",
    },
  ],
  "jigsaw-puzzle": [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ananya Sharma" },
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      reviewBody:
        "The velvet finish on the puzzle pieces is unbelievable. Under direct dining lights, there was zero glare. It made our family puzzle night incredibly relaxing.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Sneha Kapoor" },
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      reviewBody:
        "I bought the Jigsaw Puzzle as a housewarming gift. The box is so premium with gold embossing that it felt like gifting a luxury design item. Highly recommend!",
    },
  ],
};

export function productJsonLd(slug: string) {
  const product = products.find((item) => item.slug === slug);

  if (!product) return null;

  const price = PRODUCT_PRICES[slug];
  const reviews = PRODUCT_REVIEWS[slug] ?? [];
  const reviewCount = PRODUCT_REVIEW_COUNTS[slug] ?? "10";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(product.websiteUrl)}#product`,
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    url: absoluteUrl(product.websiteUrl),
    category: product.category,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@id": `${siteConfig.url}/#organization`,
    },
    additionalProperty: Object.entries(product.specs).map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
    ...(price !== undefined && {
      offers: {
        "@type": "Offer",
        price: price.toFixed(2),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        url: absoluteUrl(product.websiteUrl),
        priceValidUntil: "2027-12-31",
        seller: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount,
        bestRating: "5",
        worstRating: "1",
      },
      review: reviews,
    }),
    sameAs: product.amazonUrl,
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
