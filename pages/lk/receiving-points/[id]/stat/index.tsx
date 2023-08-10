import { useRouter } from 'next/router'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkReceivingPageLayout} from '@/pages/lk'

interface Props {

}

const ReceivingPointStatisticPage = (props: Props) => {
  const router = useRouter()

  return (
    <div>
    В разработке
    </div>
  )
}
ReceivingPointStatisticPage.getLayout = LkReceivingPageLayout
export default  ReceivingPointStatisticPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
