import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'


interface Props {
  item: IPointData
}

export default function AddressCard(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.title}>
          Адрес пункта приёма лома
        </div>
        <div className={styles.address}>
          {props.item.address}
        </div>
      </div>
      <div className={styles.map}>
        <YMaps query={{ apikey: 'YOUR_API_KEY' }}>
          <Map
            className={styles.internal}
            state={{ center: [55.76, 37.64], zoom: 10 }}
          >
            <Placemark geometry={{ lat: '', lng: '' }} />
          </Map>
        </YMaps>
      </div>
    </div>
  )
}