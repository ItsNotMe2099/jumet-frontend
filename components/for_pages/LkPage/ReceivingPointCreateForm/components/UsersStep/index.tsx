import FormStepFooter from '@/components/ui/FormStepFooter'
import {DeepPartial, IFormStepProps, Nullable} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointUsersForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointUsersForm'
import {ReceivingPointStatus} from '@/data/enum/ReceivingPointStatus'


interface Props extends IFormStepProps<IReceivingPoint>{
  receivingPoint?: Nullable<IReceivingPoint> | undefined
}

export default function UsersStep(props: Props) {
  const handleSubmit = (data: DeepPartial<IReceivingPoint>) => {

    return props.onSubmit({...data, status: ReceivingPointStatus.Moderation})
  }
  return (
    <ReceivingPointUsersForm onSubmit={handleSubmit}
                              footer={<FormStepFooter hasBack onBack={props.onBack} spinner={props.loading}/>}/>
  )
}
