import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import { colors } from 'styles/variables'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetLayout from '@/components/layout/BottomSheet/BottomSheetLayout'
import BottomSheetHeader from '@/components/layout/BottomSheet/BottomSheetHeader'
import BottomSheetBody from '@/components/layout/BottomSheet/BottomSheetBody'
import BottomSheetFooter from '@/components/layout/BottomSheet/BottomSheetFooter'
import Link from 'next/link'
import LoginSvg from '@/components/svg/LoginSvg'
import UserSvg from '@/components/svg/UserSvg'
import SettingsSvg from '@/components/svg/SettingsSvg'
import CashSvg from '@/components/svg/CashSvg'
import LogoutSvg from '@/components/svg/LogoutSvg'

interface Props {
  isBottomSheet?: boolean
}

const MobileMenuModalInner = (props: Props) => {
  const appContext = useAppContext()
  const header = (<div />)

  const menuNotAuth = [
    { link: '', label: 'Пункты приёма лома' },
    { link: '', label: 'Купить лом' },
    { link: '/auth/login', label: 'Войти', icon: <LoginSvg color={colors.white} /> },
    { link: '/auth/registration', label: 'Зарегистрироваться', icon: <UserSvg color={colors.white} /> }
  ]

  const menuLogged = [
    { link: '', label: 'Настройки профиля', icon: <SettingsSvg color={colors.white} /> },
    { link: '', label: 'Оплата сервиса Jumet', icon: <CashSvg color={colors.white} /> },
    { link: '', label: 'Выйти', icon: <LogoutSvg color={colors.white} /> },
  ]

  const handleCloseMobileMenu = () => {
    if (typeof window !== undefined) {
      document.body.classList.remove('modal-open')
    }
    appContext.hideModal()
  }

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
        {!appContext.isLogged ? <>
          {menuNotAuth.slice(0, 2).map((i, index) =>
            <Link key={index} className={styles.link} href={i.link}>
              {i.label}
            </Link>
          )}
          <div className={styles.sep} />
          {menuNotAuth.slice(2).map((i, index) =>
            <Link onClick={handleCloseMobileMenu} key={index} className={styles.linkWithIcon} href={i.link}>
              <span>{i.icon}</span>{i.label}
            </Link>
          )}
        </> :
          <>
            {menuLogged.slice(0, 2).map((i, index) =>
              <Link onClick={handleCloseMobileMenu} key={index} className={styles.linkWithIcon} href={i.link}>
                <span>{i.icon}</span>{i.label}
              </Link>
            )}
            <div className={styles.sep} />
            {menuLogged.slice(2).map((i, index) =>
              <Link onClick={() => setTimeout(() => appContext.logout(), 100)} key={index} className={styles.linkWithIcon} href={i.link}>
                <span>{i.icon}</span>{i.label}
              </Link>
            )}
          </>}
      </ModalLayout>
    )
  }
}

export default function MobileMenuModal(props: Props) {
  return (<>
    <MobileMenuModalInner {...props} />
  </>)
}
