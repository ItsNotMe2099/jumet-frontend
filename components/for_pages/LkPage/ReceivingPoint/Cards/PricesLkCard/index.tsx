import styles from 'components/for_pages/LkPage/ReceivingPoint/Cards/PricesLkCard/index.module.scss'
import { useState } from 'react'
import {useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import ScrapMetalCategoryTitle from '@/components/for_pages/Common/ScrapMetalCategoryTitle'
import ReceivingPointInfoEditCard from '@/components/for_pages/LkPage/ReceivingPoint/ReceivingPointInfoEditCard'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import FormFooter from '@/components/ui/FormFooter'
import ReceivingPointPricesForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointPricesForm'
import DescField from '@/components/ui/DescField'
import Formatter from '@/utils/formatter'
import PricingTable from '@/components/for_pages/Common/PricingTable'

interface Props{

}
export default function PricesLkCard(props: Props) {
  const receivingPointContext = useReceivingPointOwnerContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleSubmit = async (data: DeepPartial<IReceivingPoint>) => {
    setLoading(true)
    await receivingPointContext.editRequest(data)
    setIsEdit(false)
    setLoading(false)
  }

  if(!receivingPointContext.receivingPoint){
    return null
  }
  return (
    <ReceivingPointInfoEditCard title='Стоимость приема лома'
                                isEdit={isEdit}
                                onSetIsEdit={setIsEdit}
                                form={<ReceivingPointPricesForm footer={<FormFooter hasBack onBack={() => setIsEdit(false)} spinner={loading} />}  receivingPoint={receivingPointContext.receivingPoint!} onSubmit={handleSubmit}/>}>
      {receivingPointContext.receivingPoint?.prices.map((price) => <div className={styles.category}>
        <ScrapMetalCategoryTitle category={price.category}/>
        {price.priceDependsOnRubbish && <DescField label={'Засор'} value={`${price.rubbishInPercents}%`}/>}
        {!price.priceDependsOnWeight && <DescField label={'Цена за тонну'} value={Formatter.formatPrice(price.price)}/>}
        {price.priceDependsOnWeight && <PricingTable headerRow={{cells: [
            {value: 'Вес лома'},
            ...(price.pricesByWeight ?? [])?.map(a => ({value: `От ${a.minWeightInTons}т до ${a.maxWeightInTons}т`})),
          ]}}  data={[
          {cells: [{value: 'Цена за тонну'},
              ...(price.pricesByWeight ?? [])?.map(a => ({value: Formatter.formatPrice(a.price)}))
            ]}
        ]}/>}
      </div>)}

    </ReceivingPointInfoEditCard>
  )
}
