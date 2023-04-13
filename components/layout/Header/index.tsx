import Link from 'next/link'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import UserSvg from '@/components/svg/UserSvg'
import { colors } from '@/styles/variables'
import { forwardRef } from 'react'
import { Sticky } from 'react-sticky'
import HiddenXs from '@/components/visibility/HiddenXs'
import MenuSvg from '@/components/svg/MenuSvg'
import CloseSvg from '@/components/svg/CloseSvg'
import { useAppContext } from '@/context/state'
import { ModalType } from '@/types/enums'

interface Props {
  isSticky?: boolean
  restProps?: any
}

const menuNotAuth = [
  { link: '', label: 'Пункты приёма лома' },
  { link: '', label: 'Купить лом' },
]

const HeaderInner = forwardRef<HTMLDivElement, Props & { style?: any, distanceFromTop?: number }>((props, ref) => {

  const appContext = useAppContext()

  const handleOpenMobileMenu = () => {
    if (typeof window !== undefined) {
      if (!appContext.modal) {
        document.body.classList.remove('modal-open')
      } else {
        document.body.classList.add('modal-open')
      }

    }

    !appContext.modal ? appContext.showModal(ModalType.MobileMenu) : appContext.hideModal()
  }

  return (
    <div className={styles.root} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            jumet
          </div>
          <div className={styles.info}>
            Онлайн-сервис продажи<br /> и покупки лома
          </div>
        </div>
        <div className={styles.middle}>
          {menuNotAuth.map((i, index) =>
            <Link key={index} className={styles.link} href={i.link}>
              {i.label}
            </Link>
          )}
        </div>
        <HiddenXs>
          <div className={styles.right}>
            <Button className={styles.btn} styleType='large' color='dark'>
              <UserSvg color={colors.white} />
              <div>Войти</div>
            </Button>
            <Button className={styles.btn} styleType='large' color='blue'>
              Зарегистрироваться
            </Button>
          </div>
        </HiddenXs>
        <div className={styles.mobile}>
          {appContext.modal === ModalType.MobileMenu ?
            <div className={styles.menu} onClick={handleOpenMobileMenu} >
              <CloseSvg color={colors.white} />
            </div>
            :
            <div className={styles.menu} onClick={handleOpenMobileMenu}>
              <MenuSvg color={colors.white} />
            </div>
          }
        </div>
      </div>
    </div >
  )

})

HeaderInner.displayName = 'HeaderInner'
export default function Header(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({ style, isSticky, ...rest }) => <HeaderInner {...props} restProps={rest} style={style} />}</Sticky>
  } else {
    return <HeaderInner {...props} />
  }
}
