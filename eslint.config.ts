import js from '@eslint/js'
import pluginQuasar from '@quasar/app-vite/eslint'
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import gitignore from 'eslint-config-flat-gitignore'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'

export default defineConfigWithVueTs(
  gitignore(),
  globalIgnores([
    'src/dts/typed-router.d.ts',
  ]),
  pluginQuasar.configs.recommended(),
  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        definePage: 'readonly',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/v-slot-style': ['warn', 'shorthand'],
      'vue/attributes-order': ['warn', { alphabetical: true }],
      'vue/valid-v-slot': 'off',
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        // 支持 SSR, Electron 和配置文件
        ...globals.node,
        // 支持 process.env.*
        process: 'readonly',
        // Google Analytics
        ga: 'readonly',
        // 移动端混合开发
        cordova: 'readonly',
        // 移动端混合开发
        Capacitor: 'readonly',
        // Quasar BEX 浏览器扩展
        chrome: 'readonly',
        // Quasar BEX 浏览器扩展
        browser: 'readonly',
      },
    },
    rules: {
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'prefer-promise-reject-errors': 'off',
    },
  },
  {
    files: ['src-pwa/sw/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  prettierSkipFormatting,
)
