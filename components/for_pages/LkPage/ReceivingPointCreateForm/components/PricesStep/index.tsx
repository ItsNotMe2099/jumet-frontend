import FormStepFooter from '@/components/ui/FormStepFooter'
import {IFormStepProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointPricesForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointPricesForm'

interface Props extends IFormStepProps<IReceivingPoint>{

}

export default function PricesStep(props: Props) {
  return (
    <ReceivingPointPricesForm onSubmit={props.onSubmit}
      footer={<FormStepFooter hasBack onBack={props.onBack} spinner={props.loading}/>}/>
  )
}
