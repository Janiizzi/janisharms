import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const routes = ['/', '/skills', '/projects', '/contact', '/privacy']

async function prerender() {
  const { render } = await import('./dist/ssr-server/entry-server.js')
  const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')

  for (const route of routes) {
    const { html } = render(route)

    let pageHtml = template.replace('<!--app-html-->', html)

    // React 19 + react-helmet-async v3: title is rendered inline in the component tree.
    // Extract it and hoist into <head> so crawlers see the correct title.
    const titleMatch = html.match(/<title[^>]*>[^<]*<\/title>/)
    if (titleMatch) {
      pageHtml = pageHtml.replace(/<title>[^<]*<\/title>/, titleMatch[0])
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
