import { createEnum } from '@/utils/enum'

/**
 * 语言
 */
export const LocaleEnum = createEnum({
  /** 英文 */
  EN_US: {
    label: 'English',
    value: 'en-US',
  },
  /** 简体中文 */
  ZH_CN: {
    label: '简体中文',
    value: 'zh-CN',
  },
})
