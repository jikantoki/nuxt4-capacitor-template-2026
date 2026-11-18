import { defineEventHandler, setHeader } from 'h3'
import { getSiteUrl, escapeXml, formatIsoDate } from '../utils/siteData'

interface RouteItem {
  path: string
  priority: string
  changefreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  lastmod?: string
}

export default defineEventHandler(async (event) => {
  const siteUrl = getSiteUrl()

  const staticRoutes: RouteItem[] = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/settings', priority: '0.7', changefreq: 'monthly' },
    { path: '/settings/display', priority: '0.6', changefreq: 'monthly' },
    { path: '/qrcode', priority: '0.5', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.4', changefreq: 'yearly' },
    { path: '/terms', priority: '0.4', changefreq: 'yearly' },
  ]

  const nowIso = formatIsoDate()

  const xmlEntries = staticRoutes
    .map((route) => {
      const loc = `${siteUrl}${route.path}`
      const lastmod = route.lastmod || nowIso
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400')

  return xml
})
