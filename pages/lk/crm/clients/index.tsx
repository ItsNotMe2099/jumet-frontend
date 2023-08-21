import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkReceivingPageLayout} from '@/pages/lk'
import {LkLayoutTitleData} from '@/context/lk_layout_content'
import CrmReportSellers from '@/components/for_pages/LkPage/crm/CrmReportSellers'

interface Props {

}

const StatisticClientsPage = (props: Props) => {

  return (
    <>
      <LkLayoutTitleData title={'Статистика по пункту приёма'}/>
      <CrmReportSellers/>
    </>
  )
}
StatisticClientsPage.getLayout = LkReceivingPageLayout
export default StatisticClientsPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
