import { useRouter } from 'next/router'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkReceivingPageLayout} from '@/pages/lk'

interface Props {

}

const StatisticReceivingPointsPage = (props: Props) => {
  const router = useRouter()

  return (
    <div>
    В разработке
    </div>
  )
}
StatisticReceivingPointsPage.getLayout = LkReceivingPageLayout
export default  StatisticReceivingPointsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
