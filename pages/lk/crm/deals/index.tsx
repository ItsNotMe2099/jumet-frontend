import { useRouter } from 'next/router'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkReceivingPageLayout} from '@/pages/lk'

interface Props {

}

const StatisticDealsPage = (props: Props) => {
  const router = useRouter()

  return (
    <div>
    В разработке
    </div>
  )
}
StatisticDealsPage.getLayout = LkReceivingPageLayout
export default  StatisticDealsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)