import styles from 'components/for_pages/LkPage/ReceivingPoint/Cards/DeliveryZonesLkCard/index.module.scss'
import {useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import Formatter from '@/utils/formatter'
import {DeepPartial} from '@/types/types'
import {useState} from 'react'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointDeliveryForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointDeliveryForm'
import FormFooter from '@/components/ui/FormFooter'
import ReceivingPointInfoEditCard from '@/components/for_pages/LkPage/ReceivingPoint/ReceivingPointInfoEditCard'
import DescField from '@/components/ui/DescField'
import {DeliveryPriceType} from '@/data/enum/DeliveryPriceType'

interface Props{
}

export default function DeliveryZonesLkCard(props: Props) {
  const receivingPointContext = useReceivingPointOwnerContext()
  const receivingPoint = receivingPointContext.receivingPoint
  const [loading, setLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleSubmit = async (data: DeepPartial<IReceivingPoint>) => {
    setLoading(true)
    console.log('handleSubmit22', data)
    await receivingPointContext.editRequest(data)
    setIsEdit(false)
    setLoading(false)
  }
  return (
    <ReceivingPointInfoEditCard title={receivingPoint?.deliveryPriceType === DeliveryPriceType.ByDistance  ? 'Зоны доставки' : 'Доставка'}
                                  isEdit={isEdit}
                                  onSetIsEdit={setIsEdit}
                                  form={<ReceivingPointDeliveryForm footer={<FormFooter hasBack onBack={() => setIsEdit(false)} spinner={loading} />} receivingPoint={receivingPointContext.receivingPoint}  onSubmit={handleSubmit}/>}>
      <div className={styles.root}>
        {receivingPoint?.hasDelivery && receivingPoint?.deliveryPriceType === DeliveryPriceType.ByDistance && receivingPoint?.deliveryAreas?.map((i, index) =>
          <div className={styles.item} key={index}>
              <DescField label={'Зона доставки'} value={`Зона ${index + 1}`}/>
              <DescField label={'Расстояние от пункта приёма'} value={` От ${i.fromDistance} км до ${i.toDistance} км`}/>
              {i.deliveryPricePerTon && <DescField label={'Стоимость доставки за тонну'} value={Formatter.formatDeliveryPrice(i.deliveryPricePerTon)}/>}
          </div>
        )}
        {receivingPoint?.hasDelivery && receivingPoint?.deliveryPriceType === DeliveryPriceType.Fixed && <DescField label={'Стоимость доставки'} value={Formatter.formatDeliveryPrice(receivingPoint.deliveryPriceFixed)}/>}
        {receivingPoint?.hasLoading && <DescField label={'Стоимость погрузки'} value={Formatter.formatDeliveryPrice(receivingPoint.loadingPrice)}/>}
        {!receivingPoint?.hasDelivery  && <div>Нет доставки</div>}

      </div>
    </ReceivingPointInfoEditCard>
  )
}
