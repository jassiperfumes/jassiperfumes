import fs from 'fs';
import { FRAGRANCES, slugify } from '../src/data/fragrances.js';

const urls = [
  { loc: 'https://jassiperfumes.in/', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://jassiperfumes.in/#/catalogue', priority: '0.9', changefreq: 'daily' },
  { loc: 'https://jassiperfumes.in/#/contact', priority: '0.8', changefreq: 'monthly' },
  ...FRAGRANCES.map(f => ({
    loc: `https://jassiperfumes.in/#/products/${slugify(f.name)}`,
    priority: '0.8',
    changefreq: 'weekly'
  }))
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync('./public/sitemap.xml', xml, 'utf8');
console.log(`Generated sitemap.xml with ${urls.length} indexable URLs.`);
