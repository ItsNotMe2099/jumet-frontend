import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'
import WorkingHoursView from '@/components/for_pages/Common/ReceivingPoint/WorkingHoursView'

interface Props {
  receivingPoint: IReceivingPoint
}

export default function WorkingHoursViewCard(props: Props) {
  const {receivingPoint} = props
  return (
    <ReceivingPointViewCard title='Режим работы'>
       <WorkingHoursView receivingPoint={receivingPoint}/>

    </ReceivingPointViewCard>
  )
}
