/**
 * Generate a PDF of the resume using Puppeteer.
 *
 * Usage:
 *   pnpm pdf                             # default variant → exports/cv.pdf
 *   pnpm pdf --company=netflix           # focused variant → exports/focused/netflix/resume.pdf
 *   pnpm pdf --variant=some-id           # any variant by ID → exports/focused/some-id/resume.pdf
 *   pnpm pdf --company=stripe --variant=stripe-2025
 *
 * Requires the dev server to be running: pnpm dev
 */

import puppeteer from 'puppeteer'
import { resolve, dirname } from 'path'
import { mkdirSync } from 'fs'

const args = Object.fromEntries(
	process.argv.slice(2)
		.filter(a => a.startsWith('--'))
		.map(a => a.slice(2).split('='))
)

const company  = args.company  ?? null
const variant  = args.variant  ?? null

// URL: /cv for default, /?variant=<id> for specific variants
const url = variant
	? `http://localhost:5173/?variant=${variant}`
	: `http://localhost:5173/cv`

// Output path mirrors the old dist/ structure
let outPath
if (company) {
	outPath = resolve(`./exports/focused/${company}/resume.pdf`)
} else if (variant) {
	outPath = resolve(`./exports/focused/${variant}/resume.pdf`)
} else {
	outPath = resolve('./exports/cv.pdf')
}

mkdirSync(dirname(outPath), { recursive: true })

console.log(`Generating PDF from ${url}`)
console.log(`Output: ${outPath}`)

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()

await page.goto(url, { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 500))

await page.pdf({
	path: outPath,
	format: 'Letter',
	margin: { top: '0.5in', bottom: '0.5in', left: '0', right: '0' },
	printBackground: true,
	preferCSSPageSize: false,
})

await browser.close()
console.log('Done.')
