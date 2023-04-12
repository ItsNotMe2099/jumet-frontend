import 'normalize.css'
import 'styles/globals.scss'
import type { AppProps as NextAppProps } from 'next/app'
import App, { AppContext } from 'next/app'
import { useEffect } from 'react'
import { AppWrapper } from 'context/state'
import { getSelectorsByUserAgent } from 'react-device-detect'
import ModalContainer from 'components/layout/ModalContainer'
import Snackbar from 'components/layout/Snackbar'
import Head from 'next/head'
import { AuthWrapper } from 'context/auth_state'

export interface AppProps extends NextAppProps {
  pageProps: {
    isMobile: boolean
  }
}

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if (pageProps.isMobile) {
      document.body.classList.add('mobile-ua')
      document.documentElement.className = 'mobile-ua'
    }
  },
    [])

  return (
    <AppWrapper isMobile={pageProps.isMobile}>
      <AuthWrapper>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
          />
        </Head>
        <Component {...pageProps} />
        <ModalContainer />
        <Snackbar />
      </AuthWrapper>
    </AppWrapper >
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext)
  const ua = appContext.ctx.req ? appContext.ctx.req?.headers['user-agent'] : navigator.userAgent
  if (ua) {
    const { isMobile, isTablet } = getSelectorsByUserAgent(ua)
    const data = getSelectorsByUserAgent(ua)
    if (isTablet && typeof window !== 'undefined' && window.screen.width >= 576) {

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
