// ============================================================
// Superwits Tech — SEO Head Component
// Injects per-page title, meta, OG, Twitter, and schema tags
// ============================================================

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  schema?: object | object[];
}

const OG_IMAGE = "https://superwitstech.com/manus-storage/og-social-share-v2_7010b787.png"; // 1200x630 OG social share image with new hero photo v2

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = OG_IMAGE,
  schema,
}: SEOHeadProps) {
  // Inject tags into <head> via useEffect to avoid SSR issues
  // (This is a client-side SPA, so direct DOM manipulation is safe)
  if (typeof document !== "undefined") {
    document.title = title;
    setMeta("description", description);
    setLink("canonical", canonical);

    // Open Graph
    setOgMeta("og:type", "website");
    setOgMeta("og:site_name", "Superwits Tech");
    setOgMeta("og:title", title);
    setOgMeta("og:description", description);
    setOgMeta("og:url", canonical);
    setOgMeta("og:image", ogImage);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@MarquisBuilds");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // JSON-LD Schema
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((s, i) => {
        const id = `schema-ld-${i}`;
        let el = document.getElementById(id) as HTMLScriptElement | null;
        if (!el) {
          el = document.createElement("script");
          el.id = id;
          el.type = "application/ld+json";
          document.head.appendChild(el);
        }
        el.textContent = JSON.stringify(s);
      });
    }
  }

  return null;
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setOgMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}
