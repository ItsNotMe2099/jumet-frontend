import styles from './index.module.scss'
import { colors } from 'styles/variables'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetLayout from '@/components/layout/BottomSheet/BottomSheetLayout'
import BottomSheetHeader from '@/components/layout/BottomSheet/BottomSheetHeader'
import BottomSheetBody from '@/components/layout/BottomSheet/BottomSheetBody'
import BottomSheetFooter from '@/components/layout/BottomSheet/BottomSheetFooter'
import CloseSvg from '@/components/svg/CloseSvg'
import SaleRequestOfferForm from './Form'
import { useAppContext } from '@/context/state'

interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

const SaleRequestOfferModalInner = (props: Props) => {

  const appContext = useAppContext()

  console.log(appContext.modalArguments)

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
        <div className={styles.title}>
          Предложение сделки
        </div>
        <SaleRequestOfferForm pointId={appContext.modalArguments} />
      </ModalLayout>
    )
  }
}

export default function SaleRequestOfferModal(props: Props) {
  return (<>
    <SaleRequestOfferModalInner {...props} />
  </>)
}
