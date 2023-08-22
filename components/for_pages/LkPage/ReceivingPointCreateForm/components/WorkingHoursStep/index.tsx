import FormStepFooter from '@/components/ui/FormStepFooter'
import {DeepPartial, IFormStepProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointWorkingHoursForm
  from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointWorkingHoursForm'
import {ReceivingPointStatus} from '@/data/enum/ReceivingPointStatus'

interface Props extends IFormStepProps<IReceivingPoint> {

}

export default function WorkingHoursStep(props: Props) {

  const handleSubmit = (data: DeepPartial<IReceivingPoint>) => {
      return props.onSubmit({...data, status: ReceivingPointStatus.Moderation})
  }
  return (
    <ReceivingPointWorkingHoursForm
      hasPhotos={true}
      onSubmit={handleSubmit}
      footer={<FormStepFooter hasBack onBack={props.onBack} spinner={props.loading}/>}/>
  )
}
