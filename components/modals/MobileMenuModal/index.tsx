import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import { colors } from 'styles/variables'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetLayout from '@/components/layout/BottomSheet/BottomSheetLayout'
import BottomSheetHeader from '@/components/layout/BottomSheet/BottomSheetHeader'
import BottomSheetBody from '@/components/layout/BottomSheet/BottomSheetBody'
import BottomSheetFooter from '@/components/layout/BottomSheet/BottomSheetFooter'
import Link from 'next/link'

interface Props {
  isBottomSheet?: boolean
}

const MobileMenuModalInner = (props: Props) => {
  const appContext = useAppContext()
  const header = (<div />)

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
        {menuNotAuth.map((i, index) =>
          <Link key={index} className={styles.link} href={i.link}>
            {i.label}
          </Link>
        )}
      </ModalLayout>
    )
  }
}

export default function MobileMenuModal(props: Props) {
  return (<>
    <MobileMenuModalInner {...props} />
  </>)
}
