import { defineConfig } from '#q-app'
import { compression } from 'vite-plugin-compression2'
import VitePluginJson5 from 'vite-plugin-json5'

import { parseEnv, parseServerProxy } from './builder/util'

export default defineConfig((ctx) => {
  const { envFolder, envClientPrefix, parsedEnv } = parseEnv(ctx)

  return {
    preFetch: true,
    boot: ['i18n'],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons'],
    build: {
      env: {
        clientPrefix: envClientPrefix,
        folder: envFolder,
      },
      publicPath: parsedEnv.V_BASE_URL,
      target: {
        browser: ['chrome49'],
        node: 'node24',
      },
      polyfillModulePreload: true,
      typescript: {
        strict: true,
        vueShim: true,
      },
      filenameBasedRouting: {
        rootDir: ctx.appPaths.appDir,
        extensions: ['.vue'],
        routesFolder: ['src/pages'],
        exclude: ['**/components/**'],
        importMode: 'async',
        dts: './src/dts/typed-router.d.ts',
      },
      vueRouterMode: 'history',
      vueJsx: 'preserve',
      rawViteConfig: {
        esbuild:
          ctx.prod && parsedEnv.V_DROP_CONSOLE ?
            {
              drop: ['console', 'debugger'],
            }
          : false,
      },
      vitePlugins: [
        ['@vitejs/plugin-vue-jsx', {}],
        VitePluginJson5({ dts: false }),
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            ssr: ctx.mode.ssr || ctx.mode.ssg,
            include: [ctx.appPaths.resolve.src('locale/lang')],
            compositionOnly: true,
            fullInstall: false,
            runtimeOnly: true,
          },
        ],
        [
          'vite-plugin-checker',
          {
            vueTsc: true,
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.ts "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
        ctx.prod && parsedEnv.V_COMPRESSION ?
          compression({
            exclude: /\.(png|jpg|jpeg|gif|webp|ico|woff|woff2|gz|br)$/i,
            threshold: 10240,
            algorithms: ['gzip', 'brotliCompress'],
            deleteOriginalAssets: false,
            skipIfLargerOrEqual: true,
            logLevel: 'info',
          })
        : null,
      ],
    },
    devServer: {
      host: true,
      port: parsedEnv.V_SERVER_PORT,
      strictPort: true,
      proxy: parseServerProxy(ctx, parsedEnv.V_SERVER_PROXY),
      https: false,
      open: false,
      vueDevtools: parsedEnv.V_DEV_TOOLS,
    },
    framework: {
      config: {},
      plugins: [],
    },
    animations: [],
    sourceFiles: {},
    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
    },
    ssg: {},
    pwa: {
      workboxMode: 'GenerateSW',
    },
    cordova: {},
    capacitor: {
      hideSplashscreen: true,
    },
    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: parsedEnv.V_APP_ID,
      },
    },
    bex: {
      extraScripts: [],
    },
  }
})
