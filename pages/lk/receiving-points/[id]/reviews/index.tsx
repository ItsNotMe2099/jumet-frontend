import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LkLayout from '@/components/for_pages/LkPage/layout'

interface Props{

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
      <LkLayout className={styles.desktop} >
        {/*<ReviewsCard item={props.item} />*/}
      </LkLayout>

      {/*<LkLayoutMobile className={styles.mobile} point={props.item}>
        <ReviewsCard item={props.item} />
      </LkLayoutMobile>*/}
    </Layout>
  )
}

