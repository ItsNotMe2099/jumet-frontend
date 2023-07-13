import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LkLayout from '@/components/for_pages/LkPage/layout'
import ReviewsCard from '@/components/for_pages/Common/ReceivingPointComponents/ReviewsCard'
import { points } from '@/data/temp/points'
import { GetServerSideProps } from 'next'
import IPointData from '@/data/interfaces/IPointData'

interface Props {
  item: IPointData
}

export default function ReceivingPointReviewsPage(props: Props) {

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
      <LkLayout myPointsOpen>
        <ReviewsCard item={props.item} />
      </LkLayout>
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
