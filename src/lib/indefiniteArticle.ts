/**
 * indefiniteArticle.ts
 *
 * Returns "a" or "an" based on the sound of the following word.
 * Rule is phonetic, not orthographic — "an hour", "a unique", "an MBA".
 *
 * For edge cases not covered by the exception lists, pass the article
 * manually via the TemplateVariable override in resolveTemplate.
 */

// Words beginning with a vowel letter but a consonant sound ("you" sound)
const CONSONANT_SOUND_EXCEPTIONS = new Set([
  'eucalyptus', 'eulogy', 'euphemism', 'euphoria', 'europe', 'european',
  'ewe', 'ewer',
  'once', 'one',
  'unary', 'uniform', 'union', 'unique', 'unit', 'unity', 'universal',
  'universe', 'university', 'unix', 'uranium', 'usage', 'use',
  'used', 'useful', 'user', 'usual', 'utility', 'utopia',
])

// Words beginning with a consonant letter but a vowel sound
const VOWEL_SOUND_EXCEPTIONS = new Set([
  'heir', 'heiress', 'honest', 'honestly', 'honesty', 'honor', 'honorable',
  'honorary', 'honour', 'honourable', 'hour', 'hourly', 'hours',
])

// Letters that are spoken with a vowel sound when used as initials
const VOWEL_SOUND_LETTERS = new Set(['a', 'e', 'f', 'h', 'i', 'l', 'm', 'n', 'o', 'r', 's', 'x'])

function isAcronym(word: string): boolean {
  return /^[A-Z]{2,}$/.test(word)
}

export function articleFor(word: string): 'a' | 'an' {
  if (!word) return 'a'

  const firstWord = word.trim().split(/\s+/)[0]
  const lower = firstWord.toLowerCase()

  if (isAcronym(firstWord)) {
    return VOWEL_SOUND_LETTERS.has(lower[0]) ? 'an' : 'a'
  }

  if (VOWEL_SOUND_EXCEPTIONS.has(lower)) return 'an'
  if (CONSONANT_SOUND_EXCEPTIONS.has(lower)) return 'a'

  return /^[aeiou]/i.test(lower) ? 'an' : 'a'
}
