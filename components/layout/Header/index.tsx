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
import { Routes } from '@/types/routes'
import { UserRole } from '@/data/enum/UserRole'
import IconButton from '@/components/ui/IconButton'
import ChatSvg from '@/components/svg/ChatSvg'
import BookmarkSvg from '@/components/svg/BookmarkSvg'
import ProfileMenu from '@/components/layout/Header/ProfileMenu'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'
import classNames from 'classnames'
import { useNotificationContext } from '@/context/notifications_state'
import { NotificationType } from '@/data/interfaces/INotification'
import NotificationBadge from '@/components/ui/NotificationBadge'
import GraphSvg from '@/components/svg/GraphSvg'
import LogoSvg from '@/components/svg/LogoSvg'
import UserUtils from '@/utils/UserUtils'
import Formatter from '@/utils/formatter'
import { useRouter } from 'next/router'

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
  const notifyContext = useNotificationContext()
  const appContext = useAppContext()
  const router = useRouter()
  const badgeDealOffers = notifyContext.getTotalByTypes([
    NotificationType.DealOfferRejected,
    NotificationType.DealOfferAccepted
  ])
  const badgeSaleRequests = notifyContext.getTotalByTypes([
    NotificationType.SaleRequestAccepted,
    NotificationType.SaleRequestRejected,
    NotificationType.NewDealOffer,
  ])
  const badgeDeals = notifyContext.getTotalByTypes([
    NotificationType.DealSetUp,
    NotificationType.DealWeighed,
    NotificationType.DealTerminatedByBuyer,
    NotificationType.DealTerminatedBySeller,
    NotificationType.DealWeighingAccepted,
    NotificationType.DealPaid
  ])
  const badgeChat = notifyContext.getTotalByTypes([
    NotificationType.ChatMessage
  ])
  const menuNotAuth: IMenuOption[] = [
    { link: Routes.receivingPoints, label: 'Пункты приёма лома' },
    { link: Routes.saleRequests, label: 'Лом на продажу' },

  ]

  const menuLanding: IMenuOption[] = [
    { link: '/landing/#how-it-works', label: 'Как работает' },
    { link: '/landing/#benefits', label: 'Выгоды' },
    { link: '/landing/#advantages', label: 'Приемущества' },
    { link: '/landing/#how-to-connects', label: 'Как подключиться' },
    { link: '/landing/#roadmap', label: 'Roadmap' },
    { link: '/landing/#contacts', label: 'Контакты' },
  ]

  const menuAuth: IMenuOption[] = appContext.aboutMe?.role === UserRole.Seller ? [
    { link: Routes.receivingPoints, label: 'Пункты приёма лома' },
    { link: Routes.lkSaleRequests, label: 'Мои заявки на продажу', badge: badgeSaleRequests },
    { link: Routes.lkDeals, label: 'Сделки', badge: badgeDeals },
  ] : [
    { link: Routes.saleRequests, label: 'Лом на продажу' },
    { link: Routes.lkDealOffers, label: 'Предложения лома', badge: badgeDealOffers },
    { link: Routes.lkDeals, label: 'Сделки', badge: badgeDeals },
  ]

  const handleOpenMobileMenu = () => {

    appContext.showModal(ModalType.MobileMenu)
  }

  const handleCloseMobileMenu = () => {

    appContext.hideModal()
  }

  return (
    <div className={styles.root} ref={ref} style={props.style} {...(props.restProps ?? {})} id={'header'}>
      {appContext.tokenData?.impersonate && <div className={styles.impersonate}>
        Вы вошли как {appContext.tokenData?.role === UserRole.Buyer ? `Покупатель ${UserUtils.getEmployeeRoleName(appContext.tokenData.employeeRole)} ${appContext.tokenData?.email}` : `Продавец ${Formatter.formatPhone(appContext.tokenData.phone)}`}
      </div>}
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href={'/'}>
            <LogoSvg className={styles.logo} colorFirst={colors.yellow500} colorSecond={colors.white} />
          </Link>
          <div className={styles.info}>
            Онлайн-сервис продажи и покупки лома
          </div>
        </div>
        <div className={styles.middle}>
          {(!router.asPath.includes(Routes.landing)
            ? (appContext.isLogged ? menuAuth : menuNotAuth) : menuLanding).map((i, index) =>
              <MenuItem key={index} link={i.link} label={i.label} badge={i.badge ?? 0} />
            )}
        </div>
        <HiddenXs>
          <>
            {!router.asPath.includes(Routes.landing) && <div className={styles.right}>
              {appContext.isLogged && <div className={styles.userButtons}>
                <IconButton href={Routes.lkChat()} bgColor={'dark400'} badge={<NotificationBadge className={styles.badgeOnIcon} color={'blue'} total={badgeChat} />}><ChatSvg color={colors.white} /></IconButton>
                {appContext.aboutMe?.role === UserRole.Seller && <IconButton href={Routes.lkFavorites} bgColor={'dark400'}><BookmarkSvg color={colors.white} /></IconButton>}
                {appContext.aboutMe?.role === UserRole.Buyer && <IconButton href={Routes.lkCrmMain} bgColor={'dark400'}><GraphSvg color={colors.white} /></IconButton>}
                <ProfileMenu />
              </div>}
              {appContext.isLogged && appContext.aboutMe?.role === UserRole.Buyer &&
                <Button href={Routes.saleRequests} className={styles.btn} styleType='large' color='blue'>
                  Купить лом
                </Button>}
              {appContext.isLogged && appContext.aboutMe?.role === UserRole.Seller &&
                <Button href={Routes.lkSaleRequestCreate} className={styles.btn} styleType='large' color='blue'>
                  Продать лом
                </Button>}
              {!appContext.isLogged && <>
                <Button href={Routes.login()} className={styles.btn} styleType='large' color='dark'>
                  <UserSvg color={colors.white} />
                  <div>Войти</div>
                </Button>
                <Button href={Routes.registration} className={styles.btn} styleType='large' color='blue'>
                  Зарегистрироваться
                </Button>
              </>}
            </div>}
            {router.asPath.includes(Routes.landing) &&
              <Button href={Routes.registration} className={styles.btn} styleType='large' color='blue'>
                Купить/Продать лом
              </Button>
            }
          </>
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
export default function Header(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({ style, isSticky, ...rest }) => <HeaderInner {...props} restProps={rest} style={style} />}</Sticky>
  } else {
    return <HeaderInner {...props} />
  }
}
