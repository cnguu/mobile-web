import i18nPlugins from '@enum-plus/plugin-vue-i18n'
import { Enum } from 'enum-plus'

import { i18n } from '@/locale/i18n'

Enum.install(i18nPlugins, {
  localize: {
    instance: i18n,
    suppressWarnings: true,
  },
})

export const createEnum = Enum
