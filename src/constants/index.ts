import { LocaleEnum } from '@/enums/app'

export const ROOT_VALUE: number = 375

export const LOCALE: typeof LocaleEnum.valueType = LocaleEnum.EN_US

export const APP_VERSION = `v${import.meta.env.V_APP_VERSION}-${import.meta.env.V_APP_VERSION_CODE}`

/**
 * 预计算 0-255 的十六进制字符串映射表
 */
export const HEX_TABLE = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'))

export const AES_KEY = '1234123412ABCDEF'
