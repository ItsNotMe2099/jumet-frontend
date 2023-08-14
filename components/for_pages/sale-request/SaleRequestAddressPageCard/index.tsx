import CardLayout from 'components/for_pages/Common/CardLayout'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import AddressView from '@/components/for_pages/Common/ReceivingPoint/AddressView'
import styles from 'components/for_pages/sale-request/SaleRequestAddressPageCard/index.module.scss'
interface Props {
  item: ISaleRequest | null

}

export default function SaleRequestAddressPageCard(props: Props) {

  if(!props.item?.location && !props.item?.address?.address){
    return null
  }

  return (
    <CardLayout
      title='Адрес расположения лома'
      className={styles.card}
    >
      <AddressView address={props.item?.address?.address} location={props.item?.location}/>

    </CardLayout>
  )
}