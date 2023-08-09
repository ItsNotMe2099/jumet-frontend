import Layout from '@/components/layout/Layout'
import { useRouter } from 'next/router'
//import { getAuthServerSideProps } from '@/utils/auth'
//import { UserRole } from '@/data/enum/UserRole'
import DealEdit from '@/components/for_pages/LkPage/DealEdit'
import styles from './index.module.scss'
import ChatOnPage from '@/components/for_pages/Common/ChatOnPage'



export default function DealEditStepPage() {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  const step = router.query.step as string

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.colLeft}>
          <DealEdit stepKey={step} id={id} />
        </div>
        <ChatOnPage receivingPointId={1} />
      </div>
    </Layout>
  )
}

//export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
