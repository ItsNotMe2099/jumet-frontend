import {ReceivingPointOwnerWrapper, useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import ReceivingPointStats from '@/components/for_pages/LkPage/crm/components/ReceivingPointStats'
import {LkLayoutTitleData} from '@/context/lk_layout_content'

interface Props {
  receivingPointId: number
}

const CrmReportReceivingPointInner = (props: Props) => {
  const receivingPointOwnerContext = useReceivingPointOwnerContext()
  return (
      <>
        <LkLayoutTitleData title={`Статистика по пункту приёма ${receivingPointOwnerContext.receivingPoint?.address?.address ?? ''}`} />
        <ReceivingPointStats loading={receivingPointOwnerContext.loading} receivingPointId={props.receivingPointId}/>
      </>
     )
}

export default function CrmReportReceivingPoint(props: Props) {
  return (<ReceivingPointOwnerWrapper receivingPointId={props.receivingPointId}>
        <CrmReportReceivingPointInner receivingPointId={props.receivingPointId}/>
   </ReceivingPointOwnerWrapper>)
}
