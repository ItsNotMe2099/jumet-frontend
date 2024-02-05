import AuthRepository from '@/data/repositories/AuthRepository'
import {CookiesType} from '@/types/enums'
import {CookiesLifeTime} from '@/types/constants'
import {setCookie} from 'nookies'
import {Routes} from '@/types/routes'

interface Props {
  error: string
}

export default function ImpersonatePage(props: Props) {

  return null
}
export const getServerSideProps = async (context: any) => {
  const token = context.query.token as string
  try {
    const res = await AuthRepository.impersonate(token)
    setCookie(context, CookiesType.accessToken, res.accessToken, {
      maxAge: CookiesLifeTime.accessToken,
      path: '/'
    })
    console.log('res1', res)
    return {
      props: {},
      redirect: {
        destination: Routes.lk,
        permanent: false,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {error: (e as any)?.message ?? e as string}
    }
  }

  return {}
}
