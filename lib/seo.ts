import { products } from "@/data/products";

export const siteConfig = {
  name: "Mindovo",
  url: "https://mindovo.com",
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

export function productJsonLd(slug: string) {
  const product = products.find((item) => item.slug === slug);

  if (!product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(product.websiteUrl)}#product`,
    name: product.name,
    description: product.description,
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
