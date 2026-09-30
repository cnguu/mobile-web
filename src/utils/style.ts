import { ROOT_VALUE } from '@/constants'
import { isNumber } from '@/utils/is'

export function px2rem(px: number | string): string {
  const num = isNumber(px) ? px : parseFloat(px)
  if (isNaN(num)) return '0'
  const rem = parseFloat(((num * 10) / ROOT_VALUE).toFixed(5))
  return `${rem}rem`
}

export function rem2px(rem: number | string): number {
  const num = isNumber(rem) ? rem : parseFloat(rem)
  if (isNaN(num)) return 0
  return Math.round((num * ROOT_VALUE) / 10)
}

export function calcSize(px: number | string): string {
  return `calc(${px2rem(px)} * var(--font-scale))`
}
