/**
 * pluralize.ts
 *
 * Returns the plural form of a word.
 * Handles the most common patterns in resume/professional language.
 * For irregular forms not covered, use the manual override in resolveTemplate.
 */

// Words that are the same in singular and plural
const INVARIANT = new Set([
  'staff', 'research', 'work', 'software', 'hardware', 'feedback',
  'information', 'knowledge', 'experience', 'expertise',
])

// Explicit irregular plurals
const IRREGULARS: Record<string, string> = {
  person: 'people',
  man: 'men',
  woman: 'women',
  child: 'children',
  analysis: 'analyses',
  basis: 'bases',
  crisis: 'crises',
  thesis: 'theses',
  criterion: 'criteria',
  datum: 'data',
  medium: 'media',
}

export function pluralize(word: string): string {
  if (!word) return word

  // Preserve trailing whitespace/casing context
  const trimmed = word.trim()
  const lower = trimmed.toLowerCase()

  if (INVARIANT.has(lower)) return trimmed

  if (IRREGULARS[lower]) {
    // Preserve original capitalisation pattern
    return matchCase(trimmed, IRREGULARS[lower])
  }

  // Acronyms: API → APIs, CEO → CEOs
  if (/^[A-Z]{2,}$/.test(trimmed)) return trimmed + 's'

  // -y preceded by a consonant → -ies (specialty → specialties)
  if (/[^aeiou]y$/i.test(trimmed)) {
    return trimmed.slice(0, -1) + (isUpperCase(trimmed.slice(-1)) ? 'IES' : 'ies')
  }

  // -s, -sh, -ch, -x, -z → -es
  if (/(s|sh|ch|x|z)$/i.test(trimmed)) {
    return trimmed + (isUpperCase(trimmed.slice(-1)) ? 'ES' : 'es')
  }

  // Default: add -s
  return trimmed + (isUpperCase(trimmed.slice(-1)) ? 'S' : 's')
}

function isUpperCase(char: string): boolean {
  return char === char.toUpperCase() && char !== char.toLowerCase()
}

function matchCase(original: string, result: string): string {
  if (original === original.toUpperCase()) return result.toUpperCase()
  if (original[0] === original[0].toUpperCase()) {
    return result.charAt(0).toUpperCase() + result.slice(1)
  }
  return result
}
