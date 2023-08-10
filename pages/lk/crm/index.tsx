import { useRouter } from 'next/router'
import { getAuthServerSideProps } from '@/utils/auth'
import { UserRole } from '@/data/enum/UserRole'
import { LkReceivingPageLayout } from '@/pages/lk'
import DatesPanel from '@/components/for_pages/LkPage/layout/LkStatsMenu/DatesPanel'

interface Props {

}

const StatisticPage = (props: Props) => {

  const router = useRouter()

  return (
    <div>
      <DatesPanel />
    </div>
  )
}
StatisticPage.getLayout = LkReceivingPageLayout
export default StatisticPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
