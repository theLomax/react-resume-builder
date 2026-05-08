/**
 * Generate a PDF of the resume using Puppeteer.
 *
 * Usage:
 *   pnpm pdf                 # default CV → exports/James-Lomax--Resume.pdf
 *   pnpm pdf flock-01        # variant (bare)
 *   pnpm pdf --flock-01      # variant (dashed — both forms work)
 *
 * Variant slugs are short keys (e.g. flock-01, stripe-02). Company folder
 * and filename title are resolved from react-resume-data/variants.json —
 * add an entry there whenever you create a new variant SQL file.
 *
 * Override flags (all optional):
 *   --name=James-Lomax        Your name in the filename (default: James-Lomax)
 *   --title=Some-Role         Override the title from the manifest
 *   --company=some-co         Override the company folder
 *   --variant=some-id         Explicit variant ID (alternative to positional arg)
 *
 * Requires the dev server to be running: pnpm dev
 */

import puppeteer from 'puppeteer'
import { resolve, dirname, join } from 'path'
import { mkdirSync, readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Parse args ───────────────────────────────────────────────────────────────

// Args with '=' are named flags (--company=x); args without '=' are variant IDs,
// whether written as a bare word (flock-01) or with dashes (--flock-01).
const positional = process.argv.slice(2)
	.find(a => !a.includes('=') && (a.startsWith('--') ? (a.slice(2)) : a))
	?.replace(/^--/, '') ?? null

const flags = Object.fromEntries(
	process.argv.slice(2)
		.filter(a => a.includes('='))
		.map(a => a.replace(/^--/, '').split('='))
)

const variantId = flags.variant ?? positional ?? null
const name      = flags.name ?? 'James-Lomax'
const outOverride = flags.out ?? null

// ── Load manifest ────────────────────────────────────────────────────────────

const manifestPath = resolve(__dirname, '../../react-resume-data/variants.json')
const manifest = existsSync(manifestPath)
	? JSON.parse(readFileSync(manifestPath, 'utf8'))
	: {}

const entry = variantId ? (manifest[variantId] ?? {}) : {}

// ── Resolve config ───────────────────────────────────────────────────────────

// Company: flag → manifest entry → null
const company = flags.company ?? entry.company ?? null

// Title: flag → manifest entry → null
const rawTitle = flags.title ?? entry.title ?? null
const title = rawTitle?.trim().replace(/\s+/g, '-') ?? null

// ── Build URL and output path ─────────────────────────────────────────────────

const url = variantId
	? `http://localhost:5173/?variant=${variantId}`
	: `http://localhost:5173/cv`

const filename = title
	? `${name}--${title}.pdf`
	: `${name}--Resume.pdf`

let outPath
if (outOverride) {
	outPath = resolve(outOverride)
} else if (company) {
	outPath = resolve(`./exports/focused/${company}/${filename}`)
} else if (variantId) {
	outPath = resolve(`./exports/focused/${variantId}/${filename}`)
} else {
	outPath = resolve(`./exports/${filename}`)
}

mkdirSync(dirname(outPath), { recursive: true })

// ── Generate ──────────────────────────────────────────────────────────────────

console.log(`Variant:  ${variantId ?? '(default)'}`)
console.log(`URL:      ${url}`)
console.log(`Output:   ${outPath}`)

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()

await page.goto(url, { waitUntil: 'networkidle0' })

// Wait for React loading state to resolve, then confirm data rendered
await page.waitForFunction(
	() => !document.body.innerText.includes('Loading...'),
	{ timeout: 20000 }
)

try {
	await page.waitForSelector('header h1', { timeout: 10000 })
} catch {
	const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 500))
	console.error('\n⚠ Page did not render resume content. Page text:\n', bodyText, '\n')
	await browser.close()
	process.exit(1)
}

// Settle for images and web fonts
await new Promise(r => setTimeout(r, 800))

await page.pdf({
	path: outPath,
	format: 'Letter',
	margin: { top: '0.5in', bottom: '0.5in', left: '0', right: '0' },
	printBackground: true,
	preferCSSPageSize: false,
})

await browser.close()
console.log('Done.')
