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

if (!existsSync(manifestPath)) {
	console.error(`❌ Error: Manifest not found at ${manifestPath}`)
	console.error('   Make sure react-resume-data is cloned and variants.json exists.')
	process.exit(1)
}

let manifest
try {
	manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
} catch (err) {
	console.error(`❌ Error: Failed to parse variants.json: ${err.message}`)
	process.exit(1)
}

// ── Validate variant if specified ─────────────────────────────────────────────

if (variantId) {
	if (!manifest[variantId]) {
		console.error(`❌ Error: Variant "${variantId}" not found in manifest.`)
		console.error(`   Available variants: ${Object.keys(manifest).join(', ')}`)
		console.error('   Did you add an entry to react-resume-data/variants.json?')
		process.exit(1)
	}
}

const entry = variantId ? manifest[variantId] : {}

// ── Resolve config ───────────────────────────────────────────────────────────

// Company: flag → manifest entry → null
const company = flags.company ?? entry.company ?? null

// Title: flag → manifest cvTitle → manifest title → null
const rawTitle = flags.title ?? entry.cvTitle ?? entry.title ?? null
const title = rawTitle?.trim().replace(/[()[\]{}]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-') ?? null

// Warn if variant is specified but title cannot be resolved
if (variantId && !title && !flags.title && !flags.company) {
	console.warn(`⚠️  Warning: Variant "${variantId}" has no title in manifest.`)
	console.warn('   Output will use default filename. Set --title=Your-Title to override.')
}

// ── Build URL and output path ─────────────────────────────────────────────────

const url = variantId
	? `http://localhost:5173/cv?variant=${variantId}`
	: `http://localhost:5173/cv`

const filename = title
	? `${name}--${title}.pdf`
	: `${name}--Resume.pdf`

let outPath
if (outOverride) {
	outPath = resolve(outOverride)
} else if (company) {
	outPath = resolve(`./exports/${company}/${filename}`)
} else if (variantId) {
	outPath = resolve(`./exports/${variantId}/${filename}`)
} else {
	outPath = resolve(`./exports/${filename}`)
}

mkdirSync(dirname(outPath), { recursive: true })

// ── Generate ──────────────────────────────────────────────────────────────────

console.log(`\n📋 Resume Generation`)
console.log(`├─ Variant:  ${variantId ? `"${variantId}"` : '(default CV)'}`)
console.log(`├─ URL:      ${url}`)
console.log(`└─ Output:   ${outPath}\n`)

let browser
try {
	browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()

	// Navigate to page
	let navigationError
	try {
		await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
	} catch (err) {
		navigationError = err
	}

	if (navigationError) {
		console.error(`❌ Error: Failed to load URL: ${url}`)
		console.error(`   ${navigationError.message}`)
		console.error('   Is the dev server running? (pnpm dev)')
		await browser.close()
		process.exit(1)
	}

	// Wait for React loading state to resolve
	try {
		await page.waitForFunction(
			() => !document.body.innerText.includes('Loading...'),
			{ timeout: 20000 }
		)
	} catch {
		const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 300))
		console.error(`❌ Error: Page stuck in loading state after 20s.`)
		console.error(`   Page content: ${bodyText}`)
		await browser.close()
		process.exit(1)
	}

	// Check for error messages on page
	const hasError = await page.evaluate(() => {
		const errorText = document.body.innerText.toLowerCase()
		return errorText.includes('error') || errorText.includes('not found')
	})

	if (hasError) {
		const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 500))
		console.error(`❌ Error: Page rendered an error state.`)
		console.error(`   Page content: ${bodyText}`)
		if (variantId) {
			console.error(`   Check that variant "${variantId}" has been seeded to Supabase.`)
		}
		await browser.close()
		process.exit(1)
	}

	// Confirm resume content is present
	let headerFound = false
	try {
		await page.waitForSelector('header h1', { timeout: 10000 })
		headerFound = true
	} catch {
		const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 500))
		console.error(`❌ Error: Resume content not found on page.`)
		console.error(`   Expected <header><h1> element, but page shows:`)
		console.error(`   ${bodyText}`)
		if (variantId) {
			console.error(`\n   Troubleshooting:`)
			console.error(`   • Verify variant "${variantId}" exists in Supabase`)
			console.error(`   • Verify variant SQL was run: variants/tews/tews-01.sql`)
			console.error(`   • Check Supabase variant_profile, variant_roles tables`)
		}
		await browser.close()
		process.exit(1)
	}

	// Confirm profile name is present (secondary check)
	const hasProfileName = await page.evaluate(() => {
		const h1 = document.querySelector('header h1')
		return h1 && h1.innerText.trim().length > 0
	})

	if (!hasProfileName) {
		console.error(`❌ Error: Resume header found but profile name is missing.`)
		console.error(`   This indicates incomplete data in Supabase.`)
		await browser.close()
		process.exit(1)
	}

	// Settle for images and web fonts
	await new Promise(r => setTimeout(r, 800))

	// Generate PDF
	try {
		await page.pdf({
			path: outPath,
			format: 'A4',
			margin: { top: '0.5in', bottom: '0.3in', left: '0', right: '0' },
			printBackground: true,
			preferCSSPageSize: false,
		})
	} catch (err) {
		console.error(`❌ Error: PDF generation failed: ${err.message}`)
		await browser.close()
		process.exit(1)
	}

	await browser.close()
	console.log(`✅ Success: PDF generated`)
	console.log(`   Location: ${outPath}\n`)

} catch (err) {
	console.error(`❌ Unexpected error: ${err.message}`)
	if (browser) {
		await browser.close()
	}
	process.exit(1)
}
