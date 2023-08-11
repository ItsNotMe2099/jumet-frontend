import 'normalize.css'
import 'styles/globals.scss'
import 'react-dadata/dist/react-dadata.css'
import type { AppProps as NextAppProps } from 'next/app'
import App, { AppContext } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'
import { AppWrapper } from 'context/state'
import { getSelectorsByUserAgent } from 'react-device-detect'
import ModalContainer from 'components/layout/ModalContainer'
import Snackbar from 'components/layout/Snackbar'
import Head from 'next/head'
import { AuthWrapper } from 'context/auth_state'
import { getToken } from '@/utils/auth'
import 'swiper/css'
import 'swiper/css/zoom'
import { DataWrapper } from '@/context/data_state'
import { FavoriteWrapper } from '@/context/favorite_state'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export interface AppProps extends NextAppProps {
  pageProps: {
    isMobile: boolean
  }
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  useEffect(() => {
    if (pageProps.isMobile) {
      document.body.classList.add('mobile-ua')
      document.documentElement.className = 'mobile-ua'
    }
  },
    [])
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <AppWrapper isMobile={pageProps.isMobile} token={getToken()}>
      <AuthWrapper>
        <DataWrapper scrapMetalCategories={[]}>
          <FavoriteWrapper>
            <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500;1,600&display=swap"
                rel="stylesheet" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
              />
            </Head>
            {getLayout(<Component {...pageProps as any} />)}
            <ModalContainer />
            <Snackbar />
          </FavoriteWrapper>
        </DataWrapper>
      </AuthWrapper>
    </AppWrapper>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext)
  const ua = appContext.ctx.req ? appContext.ctx.req?.headers['user-agent'] : navigator.userAgent
  if (ua) {
    const { isMobile, isTablet } = getSelectorsByUserAgent(ua)
    const data = getSelectorsByUserAgent(ua)
    if (isTablet && typeof window !== 'undefined' && window.screen.width >= 768) {

      props.pageProps.isMobile = false
    } else {
      props.pageProps.isMobile = isMobile
    }

  } else {
    props.pageProps.isMobile = false
  }

  return props
}

export default MyApp
