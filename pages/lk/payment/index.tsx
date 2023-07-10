import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import { useAppContext } from '@/context/state'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LkLayout from '@/components/for_pages/LkPage/layout'

interface Props {

}

export default function LkPage(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

  const token = Cookies.get('accessToken')

  console.log('ROUTER', router.asPath)

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [])

  return (
    <Layout>
      <LkLayout>
        
      </LkLayout>
    </Layout>
  )
}

