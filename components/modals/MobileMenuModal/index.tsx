import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {colors} from 'styles/variables'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import Link from 'next/link'
import SettingsSvg from '@/components/svg/SettingsSvg'
import CashSvg from '@/components/svg/CashSvg'
import LogoutSvg from '@/components/svg/LogoutSvg'
import {Routes} from '@/types/routes'
import {UserRole} from '@/data/enum/UserRole'
import {NotificationType} from '@/data/interfaces/INotification'
import {useNotificationContext} from '@/context/notifications_state'
import MapsSvg from '@/components/svg/MapsSvg'
import UsersSvg from '@/components/svg/UsersSvg'
import SaleSvg from '@/components/svg/SaleSvg'
import DealSvg from '@/components/svg/DealSvg'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'
import LoginSvg from '@/components/svg/LoginSvg'
import {useRouter} from 'next/router'
import {Nullable} from '@/types/types'
import UserSvg from '@/components/svg/UserSvg'
import classNames from 'classnames'
import GraphSvg from '@/components/svg/GraphSvg'

enum MenuKey {
  Logout = 'logout'
}

enum MenuIcon {
  Deal = 'deal',
  Map = 'map',
  Sale = 'sale',
  Settings = 'settings',
  Users = 'users',
  User = 'user',
  Cash = 'cash',
  Logout = 'logout',
  Login = 'login',
  Graph = 'graph'

}

interface IMenuOption {
  link: string,
  label: string,
  badge?: number | null,
  icon?: Nullable<MenuIcon>,
  key?: MenuKey
}

const MenuItem = (props: IMenuOption & { onClick: () => void }) => {

  const isActive = useIsActiveLink(props.link ?? '#')
  const iconColor = isActive ? colors.yellow500 : colors.white
  const getIcon = () => {
    switch (props.icon) {
      case MenuIcon.Login:
        return <LoginSvg color={iconColor}/>

      case MenuIcon.Cash:
        return <CashSvg color={iconColor}/>

      case MenuIcon.Settings:
        return <SettingsSvg color={iconColor}/>
      case MenuIcon.Deal:
        return <DealSvg color={iconColor}/>
      case MenuIcon.Logout:
        return <LogoutSvg color={iconColor}/>
      case MenuIcon.Sale:
        return <SaleSvg color={iconColor}/>
      case MenuIcon.Users:
        return <UsersSvg color={iconColor}/>
      case MenuIcon.User:
        return <UserSvg color={iconColor}/>
      case MenuIcon.Map:
        return <MapsSvg color={iconColor}/>
      case MenuIcon.Graph:
        return <GraphSvg color={iconColor}/>

    }
  }
  const content = (<><span>{getIcon()}</span>{props.label}</>)
  if (props.link) {
    return (<Link className={classNames(styles.linkWithIcon, {[styles.active]: isActive})} href={props.link} onClick={props.onClick}>
      {content}
    </Link>)
  } else {
    return (<div className={styles.linkWithIcon} onClick={props.onClick}>
      {content}
    </div>)
  }

}

interface Props {
  isBottomSheet?: boolean
}


const MobileMenuModalInner = (props: Props) => {
  const appContext = useAppContext()
  const notifyContext = useNotificationContext()
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
  const header = (<div/>)

  const menuNotAuth: IMenuOption[] = [
    {link: Routes.receivingPoints, label: 'Пункты приёма лома', icon: MenuIcon.Map},
    {link: Routes.saleRequests, label: 'Лом на продажу', icon: MenuIcon.Sale},
    {link: Routes.login(), label: 'Войти', icon: MenuIcon.Login},
    {link: Routes.registration, label: 'Зарегистрироваться', icon: MenuIcon.Users}
  ]


  const menuLanding: IMenuOption[] = [
    { link: '/landing/#how-it-works', label: 'Как работает' },
    { link: '/landing/#benefits', label: 'Выгоды' },
    { link: '/landing/#advantages', label: 'Приемущества' },
    { link: '/landing/#how-to-connects', label: 'Как подключиться' },
    { link: '/landing/#roadmap', label: 'Roadmap' },
    { link: '/landing/#contacts', label: 'Контакты' },
  ]

  const menuMainAuth: IMenuOption[] = [...(appContext.aboutMe?.role === UserRole.Seller ? [
    {link: Routes.receivingPoints, label: 'Пункты приёма лома', icon: MenuIcon.Map},
    {link: Routes.lkSaleRequests, label: 'Мои заявки на продажу', icon: MenuIcon.Sale, badge: badgeSaleRequests},
    {link: Routes.lkDeals, label: 'Сделки', icon: MenuIcon.Deal, badge: badgeDeals},
  ] : [
    {link: Routes.saleRequests, label: 'Лом на продажу'},
    {link: Routes.lkDealOffers, label: 'Предложения лома', badge: badgeDealOffers},
    {link: Routes.lkDeals, label: 'Сделки', badge: badgeDeals},
  ])
  ]
  const menuProfile = [
    {link: Routes.lkProfileSettings, label: 'Настройки профиля', icon: MenuIcon.Settings},

    ...(appContext.aboutMe?.role === UserRole.Seller ? [
      {link: Routes.lkMyPassportData, label: 'Паспортные данные', icon: MenuIcon.User},
      {link: Routes.lkMyRepresentatives, label: 'Доверители', icon: MenuIcon.Users},
    ] : [
      {link: Routes.lkReceivingPoints, label: 'Мои пункты приема', icon: MenuIcon.Map},
      {link: Routes.lkCrmMain, label: 'Статистика', icon: MenuIcon.Graph},
      {link: Routes.lkEmployees, label: 'Сотрудники', icon: MenuIcon.Users},
      {link: Routes.lkPayment, label: 'Оплата сервиса', icon: MenuIcon.Cash},
    ]),
  ]

  const menuLogout = [
    {link: '', label: 'Выйти', icon: MenuIcon.Logout, key: MenuKey.Logout},

  ]
  const handleClick = (item: IMenuOption) => {
    if (item.key === MenuKey.Logout) {
      appContext.logout()
      router.push(Routes.index)
    }

    appContext.hideModal()
  }

  const menuGroups = !router.asPath.includes(Routes.landing) ? 
  (appContext.isLogged ? [menuMainAuth, menuProfile, menuLogout] : [menuNotAuth]) : [menuLanding]

  return (
    <ModalLayout className={styles.modalLayout}>
      {menuGroups.map((group, index) => <>
        {index !== 0 && index <= menuGroups.length - 1 && <div className={styles.sep}/>}
        {group.map((a) => <MenuItem link={a.link} label={a.label} icon={a.icon ?? null}
                                    onClick={() => handleClick(a)}/>)}
      </>)}
    </ModalLayout>
  )
}

export default function MobileMenuModal(props: Props) {
  return (<>
    <MobileMenuModalInner {...props} />
  </>)
}
