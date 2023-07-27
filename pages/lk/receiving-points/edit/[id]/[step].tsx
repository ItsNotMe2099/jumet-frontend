import ReceivingPointCreateForm from '@/components/for_pages/LkPage/ReceivingPointCreateForm'
import Layout from '@/components/layout/Layout'
import {useRouter} from 'next/router'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'


export default function ReceivingPointEditStepPage() {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  const step = router.query.step as string
  return (
    <Layout>
      <ReceivingPointCreateForm stepKey={step} id={id} />
    </Layout>
  )
}

export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
