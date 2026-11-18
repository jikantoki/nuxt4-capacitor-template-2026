/**
 * サイトのベース URL を取得
 */
export function getSiteUrl(): string {
  const config = useRuntimeConfig()
  const configured =
    process.env.NUXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (config.public as any)?.siteUrl ||
    'https://example.com'
  return String(configured).replace(/\/+$/, '')
}

/**
 * XML 特殊文字をエスケープ
 */
export function escapeXml(str: unknown): string {
  if (str === null || str === undefined) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * CDATA 内の終了タグを安全にエスケープ
 */
export function escapeCdata(str: unknown): string {
  if (str === null || str === undefined) return ''
  return String(str).replace(/]]>/g, ']]]]><![CDATA[>')
}

/**
 * Markdown や改行を簡易的にクリーンアップした要約テキストを生成
 */
export function cleanDescription(text: unknown, maxLength = 240): string {
  if (!text || typeof text !== 'string') return ''
  const cleaned = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/#+\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.slice(0, maxLength) + '...'
}

/**
 * W3C Datetime 形式 (例: 2026-11-10T03:00:00Z) を生成 (sitemap 用)
 */
export function formatIsoDate(input?: number | string | Date): string {
  if (!input) {
    return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
  }
  const d =
    typeof input === 'number' || typeof input === 'string'
      ? new Date(input)
      : input
  if (isNaN(d.getTime())) {
    return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
  }
  return d.toISOString().replace(/\.\d{3}Z$/, 'Z')
}

/**
 * RFC 822 / RFC 2822 日付文字列 を生成 (RSS 用)
 */
export function formatRfc822Date(input?: number | string | Date): string {
  if (!input) return new Date().toUTCString()
  const d =
    typeof input === 'number' || typeof input === 'string'
      ? new Date(input)
      : input
  if (isNaN(d.getTime())) return new Date().toUTCString()
  return d.toUTCString()
}
