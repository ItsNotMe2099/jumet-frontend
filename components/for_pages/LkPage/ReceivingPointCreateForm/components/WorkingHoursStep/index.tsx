import FormStepFooter from '@/components/ui/FormStepFooter'
import {DeepPartial, IFormStepProps, Nullable} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointWorkingHoursForm
  from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointWorkingHoursForm'

interface Props extends IFormStepProps<IReceivingPoint> {
  receivingPoint?: Nullable<IReceivingPoint> | undefined
}

export default function WorkingHoursStep(props: Props) {

  const handleSubmit = (data: DeepPartial<IReceivingPoint>) => {
    return props.onSubmit({...data})
  }
  return (
    <ReceivingPointWorkingHoursForm
      hasPhotos={true}
      onSubmit={handleSubmit}
      receivingPoint={props.receivingPoint}
      footer={<FormStepFooter hasBack onBack={props.onBack} spinner={props.loading}/>}/>
  )
}
