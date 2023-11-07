import { MouseEventHandler, useRef } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import IconButton from '@/components/ui/IconButton'
import UserSvg from '@/components/svg/UserSvg'
import { colors } from '@/styles/variables'
import { useAppContext } from '@/context/state'
import { useRouter } from 'next/router'
import { UserRole } from '@/data/enum/UserRole'
import SettingsSvg from '@/components/svg/SettingsSvg'
import MapsSvg from '@/components/svg/MapsSvg'
import UsersSvg from '@/components/svg/UsersSvg'
import CashSvg from '@/components/svg/CashSvg'
import LogoutSvg from '@/components/svg/LogoutSvg'
import {Routes} from '@/types/routes'
import {SITE_NAME} from '@/types/constants'
import GraphSvg from '@/components/svg/GraphSvg'

interface Option {
  label: string
}

interface Props {
  className?: string
}

enum ActionType {
  Profile,
  Employees,
  Payment,
  ReceivingPoints,
  Crm,
  Logout
}

export default function ProfileMenu(props: Props) {
  const appContext = useAppContext()
  const dropdownRef = useRef(null)
  const router = useRouter()

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

  const options = appContext.aboutMe?.role === UserRole.Seller ? [
    { icon: <SettingsSvg color={colors.white} />, label: 'Настройки профиля', key: ActionType.Profile },
    { icon: <LogoutSvg color={colors.white} />, label: 'Выйти', key: ActionType.Logout },
  ] :
    [
      { icon: <SettingsSvg color={colors.white} />, label: 'Настройки профиля', key: ActionType.Profile },
      { icon: <MapsSvg color={colors.white} />, label: 'Мои пункты приема', key: ActionType.ReceivingPoints },
      { icon: <GraphSvg color={colors.white} />, label: 'Статистика', key: ActionType.Crm },
      { icon: <UsersSvg color={colors.white} />, label: 'Сотрудники', key: ActionType.Employees },
      { icon: <CashSvg color={colors.white} />, label: `Оплата сервиса ${SITE_NAME}`, key: ActionType.Payment },
      { icon: <LogoutSvg color={colors.white} />, label: 'Выйти', key: ActionType.Logout },
    ]

  const handleClickItem = (e: React.MouseEvent<HTMLAnchorElement>, item: { key: ActionType }) => {
    e.preventDefault()
    switch (item.key) {
      case ActionType.Profile:
        router.push(Routes.lkProfileSettings)
        break
      case ActionType.Employees:
        router.push(Routes.lkEmployees)
        break
      case ActionType.Payment:
        router.push(Routes.lkPayment)
        break
      case ActionType.ReceivingPoints:
        router.push(Routes.lkReceivingPoints)
        break
      case ActionType.Crm:
        router.push(Routes.lkCrmMain)
        break
      case ActionType.Logout:
        setTimeout(() => appContext.logout(), 100)
        router.push(Routes.index)
        break
    }
    setIsActive(false)
  }

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <div onClick={handleClick} className={styles.dropDownTrigger}>
        <IconButton bgColor={'dark400'}><UserSvg color={colors.white} /></IconButton>
      </div>
      <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        {options.slice(0, options.length - 1).map((item, index) => <a key={item.key} className={styles.option} onClick={e => handleClickItem(e, item)}>
          {item.icon}<div className={styles.label}>{item.label}</div>
        </a>)}
        <div className={styles.wrapper}>
          <div className={styles.separator} />
        </div>
        {options.slice(options.length - 1).map((item, index) => <a key={item.key} className={styles.option} onClick={e => handleClickItem(e, item)}>
          {item.icon}<div className={styles.label}>{item.label}</div>
        </a>)}
      </nav>
    </div>
  )
}
