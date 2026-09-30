import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'

import { isString } from './src/utils/is'

const prefix = 'v-'

export default defineConfig({
  presets: [presetWind3({ prefix })],
  shortcuts: [
    {
      [`${prefix}pb-safe`]: `${prefix}pb-[env(safe-area-inset-bottom)]`,
      [`${prefix}pt-safe`]: `${prefix}pt-[env(safe-area-inset-top)]`,
    },
  ],
  postprocess: [
    (util) => {
      const remRE = /(-?[\d.]+)(rem)/g
      util.entries.forEach((entry) => {
        const value = entry[1]
        if (isString(value) && remRE.test(value)) {
          entry[1] = value.replace(remRE, (_, num) => `${parseFloat(num) * 16}px`)
        }
      })
    },
  ],
  rules: [],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    pipeline: {
      include: ['src/**/*.vue', 'src/**/*.ts'],
      exclude: ['src/**/*.d.ts'],
    },
  },
})
