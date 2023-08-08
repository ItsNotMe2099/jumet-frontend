import styles from './index.module.scss'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import SaleRequestOfferForm from './Form'
import { useAppContext } from '@/context/state'
import ModalBody from '@/components/layout/Modal/ModalBody'
import {SaleRequestOfferModalArguments} from '@/types/modal_arguments'
import ModalHeader from '@/components/layout/Modal/ModalHeader'

interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

const SaleRequestOfferModalInner = (props: Props) => {
  const appContext = useAppContext()
  const header = (<div />)

  const body = (
    <>
      <div className={styles.bodyWrapper}>

      </div>
    </>
  )

  const footer = (
    <></>
  )

    return (
      <ModalLayout fixed size={'large'} >
        <ModalHeader title={'Предложение сделки'}/>

        <ModalBody fixed>
          <SaleRequestOfferForm receivingPointId={(appContext.modalArguments as SaleRequestOfferModalArguments)?.receivingPointId!} />
        </ModalBody>
      </ModalLayout>
    )
}

export default function SaleRequestOfferModal(props: Props) {
  return (<>
    <SaleRequestOfferModalInner {...props} />
  </>)
}
