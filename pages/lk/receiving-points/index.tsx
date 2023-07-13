import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LkLayout from '@/components/for_pages/LkPage/layout'
import ReceivingPointCard from '@/components/for_pages/LkPage/Cards/ReceivingPointCard'
import { points } from '@/data/temp/points'

interface Props {

}

export default function ReceivingPointsPage(props: Props) {

  const router = useRouter()

  const token = Cookies.get('accessToken')

  console.log('ROUTER', router.asPath)

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [])

  const data = points

  return (
    <Layout>
      <LkLayout>
        {data.data.map((i, index) =>
          <ReceivingPointCard point={i} key={i.id} href={`${router.asPath}/${i.id}/info`} />
        )}
      </LkLayout>
    </Layout>
  )
}

