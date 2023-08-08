import CardLayout from '../../../CardLayout'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import AddressView from '@/components/for_pages/Common/ReceivingPoint/AddressView'

interface Props {
  item: ISaleRequest | null

}

export default function SaleRequestAddressCard(props: Props) {

  return (
    <CardLayout
      title='Адрес расположения лома'
    >
      <AddressView address={props.item?.address?.address} location={props.item?.location}/>

    </CardLayout>
  )
}
