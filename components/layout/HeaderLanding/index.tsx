import Link from 'next/link'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import { colors } from '@/styles/variables'
import { forwardRef } from 'react'
import { Sticky } from 'react-sticky'
import HiddenXs from '@/components/visibility/HiddenXs'
import MenuSvg from '@/components/svg/MenuSvg'
import CloseSvg from '@/components/svg/CloseSvg'
import { useAppContext } from '@/context/state'
import { ModalType } from '@/types/enums'
import { Routes } from '@/types/routes'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'
import classNames from 'classnames'
import NotificationBadge from '@/components/ui/NotificationBadge'
import LogoSvg from '@/components/svg/LogoSvg'
import { useResize } from '@/components/hooks/useResize'

interface IMenuOption { link: string, label: string, badge?: number | null }
interface Props {
  isSticky?: boolean
  restProps?: any
}

const MenuItem = (props: IMenuOption) => {
  const isActive = useIsActiveLink(props.link ?? '')
  return (<Link className={classNames(styles.link, { [styles.active]: isActive })} href={props.link}>
    {props.label}
    {(props.badge ?? 0) > 0 && <NotificationBadge color={'blue'} total={props.badge!} />}
  </Link>)
}


const HeaderInner = forwardRef<HTMLDivElement, Props & { style?: any, distanceFromTop?: number }>((props, ref) => {
  const appContext = useAppContext()

  const menu: IMenuOption[] = [
    { link: '/landing/#how-it-works', label: 'Как работает' },
    { link: '/landing/#benefits', label: 'Выгоды' },
    { link: '/landing/#advantages', label: 'Приемущества' },
    { link: '/landing/#how-to-connects', label: 'Как подключиться' },
    { link: '/landing/#roadmap', label: 'Roadmap' },
    { link: '/landing/#contacts', label: 'Контакты' },
  ]

  const handleOpenMobileMenu = () => {

    appContext.showModal(ModalType.MobileMenu)
  }

  const handleCloseMobileMenu = () => {

    appContext.hideModal()
  }

  const { isSmDesktopWidth, isTabletWidth, isPhoneWidth } = useResize()

  return (
    <div className={styles.root} ref={ref} style={props.style} {...(props.restProps ?? {})} id={'header'}>
      <div className={classNames(styles.container,
        { [styles.landingContainer]: isSmDesktopWidth && !isPhoneWidth })}>
        <div className={styles.left}>
          <Link href={'/'}>
            <LogoSvg className={styles.logo} colorFirst={colors.yellow500} colorSecond={colors.white} />
          </Link>
          <div className={styles.info}>
            Онлайн-сервис продажи и покупки лома
          </div>
        </div>
        <div className={classNames(styles.middle,
          { [styles.landingMiddle]: isTabletWidth })}>
          {menu.map((i, index) =>
            <MenuItem key={index} link={i.link} label={i.label} badge={i.badge ?? 0} />
          )}
        </div>
        <HiddenXs>
          <Button href={Routes.registration} className={styles.landingBtn} styleType='large' color='blue'>
            Купить/Продать лом
          </Button>
        </HiddenXs>
        <div className={styles.mobile}>
          {appContext.modal === ModalType.MobileMenu ?
            <div className={styles.menu} onClick={handleCloseMobileMenu}>
              <CloseSvg color={colors.white} />
            </div>
            :
            <div className={styles.menu} onClick={handleOpenMobileMenu}>
              <MenuSvg color={colors.white} />
            </div>
          }
        </div>
      </div>
    </div>
  )

})

HeaderInner.displayName = 'HeaderInner'
export default function HeaderLanding(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({ style, isSticky, ...rest }) => <HeaderInner {...props} restProps={rest} style={style} />}</Sticky>
  } else {
    return <HeaderInner {...props} />
  }
}
