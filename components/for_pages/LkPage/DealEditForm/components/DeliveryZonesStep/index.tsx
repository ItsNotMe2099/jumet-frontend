import {IFormStepProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointDeliveryForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointDeliveryForm'
import FormStepFooter from '@/components/ui/FormStepFooter'


interface Props extends IFormStepProps<IReceivingPoint>{


}

export default function DeliveryZoneStep(props: Props) {
  return (
    <ReceivingPointDeliveryForm onSubmit={props.onSubmit}
      footer={<FormStepFooter  onBack={props.onBack} spinner={props.loading}/>}/>
  )
}
