import styles from './index.module.scss'
import YandexStaticMap from '@/components/ui/YandexStaticMap'
import {ILocation} from '@/data/interfaces/ILocation'

interface Props {
  address: string | null | undefined
  location: ILocation |  null | undefined
}

export default function AddressView(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.address}>
        {props.address}
      </div>
      <YandexStaticMap className={styles.map} center={props.location ?? null}/>
    </div>
  )
}
