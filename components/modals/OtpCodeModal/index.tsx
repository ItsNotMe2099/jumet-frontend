import styles from './index.module.scss'
import { colors } from 'styles/variables'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetLayout from '@/components/layout/BottomSheet/BottomSheetLayout'
import BottomSheetHeader from '@/components/layout/BottomSheet/BottomSheetHeader'
import BottomSheetBody from '@/components/layout/BottomSheet/BottomSheetBody'
import BottomSheetFooter from '@/components/layout/BottomSheet/BottomSheetFooter'
import OtpCodeForm from './Form'
import CloseSvg from '@/components/svg/CloseSvg'
import {useAppContext} from '@/context/state'
import {OtpCodeModalArguments} from '@/types/modal_arguments'

interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

const OtpCodeModalInner = (props: Props) => {

  const header = (<div />)
    const appContext = useAppContext()
  const args = appContext.modalArguments as OtpCodeModalArguments
  const menuNotAuth = [
    { link: '', label: 'Пункты приёма лома' },
    { link: '', label: 'Купить лом' },
  ]

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
        <div className={styles.title}>Введите код</div>
        <div className={styles.container}>
          <div className={styles.text}>
            На указанный вами номер отправлен код<br /> подтверждения, введите его
          </div>
          <OtpCodeForm  login={args.login} code={args.code} codeCanRetryIn={args.codeCanRetryIn} onConfirm={args.onConfirm} onSendAgain={args.onSendAgain}/>
        </div>
      </ModalLayout>
    )
  }
}

export default function OtpCodeModal(props: Props) {
  return (<>
    <OtpCodeModalInner {...props} />
  </>)
}
