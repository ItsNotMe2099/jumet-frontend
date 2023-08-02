import styles from './index.module.scss'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import YandexStaticMap from '@/components/ui/YandexStaticMap'

interface Props {
  receivingPoint: IReceivingPoint
}

export default function AddressView(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.address}>
        {props.receivingPoint?.address.address}
      </div>
      <YandexStaticMap className={styles.map} center={props.receivingPoint?.location ?? null}/>
    </div>
  )
}
