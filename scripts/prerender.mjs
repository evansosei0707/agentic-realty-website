/**
 * prerender.mjs
 *
 * Bakes the React SPA into static HTML so AI crawlers and search bots
 * can read the full rendered page without executing JavaScript.
 *
 * Usage:
 *   npm run build && npm run prerender
 *   (or combined: npm run build:static)
 *
 * Output: overwrites dist/index.html with the fully-rendered HTML.
 * The <script type="module"> tags remain so the page still hydrates
 * normally for real browser visitors.
 *
 * Requires: playwright (already a devDependency)
 * Run once after every production build. Safe to re-run.
 */

import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')
const PORT = 4174

// Minimal static file server for the dist/ folder
function serveStatic(req, res) {
  let filePath = resolve(DIST, req.url === '/' ? 'index.html' : req.url.slice(1))

  // SPA fallback — everything goes to index.html
  try {
    const stat = readFileSync(filePath)
    void stat
  } catch {
    filePath = resolve(DIST, 'index.html')
  }

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  }

  try {
    const content = readFileSync(filePath)
    const ext = extname(filePath)
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
    res.end(content)
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
}

const server = createServer(serveStatic)
await new Promise((resolve) => server.listen(PORT, resolve))
console.log(`Static server started on http://localhost:${PORT}`)

const browser = await chromium.launch()
const page = await browser.newPage()

// Reduce motion so GSAP scroll-reveal sections render in final position,
// not mid-animation. Mirrors the Playwright screenshot pattern in memory.
await page.emulateMedia({ reducedMotion: 'reduce' })

console.log('Rendering http://localhost:%d ...', PORT)
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })

// Wait for the React app to mount and paint the first meaningful content
await page.waitForSelector('#app > *', { timeout: 15000 })

// Small grace period for GSAP entrance animations to settle
await page.waitForTimeout(1000)

const html = await page.content()

await browser.close()
server.close()

// Write the rendered HTML back to dist/index.html
writeFileSync(resolve(DIST, 'index.html'), html, 'utf8')

console.log('Pre-render complete. dist/index.html updated (%d bytes).', html.length)
