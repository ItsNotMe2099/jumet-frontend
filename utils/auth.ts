import nookies from 'nookies'

import { CookiesType } from '../types/enums'

export const getToken = (): string | undefined => {
  const cookies = nookies.get(null)
  return cookies[CookiesType.accessToken]
}
