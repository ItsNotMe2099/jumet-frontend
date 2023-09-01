import styles from './index.module.scss'
import {useMemo, useState} from 'react'
import ScrapMetalCategoryTitle from '@/components/for_pages/Common/ScrapMetalCategoryTitle'
import DescField from '@/components/ui/DescField'
import Formatter from '@/utils/formatter'
import PricingTable from '@/components/for_pages/Common/PricingTable'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {IOption} from '@/types/types'
import {IDeliveryArea} from '@/data/interfaces/IDeliveryArea'
import ReceivingPointUtils from '@/utils/ReceivingPointUtils'
import {IPriceDescription} from '@/data/interfaces/IPriceDescription'
import {useDataContext} from '@/context/data_state'
import Switch from '@/components/ui/Switch'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'

interface Props {
  receivingPoint: IReceivingPoint
}
type OptionsMap = {[key: number]: IDeliveryArea}
type SwitchRubbishMap = {[key: number]: boolean}
export default function PricesViewCard(props: Props) {
  const {receivingPoint} = props
  const dataContext = useDataContext()

  const [switchRubbishMap , setSwitchRubbishMap] = useState<SwitchRubbishMap>(receivingPoint.prices.reduce((ac, a) => ({
    ...ac,
    [a.id]: true
  }), {}))

  const deliveryAreaNames = useMemo<IOption<number>[]>(() => receivingPoint.deliveryAreas
    .sort((a, b) => (a.fromDistance ?? 0) - (b.fromDistance ?? 0))
    .map(i => ({label: `${i.fromDistance} - ${i.toDistance} км`, value: i.id!}))
    , [receivingPoint.deliveryAreas])

  const sortedPrices = useMemo<IPriceDescription[]>(() => {
    const keys = dataContext.scrapMetalCategories.map(i => i.category as string)
    return receivingPoint.prices
      .sort((a, b) => keys.indexOf(a.category) - keys.indexOf(b.category))
      .map(i => ({...i, pricesByWeight: i.pricesByWeight?.sort((a, b) => (a.minWeightInTons ?? 0) - (b.minWeightInTons ?? 0))}))
  }, [receivingPoint.prices])


  const deliveryAreaMap = useMemo<any>(() => receivingPoint.deliveryAreas.reduce((ac, a) => ({
      ...ac,
      [a.id!]: a
    }), {} as OptionsMap)
    , [receivingPoint.deliveryAreas])

  return (
    <ReceivingPointViewCard title='Стоимость приема лома'>
      <div className={styles.root}>
      {sortedPrices?.map((price) => <div className={styles.category}>
      <div className={styles.top}>
        <ScrapMetalCategoryTitle category={price.category} className={styles.categoryName}/>
        {price.priceDependsOnRubbish && (price.rubbishInPercents ?? 0) > 0 && <div className={styles.switch}>
          <Switch checked={switchRubbishMap[price.id]}  onChange={(a) => {setSwitchRubbishMap(i => ({...i, [price.id]: a }))}} />
          <div className={styles.text}>Цены за вычетом засора</div>
        </div>}
      </div>

      {!price.priceDependsOnWeight && deliveryAreaNames.length === 0 && <DescField label={'Самовывоз продавцом'} value={Formatter.formatDeliveryPrice(switchRubbishMap[price.id] ? ReceivingPointUtils.getPriceWithRubbish(price.price, price.rubbishInPercents) : price.price)}/>}
        {price.priceDependsOnWeight   && <PricingTable headerRow={{cells: [
            {value: 'Вес лома'},
            {value: 'Самовывоз продавцом'},
            ...deliveryAreaNames?.map(a => ({value: a.label})),
          ]}}  data={price.pricesByWeight?.map(i => ({
          cells: [
            {value: ReceivingPointUtils.formatWeightRange(i)},
            {value: Formatter.formatDeliveryPrice(switchRubbishMap[price.id] ? ReceivingPointUtils.getPriceWithRubbish(i.price, price.rubbishInPercents) : i.price)},
            ...deliveryAreaNames?.map(a => ({value: Formatter.formatDeliveryPrice((switchRubbishMap[price.id] ? ReceivingPointUtils.getPriceWithRubbish(i.price, price.rubbishInPercents) : i.price) + (deliveryAreaMap[a.value!]?.price ?? 0))})),
          ]
        })) ?? []}/>}
        {!price.priceDependsOnWeight  && deliveryAreaNames.length > 0  && <PricingTable headerRow={{cells: [
            {value: 'Самовывоз продавцом'},
            ...deliveryAreaNames?.map(a => ({value: a.label})),
          ]}}  data={[{
          cells: [
            {value: Formatter.formatDeliveryPrice(switchRubbishMap[price.id] ? ReceivingPointUtils.getPriceWithRubbish(price.price, price.rubbishInPercents) : price.price)},
            ...deliveryAreaNames?.map(a => ({value: Formatter.formatDeliveryPrice(switchRubbishMap[price.id]  ? ReceivingPointUtils.getPriceWithRubbish(price.price, price.rubbishInPercents) : price.price + (deliveryAreaMap[a.value!]?.price ?? 0))})),
          ]}]
        }/>}
    </div>)}
      </div>
    </ReceivingPointViewCard>
  )
}
