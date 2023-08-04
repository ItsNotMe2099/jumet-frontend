import Layout from '@/components/layout/Layout'
import {useRouter} from 'next/router'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import DealEditForm from '@/components/for_pages/LkPage/DealEditForm'


export default function DealEditStepPage() {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  const step = router.query.step as string
  return (
    <Layout>
      <DealEditForm stepKey={step} id={id} />
    </Layout>
  )
}

export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
