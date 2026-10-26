// Runs before dev and build; writes public/sitemap.xml from the static product catalog.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { PRODUCTS } from "../src/constants/products";

const BASE_URL = "https://barakah-plastic-web.lovable.app";
const paths = ["/", ...PRODUCTS.map((p) => `/products/${p.id}`)];
const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...paths.map((p) => `  <url>\n    <loc>${BASE_URL}${p}</loc>\n  </url>`),
  `</urlset>`,
].join("\n");
writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${paths.length} entries)`);
