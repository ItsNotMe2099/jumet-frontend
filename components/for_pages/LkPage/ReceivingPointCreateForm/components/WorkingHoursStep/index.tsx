import FormStepFooter from '@/components/ui/FormStepFooter'
import {IFormStepProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointWorkingHoursForm
  from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointWorkingHoursForm'

interface Props extends IFormStepProps<IReceivingPoint> {

}

export default function WorkingHoursStep(props: Props) {

  return (
    <ReceivingPointWorkingHoursForm
      hasPhotos={true}
      onSubmit={props.onSubmit}
      footer={<FormStepFooter onBack={props.onBack} spinner={props.loading}/>}/>
  )
}
