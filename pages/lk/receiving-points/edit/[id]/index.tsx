import ReceivingPointCreateForm from '@/components/for_pages/LkPage/ReceivingPointCreateForm'
import Layout from '@/components/layout/Layout'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {useRouter} from 'next/router'

export default function ReceivingPointEditPage() {
  const router = useRouter()
  return (
    <Layout>
      <ReceivingPointCreateForm isNew={true} />
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
