import ModalLayout from 'components/layout/Modal/ModalLayout'
import DealOfferForm from './Form'
import { useAppContext } from '@/context/state'
import { DealOfferModalArguments} from '@/types/modal_arguments'
import ModalHeader from '@/components/layout/Modal/ModalHeader'
import ModalBody from '@/components/layout/Modal/ModalBody'

interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

const DealOfferModalInner = (props: Props) => {

  const appContext = useAppContext()
  const args = (appContext.modalArguments as DealOfferModalArguments)



    return (
      <ModalLayout size={'large'} >
        <ModalHeader title={'Предложить сделку'}/>
        <ModalBody>
          <DealOfferForm saleRequestId={args?.saleRequestId!} />
        </ModalBody>
       </ModalLayout>
    )
}

export default function DealOfferModal(props: Props) {
  return (<>
    <DealOfferModalInner {...props} />
  </>)
}
