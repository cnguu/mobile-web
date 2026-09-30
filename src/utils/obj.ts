import { isArr } from '@/utils/is'
import { compareStrings } from '@/utils/string'

/**
 * 简单深拷贝
 */
export const clonePlain = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 将对象或 Map 依据 Key 排序并转换为普通对象
 * 支持将 Value 转为字符串
 */
export const sortAndConvertObject = (
  input: Record<string, any> | Map<string, any> | any[],
  shouldCastToString = false,
): Record<string, any> | any[] => {
  if (isArr(input)) {
    return input
  }
  const entries = input instanceof Map ? Array.from(input.entries()) : Object.entries(input)
  entries.sort((a, b) => compareStrings(a[0], b[0]))
  const result: Record<string, any> = {}
  for (const [key, val] of entries) {
    result[key] = shouldCastToString ? String(val) : val
  }
  return result
}
