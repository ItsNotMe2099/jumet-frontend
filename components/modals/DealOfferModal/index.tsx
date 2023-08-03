import styles from './index.module.scss'
import { colors } from 'styles/variables'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetLayout from '@/components/layout/BottomSheet/BottomSheetLayout'
import BottomSheetHeader from '@/components/layout/BottomSheet/BottomSheetHeader'
import BottomSheetBody from '@/components/layout/BottomSheet/BottomSheetBody'
import BottomSheetFooter from '@/components/layout/BottomSheet/BottomSheetFooter'
import CloseSvg from '@/components/svg/CloseSvg'
import DealOfferForm from './Form'
import { useAppContext } from '@/context/state'
import { DealOfferModalArguments} from '@/types/modal_arguments'

interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

const DealOfferModalInner = (props: Props) => {

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

  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.white}>
        <BottomSheetHeader>{header}</BottomSheetHeader>
        <BottomSheetBody className={styles.bottomSheetBody}>{body}</BottomSheetBody>
        <BottomSheetFooter className={styles.footer}> {footer}</BottomSheetFooter>
      </BottomSheetLayout>
    )
  }
  else {
    return (
      <ModalLayout className={styles.modalLayout}  >
        <CloseSvg onClick={props.onRequestClose} className={styles.close} color={colors.grey500} />
        <DealOfferForm saleRequestId={(appContext.modalArguments as DealOfferModalArguments)?.saleRequestId!} />
      </ModalLayout>
    )
  }
}

export default function DealOfferModal(props: Props) {
  return (<>
    <DealOfferModalInner {...props} />
  </>)
}
