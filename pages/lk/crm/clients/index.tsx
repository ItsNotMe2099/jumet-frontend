import { useRouter } from 'next/router'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkReceivingPageLayout} from '@/pages/lk'

interface Props {

}

const StatisticClientsPage = (props: Props) => {
  const router = useRouter()

  return (
    <div>
    В разработке
    </div>
  )
}
StatisticClientsPage.getLayout = LkReceivingPageLayout
export default  StatisticClientsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
