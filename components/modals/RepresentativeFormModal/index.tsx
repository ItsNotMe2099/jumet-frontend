import ModalLayout from 'components/layout/Modal/ModalLayout'
import {useAppContext} from '@/context/state'
import ModalBody from '@/components/layout/Modal/ModalBody'
import {RepresentativeFormModalArguments} from '@/types/modal_arguments'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import RepresentativeForm from '@/components/for_pages/LkPage/Common/RepresentativeForm'

interface Props {
  isBottomSheet?: boolean
}

export default function RepresentativeFormModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as RepresentativeFormModalArguments
  return (
    <ModalLayout fixed size={'large'}>
      <ModalHeader title={args?.representative ? 'Редактировать представителя' : 'Добавить представителя'}/>
      <ModalBody fixed >
        <RepresentativeForm representative={args.representative}/>
      </ModalBody>
    </ModalLayout>
  )
}
