import styles from '@/components/for_pages/ReceivingPoint/Cards/DeliveryZonesViewCard/index.module.scss'
import {useMemo, useState} from 'react'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {IOption} from '@/types/types'
import Tabs from '@/components/ui/Tabs'
import DescField from '@/components/ui/DescField'
import {IDeliveryArea} from '@/data/interfaces/IDeliveryArea'
import Formatter from '@/utils/formatter'
import {DeliveryPriceType} from '@/data/enum/DeliveryPriceType'

interface Props {
  receivingPoint: IReceivingPoint
  cardLayoutClass?: string
  cardLayoutTitleClass?: string
}
type OptionsMap = {[key: number]: IDeliveryArea}
export default function DeliveryZonesViewCard(props: Props) {
  const {receivingPoint} = props
  const options: IOption<number>[] = receivingPoint.deliveryAreas
    .sort((a, b) => (a.fromDistance ?? 0) - (b.fromDistance ?? 0))
    .map(i => ({label:`${i.fromDistance} - ${i.toDistance} км`, value: i.id!}))

  const deliveryAreaMap = useMemo<any>(() => receivingPoint.deliveryAreas.reduce((ac, a) => ({
      ...ac,
      [a.id!]: a
    }), {} as OptionsMap)
    , [receivingPoint.deliveryAreas])
  const [filterRadius, setFilterRadius] = useState<number>(options.length > 0 ? (options[0].value ?? 0) : 0)
  console.log('receivingPoint', receivingPoint.deliveryAreas)
  if(!receivingPoint.hasDelivery){
    return null
  }
    return (
      <ReceivingPointViewCard title={receivingPoint.deliveryPriceType === DeliveryPriceType.ByDistance  ? 'Зоны доставки' : 'Доставка'}>
        <div className={styles.root}>
          {receivingPoint.hasDelivery && receivingPoint.deliveryPriceType === DeliveryPriceType.ByDistance && receivingPoint.deliveryAreas.length > 0 && <Tabs<number> options={options} value={filterRadius} onClick={setFilterRadius}/>}
          {receivingPoint.hasDelivery && receivingPoint.deliveryPriceType === DeliveryPriceType.ByDistance && receivingPoint.deliveryAreas.length > 0 && <DescField label={'Стоимость доставки'} value={<div className={styles.price}>{deliveryAreaMap[filterRadius].deliveryPricePerTon === 0 ? 'бесплатно' : Formatter.formatDeliveryPrice(deliveryAreaMap[filterRadius].deliveryPricePerTon)}</div>}/>}
          {receivingPoint.hasDelivery && receivingPoint.deliveryPriceType === DeliveryPriceType.Fixed && <DescField label={'Стоимость доставки'} value={<div className={styles.price}>{receivingPoint.deliveryPriceFixed === 0 ? 'бесплатно' : Formatter.formatDeliveryPrice(receivingPoint.deliveryPriceFixed)}</div>}/>}
          {receivingPoint.hasDelivery && receivingPoint.hasLoading && <DescField label={'Стоимость погрузки'} value={<div className={styles.price}>{receivingPoint.loadingPrice === 0 ? 'бесплатно' : Formatter.formatDeliveryPrice(receivingPoint.loadingPrice)}</div>}/>}
          </div>
      </ReceivingPointViewCard>
    )
}
