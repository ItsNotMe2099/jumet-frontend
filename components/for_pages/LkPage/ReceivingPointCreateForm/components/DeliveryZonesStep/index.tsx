import {IFormStepProps, Nullable} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointDeliveryForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointDeliveryForm'
import FormStepFooter from '@/components/ui/FormStepFooter'


interface Props extends IFormStepProps<IReceivingPoint>{
  receivingPoint?: Nullable<IReceivingPoint> | undefined
}

export default function DeliveryZoneStep(props: Props) {
  return (
    <ReceivingPointDeliveryForm onSubmit={props.onSubmit} receivingPoint={props.receivingPoint}
      footer={<FormStepFooter hasBack  onBack={props.onBack} spinner={props.loading}/>}/>
  )
}
