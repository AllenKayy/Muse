// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/albums': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/albums').default>>>>
    }
    '/api/auth': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/auth').default>>>>
    }
    '/api/callback': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/callback').default>>>>
    }
    '/api/getAccessToken': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/getAccessToken').default>>>>
    }
    '/api/login': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/login').default>>>>
    }
    '/api/test': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/test').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}