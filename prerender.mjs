import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const routes = ['/', '/skills', '/projects', '/contact', '/privacy']

// Tags that React 19 renders inline but belong in <head>
const HEAD_TAG_PATTERN =
  /<title[^>]*>[^<]*<\/title>|<meta [^>]*\/>|<link rel="canonical"[^>]*\/>/g

async function prerender() {
  const { render } = await import('./dist/ssr-server/entry-server.js')
  const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')

  for (const route of routes) {
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

    // Replace generic description + og: tags with page-specific ones
    const descMeta = extractedTags.find(t => t.includes('name="description"'))
    if (descMeta) {
      pageHtml = pageHtml.replace(/<meta name="description"[^>]*>/, descMeta)
    }

    const ogMetas = extractedTags.filter(t => t.includes('property="og:'))
    const canonical = extractedTags.find(t => t.startsWith('<link rel="canonical"'))
    if (ogMetas.length > 0) {
      const replacement = `<!-- Open Graph -->\n    ${ogMetas.join('\n    ')}${canonical ? '\n    ' + canonical : ''}`
      pageHtml = pageHtml.replace(/<!-- Open Graph -->[\s\S]*?(?=\n[ \t]*<!--|<\/head>)/, replacement + '\n')
    }

    const dir = route === '/'
      ? path.resolve(__dirname, 'dist')
      : path.resolve(__dirname, `dist${route}`)

    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.resolve(dir, 'index.html'), pageHtml)
    console.log(`Pre-rendered: ${route}`)
  }

  fs.rmSync(path.resolve(__dirname, 'dist/ssr-server'), { recursive: true, force: true })
  console.log('Pre-rendering complete!')
}

prerender().catch(console.error)
