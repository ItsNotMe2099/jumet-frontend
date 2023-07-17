import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import CardLayout from '../../../CardLayout'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

interface Props {
  item: IPointData
  additionalEl?: React.ReactNode
  topClassName?: string
  button?: React.ReactNode
  cardLayoutClass?: string
}

export default function DeliveryZonesCardLk({ item, additionalEl, topClassName, button, cardLayoutClass }: Props) {

  return (
    <CardLayout className={cardLayoutClass} title='Зоны доставки' additionalEl={additionalEl} topClassName={topClassName}>
      <div className={styles.root}>
        {item.zones.map((i, index) =>
          <div className={styles.item} key={index}>
            <div className={styles.info}>
              <div className={styles.infoItem}>
                <div className={styles.top}>
                  Зона доставки
                </div>
                <div className={styles.bottom}>
                  Зона {index + 1}
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.top}>
                  Расстояние от пункта приёма
                </div>
                <div className={styles.bottom}>
                  {i.distance}
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.top}>
                  Стоимость доставки за тонну
                </div>
                <div className={styles.bottom}>
                  {i.price}
                </div>
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
        )}
        {button}
      </div>
    </CardLayout>
  )
}