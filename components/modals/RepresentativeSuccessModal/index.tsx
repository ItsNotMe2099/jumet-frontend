import ModalLayout from 'components/layout/Modal/ModalLayout'
import {useAppContext} from '@/context/state'
import ModalBody from '@/components/layout/Modal/ModalBody'
import { RepresentativeSuccessModalArguments} from '@/types/modal_arguments'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import RepresentativeCreateSuccess from '@/components/for_pages/LkPage/Representatives/RepresentativeCreateSuccess'
import {RepresentativeWrapper, useRepresentativeContext} from '@/context/representative_state'

interface Props {
}

const RepresentativeSuccessModalInner = (props: Props) => {
  const representativeContext = useRepresentativeContext()
  return (
    <ModalLayout fixed size={'large'}>
      <ModalHeader/>
      <ModalBody fixed >
        <RepresentativeCreateSuccess code={representativeContext.representative?.code ?? null}/>
      </ModalBody>
    </ModalLayout>
  )
}

export default function RepresentativeSuccessModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as RepresentativeSuccessModalArguments
    return <RepresentativeWrapper representative={args.representative} representativeId={args.representative.id}>
      <RepresentativeSuccessModalInner/>
  </RepresentativeWrapper>
}
