import ReceivingPointCreateForm from '@/components/for_pages/LkPage/ReceivingPointCreateForm'
import Layout from '@/components/layout/Layout'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
//import styles from './index.module.scss'


export default function ReceivingPointCreatePage() {

  return (
    <Layout>
      <ReceivingPointCreateForm isNew={true} />
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)

