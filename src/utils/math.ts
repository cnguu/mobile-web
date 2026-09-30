/***********
 * 数学相关 *
 **********/
import NP from 'number-precision'

NP.enableBoundaryChecking(false)

export const math = NP

/**
 * 浮点数比较大小
 * @param a
 * @param b
 * @param epsilon
 */
export const compareFloatNumber = (a: number, b: number, epsilon = Number.EPSILON): 0 | 1 | -1 => {
  const diff = a - b
  // 两数相等
  if (Math.abs(diff) < epsilon) {
    return 0
  }
  // a 大于 b
  else if (diff > epsilon) {
    return 1
  }
  // a 小于 b
  else {
    return -1
  }
}
