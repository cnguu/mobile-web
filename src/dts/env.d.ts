interface ImportMetaEnv {
  /** 应用标识 */
  readonly V_APP_ID: string

  /** 应用版本号 */
  readonly V_APP_VERSION: string

  /** 应用版本编码 自增 */
  readonly V_APP_VERSION_CODE: number

  /** 公共基础路径 */
  readonly V_BASE_URL: string

  /** 请求接口地址基础路径 */
  readonly V_API_URL: string

  /** 启用 vueDevtools */
  readonly V_DEV_TOOLS: boolean

  /** 本地开发服务器 端口 */
  readonly V_SERVER_PORT: number

  /** 本地开发服务器 请求代理 */
  readonly V_SERVER_PROXY: string

  /** 生产环境移除调试 */
  readonly V_DROP_CONSOLE: boolean

  /** 构建压缩 gz/br */
  readonly V_COMPRESSION: boolean
}
