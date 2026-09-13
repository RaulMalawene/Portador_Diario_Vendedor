export const categoryThemes = [
  { key: 'primary', label: 'Roxo' },
  { key: 'accent', label: 'Lima' },
  { key: 'success', label: 'Verde' },
  { key: 'info', label: 'Azul' },
  { key: 'warning', label: 'Âmbar' },
  { key: 'danger', label: 'Vermelho' },
  { key: 'teal', label: 'Turquesa' },
] as const

export type CategoryTheme = (typeof categoryThemes)[number]['key']

export function pickCategoryTheme(name: string): CategoryTheme {
  const normalized = name.trim().toLowerCase()
  let hash = 0
  for (let i = 0; i < normalized.length; i += 1) {
    hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0
  }
  return categoryThemes[hash % categoryThemes.length]?.key ?? 'primary'
}
