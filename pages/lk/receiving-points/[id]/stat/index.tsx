import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkReceivingPageLayout} from '@/pages/lk'
import ReceivingPointStats from '@/components/for_pages/LkPage/crm/components/ReceivingPointStats'
import {useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import {LkLayoutTitleData} from '@/context/lk_layout_content'

interface Props {

}

const ReceivingPointStatisticPage = (props: Props) => {
  const receivingPointContext = useReceivingPointOwnerContext()

  return (
    <>
      <LkLayoutTitleData
        title={`Статистика по пункту приёма ${receivingPointContext.receivingPoint?.address?.address ?? ''}`}/>
      <ReceivingPointStats loading={receivingPointContext.loading}
                           receivingPointId={receivingPointContext.receivingPointId}/>

    </>
  )
}
ReceivingPointStatisticPage.getLayout = LkReceivingPageLayout
export default ReceivingPointStatisticPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
