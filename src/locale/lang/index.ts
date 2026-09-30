import type { LocaleEnum } from '@/enums/app'

import zhCN from '@/locale/lang/zh-CN'
import enUS from '@/locale/lang/zh-CN'

const lang = {
  'zh-CN': zhCN,
  'en-US': enUS,
} satisfies Record<typeof LocaleEnum.valueType, Record<string, string>>

export default lang
