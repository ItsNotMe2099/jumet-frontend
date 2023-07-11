import Tab from '@/components/ui/Tab'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import { useState } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import CardLayout from '../../CardLayout'

interface Props {
  item: IPointData
}

export default function DeliveryZonesCard({ item }: Props) {

  const radiusTabs = [
    { radius: '1-20' },
    { radius: '20-50' },
    { radius: '50-100' },
    { radius: '100-500' },
    { radius: '500-1000' },
  ]

  const renderCost = (radius: string) => {
    switch (radius) {
      case '1-20':
        return '1000'
      case '20-50':
        return '2000'
      case '50-100':
        return '3000'
      case '100-500':
        return '4000'
      case '500-1000':
        return '5000'
    }
  }

  const [filterRadius, setFilterRadius] = useState<string>(radiusTabs[0].radius)

  return (
    <CardLayout title='Зоны доставки'>
      <div className={styles.tabs}>
        {radiusTabs.map((i, index) =>
          <Tab
            className={styles.tab}
            active={filterRadius === i.radius}
            text={`${i.radius} км`}
            key={index}
            onClick={() => setFilterRadius(i.radius)} />
        )}
      </div>
      <div className={styles.cost}>
        <div className={styles.top}>
          Стоимость доставки
        </div>
        <div className={styles.number}>
          {renderCost(filterRadius)} ₽/т
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
    </CardLayout>
  )
}