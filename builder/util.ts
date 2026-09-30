import type { ConfigureCallback } from '#q-app'
import type { ProxyOptions } from 'vite'

import fs from 'node:fs'
import path from 'node:path'

import dotenv from 'dotenv'

export type QuasarContext = Parameters<ConfigureCallback>[0]

function castValue(value: string): any {
  const trimmed = value.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (trimmed === 'null') return null
  if (trimmed !== '' && !isNaN(Number(trimmed))) {
    return Number(trimmed)
  }
  return value
}

export function parseEnv(ctx: QuasarContext) {
  const env = process.env.ENV
  const envFolder = ctx.appPaths.resolve.src('env')

  const envFiles = [path.resolve(envFolder, '.env'), path.resolve(envFolder, '.env.local')]
  if (env) {
    envFiles.push(
      path.resolve(envFolder, `.env.${env}`),
      path.resolve(envFolder, `.env.${env}.local`),
    )
  }
  envFiles.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      const result = dotenv.config({ path: filePath })
      if (result.parsed) {
        Object.assign(process.env, result.parsed)
      }
    }
  })

  const envClientPrefix = 'V_'
  const envs: Record<string, any> = {}
  for (const key in process.env) {
    if (key.startsWith(envClientPrefix)) {
      const originalValue = process.env[key]
      envs[key] = originalValue !== undefined ? castValue(originalValue) : undefined
    }
  }
  const parsedEnv = envs as unknown as ImportMetaEnv

  ctx.logger.log(`Parsed Env: ${JSON.stringify(parsedEnv, null, 4)}`)

  return {
    envFolder,
    envClientPrefix,
    parsedEnv,
  }
}

export function parseServerProxy(
  ctx: QuasarContext,
  config?: string,
): Record<string, string | ProxyOptions> {
  if (!config) return {}
  const ret: Record<string, string | ProxyOptions> = {}
  try {
    const list: [string, string][] = JSON.parse(config)
    for (const [prefix, target] of list) {
      ret[prefix] = {
        target,
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => (path.startsWith(prefix) ? path.slice(prefix.length) : path),
        ...(/^https:\/\//.test(target) ? { secure: false } : {}),
      }
    }
  } catch (error) {
    ctx.logger.error(String(error))
  }
  return ret
}
