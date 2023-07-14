import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LkLayout from '@/components/for_pages/LkPage/layout'
import LkLayoutMobile from '@/components/for_pages/LkPage/layout/mobile'
import IPointData from '@/data/interfaces/IPointData'
import { points } from '@/data/temp/points'
import { GetServerSideProps } from 'next'

interface Props {
  item: IPointData
}

export default function ReceivingPointStatisticPage(props: Props) {

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
      <LkLayout className={styles.desktop} myPointsOpen>

      </LkLayout>
      <LkLayoutMobile className={styles.mobile} point={props.item}>
        
      </LkLayoutMobile>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = context.query.id as string

  const data = points

  return {
    props: {
      item: data.data.find(i => i.id === +res)
    } as Props
  }
}

