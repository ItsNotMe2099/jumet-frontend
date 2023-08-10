import FormStepFooter from '@/components/ui/FormStepFooter'
import {IFormStepProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointUsersForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointUsersForm'

interface IFormData{
  users: {name: string | null, email: string | null}[]
}

interface Props extends IFormStepProps<IReceivingPoint>{

}

export default function UsersStep(props: Props) {
  return (
    <ReceivingPointUsersForm onSubmit={props.onSubmit}
                              footer={<FormStepFooter hasBack onBack={props.onBack} spinner={props.loading}/>}/>
  )
}
