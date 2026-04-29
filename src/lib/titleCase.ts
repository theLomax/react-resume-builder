/**
 * titleCase.ts
 *
 * sentenceCase — capitalises the first letter of the string only.
 * titleCase    — capitalises each significant word.
 *
 * Title case rules (Chicago / AP style):
 * - Always capitalise: first word, last word, all "major" words
 * - Lowercase unless first/last: articles, coordinating conjunctions,
 *   and short prepositions (under 5 letters)
 */

const LOWERCASE_WORDS = new Set([
  // Articles
  'a', 'an', 'the',
  // Coordinating conjunctions
  'and', 'but', 'or', 'nor', 'for', 'yet', 'so',
  // Short prepositions
  'at', 'by', 'in', 'of', 'on', 'to', 'up', 'as', 'if',
  'per', 'via', 'vs', 'vs.',
])

export function sentenceCase(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function titleCase(text: string): string {
  if (!text) return text

  const words = text.split(/(\s+)/)  // preserve whitespace tokens

  return words
    .map((token, index) => {
      // Preserve whitespace tokens as-is
      if (/^\s+$/.test(token)) return token

      const lower = token.toLowerCase()
      const isFirst = index === 0
      const isLast = index === words.length - 1 || words.slice(index + 1).every(t => /^\s*$/.test(t))

      // Always capitalise first and last word
      if (isFirst || isLast) return capitalise(token)

      // Lowercase minor words
      if (LOWERCASE_WORDS.has(lower)) return lower

      // Capitalise everything else
      return capitalise(token)
    })
    .join('')
}

function capitalise(word: string): string {
  if (!word) return word
  // Preserve all-caps words (acronyms) as-is
  if (/^[A-Z]{2,}$/.test(word)) return word
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
