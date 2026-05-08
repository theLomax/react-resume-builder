import hawkeyePrintSrc from '../assets/icons/hawkeye-print.svg'
import smuDarkSrc from '../assets/icons/smu-dark.svg'

// ─────────────────────────────────────────────────────────────────────────────
// Icon theme config
// Central source of truth for theme-adaptive icon behaviour.
// Keys match the lowercase lookup strings used in skillIcons and companyLogos.
//
// Two strategies:
//   Invert  — CSS filter: invert(1). Works well for single-colour SVG components.
//   Swap    — Alternate asset src rendered via <picture>. Use when a proper
//             dark/light/print variant exists as a separate file.
//
// Both strategies can coexist on the same icon — e.g. invert for dark mode,
// swap for print.
// ─────────────────────────────────────────────────────────────────────────────

export interface IconThemeConfig {
	/** filter: invert(1) in dark screen mode only — print is unaffected */
	invertDark?: boolean
	/** filter: invert(1) in light screen mode only — print is unaffected */
	invertLight?: boolean
	/** filter: invert(1) when printing only — screen modes are unaffected */
	invertPrint?: boolean

	/** Alternate asset src for dark screen mode (applied via <picture>) */
	srcDark?: string
	/** Alternate asset src for light screen mode (applied via <picture>) */
	srcLight?: string
	/** Alternate asset src for print (applied via <picture>) */
	srcPrint?: string
}

/**
 * Returns the CSS module class names that should be applied to an icon wrapper
 * for the given key. Pass your local `styles` object from the consuming module.
 */
export function getIconThemeClass(
	key: string,
	styles: Record<string, string>,
): string {
	const cfg = iconThemeConfig[key]
	if (!cfg) return ''
	return [
		cfg.invertDark  && styles.invertDark,
		cfg.invertLight && styles.invertLight,
		cfg.invertPrint && styles.invertPrint,
	].filter(Boolean).join(' ')
}

export const iconThemeConfig: Record<string, IconThemeConfig> = {

	// ── Skill icons ───────────────────────────────────────────────────────────
	// Dark-on-transparent marks — invisible in dark mode without inversion
	'github':     { invertDark: true },
	'expo go':    { invertDark: true },
	'express.js': { invertDark: true },
	// Light-on-transparent marks — invisible in light mode without inversion
	'next.js':    { invertDark: true },

	// ── Company icons ─────────────────────────────────────────────────────────
	// Hawkeye: screen uses the SVG component as-is; print uses a colour-correct flat SVG
	'publicis hawkeye': { srcPrint: hawkeyePrintSrc },
	'southern methodist university': { srcDark: smuDarkSrc },

}
