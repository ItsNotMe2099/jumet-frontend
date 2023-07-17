import IPointData from '@/data/interfaces/IPointData'
import styles from './index.module.scss'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import CardLayout from '../../../CardLayout'

interface Props {
  item: IPointData
  additionalEl?: React.ReactNode
  topClassName?: string
  cardLayoutClass?: string
  button?: React.ReactNode
}

export default function AddressCard(props: Props) {

  return (
    <CardLayout
      className={props.cardLayoutClass}
      title='Адрес пункта приёма лома'
      additionalEl={props.additionalEl}
      topClassName={props.topClassName}>
      <div className={styles.address}>
        {props.item.address}
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
      {props.button}
    </CardLayout>
  )
}