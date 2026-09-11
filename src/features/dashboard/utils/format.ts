export function formatCurrency(value: number): string {
  return `${new Intl.NumberFormat('pt-PT').format(value)} MZN`
}

export function formatCompactNumber(value: number): string {
  return `${Math.round(value / 1000)}K`
}
