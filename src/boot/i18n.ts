import { defineBoot } from '#q-app'

import { LOCALE } from '@/constants'
import { i18n } from '@/locale/i18n'
import Languages from '@/locale/lang'

export type MessageSchema = (typeof Languages)['en-US']

/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

export default defineBoot(({ app }) => {
  i18n.global.setLocaleMessage(LOCALE, Languages[LOCALE])
  i18n.global.setMissingHandler((locale, key) => {
    console.warn(`[i18n] Not found '${key}' key in '${locale}' locale messages.`)
  })
  app.use(i18n)
})
