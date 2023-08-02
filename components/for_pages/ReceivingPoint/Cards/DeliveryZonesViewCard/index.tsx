import styles from '@/components/for_pages/ReceivingPoint/Cards/DeliveryZonesViewCard/index.module.scss'
import {useMemo, useState} from 'react'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {IOption} from '@/types/types'
import Tabs from '@/components/ui/Tabs'
import DescField from '@/components/ui/DescField'
import Formatter from '@/utils/formatter'
import {IDeliveryArea} from '@/data/interfaces/IDeliveryArea'

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

  return (
    <ReceivingPointViewCard title='Зоны доставки'>
      <div className={styles.tabs}>
        <Tabs<number> options={options} value={filterRadius} onClick={setFilterRadius}/>
      </div>
      <div className={styles.cost}>
        <DescField label={'Стоимость доставки'} value={Formatter.formatDeliveryPrice(deliveryAreaMap[filterRadius].deliveryPricePerTon)}/>
      </div>
    </ReceivingPointViewCard>
  )
}
