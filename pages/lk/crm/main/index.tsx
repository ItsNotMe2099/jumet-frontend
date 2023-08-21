import { getAuthServerSideProps } from '@/utils/auth'
import { UserRole } from '@/data/enum/UserRole'
import { LkPageLayout } from '@/pages/lk'
import { LkLayoutTitleData } from '@/context/lk_layout_content'
import CrmReportDashboard from '@/components/for_pages/LkPage/crm/CrmReportDashboard'

interface Props {

}

const StatisticPage = (props: Props) => {
  return (<>
      <LkLayoutTitleData title={'Статистика'}/>
      <CrmReportDashboard/>
    </>
  )
}
StatisticPage.getLayout = LkPageLayout
export default StatisticPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
