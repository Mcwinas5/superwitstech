import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
      disallow: "/api/",
    },
    sitemap: "https://superwitstech.com/sitemap.xml",
  };
}