import type { Component } from 'vue'
import {
  UtensilsCrossed,
  CupSoda,
  SprayCan,
  ShowerHead,
  Boxes,
  ShoppingBasket,
  Wheat,
  Milk,
  Wine,
  Shirt,
  Smartphone,
  Home,
  Baby,
  Pill,
  Gift,
  Package,
} from '@lucide/vue'

export const categoryIcons = {
  utensils: UtensilsCrossed,
  drink: CupSoda,
  spray: SprayCan,
  shower: ShowerHead,
  boxes: Boxes,
  basket: ShoppingBasket,
  wheat: Wheat,
  milk: Milk,
  wine: Wine,
  shirt: Shirt,
  smartphone: Smartphone,
  home: Home,
  baby: Baby,
  pill: Pill,
  gift: Gift,
  package: Package,
} satisfies Record<string, Component>

export type CategoryIconKey = keyof typeof categoryIcons

export const categoryIconOptions = Object.keys(categoryIcons) as CategoryIconKey[]

// Palavras-chave associadas a cada ícone, usadas para escolher automaticamente
// um ícone com base no nome da categoria (o utilizador já não escolhe o ícone
// manualmente na criação/edição).
const ICON_KEYWORDS: Partial<Record<CategoryIconKey, string[]>> = {
  utensils: ['aliment', 'comida', 'cereal', 'mercearia', 'mantiment'],
  drink: ['bebida', 'refrigerante', 'sumo', 'agua'],
  spray: ['limpeza', 'detergente', 'desinfect'],
  shower: ['higiene', 'banho', 'sabonete', 'perfum'],
  wheat: ['farinha', 'trigo', 'arroz', 'graos'],
  milk: ['leite', 'lacticinio', 'derivado'],
  wine: ['vinho', 'alcool', 'cerveja'],
  shirt: ['roupa', 'vestuario', 'moda', 'calcado'],
  smartphone: ['electr', 'eletr', 'telemovel', 'tecnolog', 'informatica'],
  home: ['casa', 'lar', 'cozinha', 'movel'],
  baby: ['bebe', 'crianca', 'infantil'],
  pill: ['farmac', 'medic', 'saude'],
  gift: ['presente', 'brinde', 'festa'],
  basket: ['cesta', 'mercado', 'fresco', 'hortalica', 'fruta'],
  boxes: ['diverso', 'outro', 'variad'],
}

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

/** Sugere um ícone com base no nome da categoria; usa "package" por defeito. */
export function guessCategoryIcon(name: string): CategoryIconKey {
  const normalized = normalize(name)
  for (const [icon, keywords] of Object.entries(ICON_KEYWORDS) as [
    CategoryIconKey,
    string[],
  ][]) {
    if (keywords.some((keyword) => normalized.includes(keyword))) return icon
  }
  return 'package'
}
