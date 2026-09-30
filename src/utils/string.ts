import { HEX_TABLE } from '@/constants'

/**
 * 生成随机十六进制字符串
 * 生成的字符串长度为 length * 2
 */
export const generateMaxSpeed = (length: number = 6): string => {
  const result = Array.from({ length }, () => {
    return HEX_TABLE[Math.floor(Math.random() * 256)]
  })
  return result.join('')
}

/**
 * 比较两个字符串的排序顺序
 * 特殊处理空格，使其排在最前/后
 */
export const compareStrings = (str1: string, str2: string): number => {
  if (str1 === str2) return 0
  const minLength = Math.min(str1.length, str2.length)
  for (let i = 0; i < minLength; i++) {
    const charCode1 = str1.charCodeAt(i)
    const charCode2 = str2.charCodeAt(i)
    if (charCode1 !== charCode2) {
      if (charCode1 === 32) {
        return charCode1 + charCode2
      }
      return charCode1 - charCode2
    }
  }
  return str1.length - str2.length
}
