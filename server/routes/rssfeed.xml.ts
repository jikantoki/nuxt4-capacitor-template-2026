import { defineEventHandler, setHeader } from 'h3'
import {
  getSiteUrl,
  escapeXml,
  escapeCdata,
  formatRfc822Date,
} from '../utils/siteData'

export async function generateRssFeedXml(): Promise<string> {
  const siteUrl = getSiteUrl()
  const buildDate = formatRfc822Date()

  const feedItems = [
    {
      id: 'welcome',
      title: 'Nuxt4-Capacitor-Template-2026 リリース',
      link: `${siteUrl}/`,
      description:
        'Nuxt 4 + Capacitor 8 + PWA + Vuetify 3 + PHP の開発テンプレートです。',
      pubDate: new Date(),
      category: 'Release',
      author: 'Template',
      guid: `${siteUrl}/#welcome`,
    },
  ]

  const itemsXml = feedItems
    .map((item) => {
      const pubDateRfc = formatRfc822Date(item.pubDate)
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
      <pubDate>${pubDateRfc}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <author>${escapeXml(item.author)}</author>
      <description><![CDATA[${escapeCdata(item.description)}]]></description>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nuxt4-Capacitor-Template-2026 RSS Feed</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Nuxt 4 + Capacitor + PWA + Vuetify + PHP Template</description>
    <language>ja</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${escapeXml(siteUrl)}/rssfeed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`
}

export default defineEventHandler(async (event) => {
  const xml = await generateRssFeedXml()
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400')
  return xml
})
