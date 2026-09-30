import { defineConfig, presetWind3 } from 'unocss'

const prefix = 'v-'

export default defineConfig({
  presets: [presetWind3({ prefix })],
})
