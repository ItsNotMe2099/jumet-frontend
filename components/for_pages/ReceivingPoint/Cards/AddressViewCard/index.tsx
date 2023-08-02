import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'
import AddressView from '@/components/for_pages/Common/ReceivingPoint/AddressView'

interface Props {
  receivingPoint: IReceivingPoint
}

export default function AddressViewCard(props: Props) {
  const {receivingPoint} = props
  return (
    <ReceivingPointViewCard title='Адрес пункта приема'>
      <AddressView receivingPoint={receivingPoint}/>
    </ReceivingPointViewCard>
  )
}
