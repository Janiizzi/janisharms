import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const routes = [
  '/',
  '/skills',
  '/projects',
  '/contact',
  '/privacy',
  '/in-construction',
  '/colorscheme',
]

// Tags that React 19 renders inline but belong in <head>
const HEAD_TAG_PATTERN =
  /<title[^>]*>[^<]*<\/title>|<meta [^>]*\/>|<link rel="canonical"[^>]*\/>/g

// Site-wide Open Graph tags that individual pages don't set themselves.
// Injected into the OG block so they survive the per-page OG replacement.
const SITE_OG_TAGS = [
  '<meta property="og:site_name" content="Janis Harms" />',
  '<meta property="og:locale" content="en_US" />',
  '<meta property="og:image:alt" content="Janis Harms – Portfolio" />',
  '<meta property="og:image:width" content="5001" />',
  '<meta property="og:image:height" content="2626" />',
]

function buildPage(template, render, route) {
  const { html } = render(route)

  // Extract all head tags React 19 rendered inside the body
  const extractedTags = html.match(HEAD_TAG_PATTERN) ?? []
  // Strip them from the body so they don't appear twice
  const cleanHtml = html.replace(HEAD_TAG_PATTERN, '')

  let pageHtml = template.replace('<!--app-html-->', cleanHtml)

  // Inject page-specific title into <head>
  const title = extractedTags.find(t => t.startsWith('<title'))
  if (title) {
    pageHtml = pageHtml.replace(/<title>[^<]*<\/title>/, title)
  }

  // Replace generic description with page-specific one
  const descMeta = extractedTags.find(t => t.includes('name="description"'))
  if (descMeta) {
    pageHtml = pageHtml.replace(/<meta name="description"[^>]*>/, descMeta)
  }

  // Replace the default robots directive when a page sets its own (e.g. noindex)
  const robotsMeta = extractedTags.find(t => t.includes('name="robots"'))
  if (robotsMeta) {
    pageHtml = pageHtml.replace(/<meta name="robots"[^>]*>/, robotsMeta)
  }

  const ogMetas = extractedTags.filter(t => t.includes('property="og:'))
  if (ogMetas.length > 0) {
    const allOg = [...ogMetas, ...SITE_OG_TAGS]
    const replacement = `<!-- Open Graph -->\n    ${allOg.join('\n    ')}`
    pageHtml = pageHtml.replace(/<!-- Open Graph -->[\s\S]*?(?=\n[ \t]*<!--|<\/head>)/, replacement + '\n')
  }

  // Inject the page-specific canonical independently of the OG block so pages
  // without OG tags (e.g. Privacy) still get their canonical link.
  const canonical = extractedTags.find(t => t.startsWith('<link rel="canonical"'))
  if (canonical) {
    pageHtml = pageHtml.replace('</head>', `    ${canonical}\n  </head>`)
  }

  return pageHtml
}

async function prerender() {
  const { render } = await import('./dist/ssr-server/entry-server.js')
  const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')

  for (const route of routes) {
    const pageHtml = buildPage(template, render, route)

    const dir = route === '/'
      ? path.resolve(__dirname, 'dist')
      : path.resolve(__dirname, `dist${route}`)

    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.resolve(dir, 'index.html'), pageHtml)
    console.log(`Pre-rendered: ${route}`)
  }

  // 404 page rendered from the catch-all route. nginx serves this with a real
  // 404 status (see error_page in nginx.conf), so unknown URLs are no soft-404.
  const notFoundHtml = buildPage(template, render, '/__not-found__')
  fs.writeFileSync(path.resolve(__dirname, 'dist/404.html'), notFoundHtml)
  console.log('Pre-rendered: /404.html')

  fs.rmSync(path.resolve(__dirname, 'dist/ssr-server'), { recursive: true, force: true })
  console.log('Pre-rendering complete!')
}

prerender().catch(console.error)
