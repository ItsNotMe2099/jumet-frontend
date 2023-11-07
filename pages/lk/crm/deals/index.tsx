import { getAuthServerSideProps } from '@/utils/auth'
import { UserRole } from '@/data/enum/UserRole'
import { LkPageLayout } from '@/pages/lk'
import { LkLayoutTitleData } from '@/context/lk_layout_content'
import CrmReportDeals from '@/components/for_pages/LkPage/crm/CrmReportDeals'

interface Props {

}

const StatisticDealsPage = (props: Props) => {
  return (
    <>
      <LkLayoutTitleData title={'Статистика по сделкам'} />
     <CrmReportDeals/>
    </>
  )
}

StatisticDealsPage.getLayout = LkPageLayout
export default StatisticDealsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
