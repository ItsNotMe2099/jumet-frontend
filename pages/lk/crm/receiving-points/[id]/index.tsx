import { getAuthServerSideProps } from '@/utils/auth'
import { UserRole } from '@/data/enum/UserRole'
import { LkPageLayout } from '@/pages/lk'
import { useRouter } from 'next/router'
import CrmReportReceivingPoint from '@/components/for_pages/LkPage/crm/CrmReportReceivingPoint'

interface Props {
  id: number
}

const StatisticReceivingPointPage = (props: Props) => {


  const router = useRouter()


  return (
      <CrmReportReceivingPoint receivingPointId={parseInt(router.query.id as string, 10)}/>
  )
}
StatisticReceivingPointPage.getLayout = LkPageLayout
export default StatisticReceivingPointPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
