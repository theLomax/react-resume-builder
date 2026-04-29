/**
 * resolveTemplate.ts
 *
 * Resolves template placeholders in stored text strings.
 *
 * Syntax:
 *   ${varName}          plain substitution
 *   ${a:varName}        "a" or "an" + value (auto-detected)
 *   ${A:varName}        "A" or "An" + value (capitalised article, auto-detected)
 *   ${cap:varName}      sentence case — capitalise first letter of value only
 *   ${title:varName}    title case — capitalise each significant word
 *   ${plural:varName}   pluralise the value
 *
 * Manual article override:
 *   Pass { value: "HTML specialist", article: "an" } instead of a plain string
 *   to force a specific article when auto-detection would be wrong.
 *
 * Examples:
 *   "${A:targetTitle} focused on building"
 *     + { targetTitle: "experienced developer" }
 *     → "An experienced developer focused on building"
 *
 *   "${a:targetTitle} focused on building"
 *     + { targetTitle: { value: "HTML specialist", article: "an" } }
 *     → "an HTML specialist focused on building"
 *
 *   "${title:targetTitle} at ${company}"
 *     + { targetTitle: "director of engineering", company: "Acme" }
 *     → "Director of Engineering at Acme"
 */

import { articleFor } from './indefiniteArticle'
import { pluralize } from './pluralize'
import { sentenceCase, titleCase } from './titleCase'

export type TemplateVariableValue =
  | string
  | { value: string; article?: 'a' | 'an' }

export type TemplateVariables = Record<string, TemplateVariableValue | undefined>

function resolveValue(raw: TemplateVariableValue | undefined): string {
  if (raw === undefined) return ''
  if (typeof raw === 'string') return raw
  return raw.value
}

function resolveArticle(raw: TemplateVariableValue | undefined): 'a' | 'an' {
  if (!raw || typeof raw === 'string') return articleFor(resolveValue(raw))
  return raw.article ?? articleFor(raw.value)
}

export function resolveTemplate(template: string, variables: TemplateVariables): string {
  return template.replace(/\$\{(.*?)\}/g, (match, expression: string) => {
    const trimmed = expression.trim()

    // ${a:varName} — lowercase article + value
    if (trimmed.startsWith('a:')) {
      const varName = trimmed.slice(2).trim()
      const raw = variables[varName]
      const article = resolveArticle(raw)
      const value = resolveValue(raw)
      return value ? `${article} ${value}` : match
    }

    // ${A:varName} — capitalised article + value
    if (trimmed.startsWith('A:')) {
      const varName = trimmed.slice(2).trim()
      const raw = variables[varName]
      const article = resolveArticle(raw)
      const value = resolveValue(raw)
      if (!value) return match
      const capArticle = article.charAt(0).toUpperCase() + article.slice(1)
      return `${capArticle} ${value}`
    }

    // ${cap:varName} — sentence case
    if (trimmed.startsWith('cap:')) {
      const varName = trimmed.slice(4).trim()
      const value = resolveValue(variables[varName])
      return value ? sentenceCase(value) : match
    }

    // ${title:varName} — title case
    if (trimmed.startsWith('title:')) {
      const varName = trimmed.slice(6).trim()
      const value = resolveValue(variables[varName])
      return value ? titleCase(value) : match
    }

    // ${plural:varName} — pluralise
    if (trimmed.startsWith('plural:')) {
      const varName = trimmed.slice(7).trim()
      const value = resolveValue(variables[varName])
      return value ? pluralize(value) : match
    }

    // ${varName} — plain substitution
    const value = resolveValue(variables[trimmed])
    return value !== '' ? value : match
  })
}
