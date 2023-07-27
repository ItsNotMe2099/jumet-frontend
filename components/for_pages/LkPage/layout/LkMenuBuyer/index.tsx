import {useAppContext} from '@/context/state'
import styles from './index.module.scss'
import classNames from 'classnames'
import {UserRole} from '@/data/enum/UserRole'
import {ProfileMenuSettings} from '@/types/enums'
import LogoutSvg from '@/components/svg/LogoutSvg'
import {colors} from '@/styles/variables'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import PlusSvg from '@/components/svg/PlusSvg'
import {useState} from 'react'
import {points} from '@/data/temp/points'
import {Routes} from '@/types/routes'
import Accordion from '@/components/for_pages/LkPage/Accordion'


interface Props {
  children: React.ReactNode
  myPointsOpen?: boolean
  className?: string
}

export default function LkLayout(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

  const handleExit = () => {
    setTimeout(() => appContext.logout(), 100)
    router.push('/')
  }

  const items = appContext.aboutMe?.role === UserRole.Seller ? [
      {text: 'Настройки профиля', value: ProfileMenuSettings.Settings, link: Routes.lkProfileSettings},
      {icon: <LogoutSvg color={colors.dark500}/>, text: 'Выйти', value: 'exit', link: ''},
    ] :
    [
      {text: 'Настройки профиля', value: ProfileMenuSettings.Settings, link: Routes.lkProfileSettings},
      {
        icon: <ChevronDownSvg color={colors.dark500}/>,
        text: 'Мои пункты приема',
        value: ProfileMenuSettings.ReceivingPoints,
        link: Routes.lkReceivingPoints
      },
      {text: 'Сотрудники', value: ProfileMenuSettings.Employees, link: Routes.lkEmployees},
      {text: 'Оплата сервиса Jumet', value: ProfileMenuSettings.Payment, link: Routes.lkPayment},
      {icon: <LogoutSvg color={colors.dark500}/>, text: 'Выйти', value: 'exit', link: ''},
    ]

  const getTitle = (path: string) => {
    switch (path) {
      case `/lk/${ProfileMenuSettings.Settings}`:
        return 'Настройки профиля'
      case `/lk/${ProfileMenuSettings.ReceivingPoints}`:
        return 'Мои пункты приема'
      case `/lk/${ProfileMenuSettings.Employees}`:
        return 'Сотрудники'
      case `/lk/${ProfileMenuSettings.Payment}`:
        return 'Оплата сервиса Jumet'
    }
  }

  enum RPOptions {
    Info = 'info',
    Employees = 'employees',
    Reviews = 'reviews',
    Statistic = 'statistic'
  }

  const itemsInReceivingPoint = [
    {text: 'Информация о пункте приема', value: RPOptions.Info},
    {text: 'Сотрудники пункта приёма', value: RPOptions.Employees},
    {text: 'Отзывы о пункте приёма', value: RPOptions.Reviews},
    {text: 'Статистика пункта приёма', value: RPOptions.Statistic},
  ]

  const [myPointsOpen, setMyPointsOpen] = useState<boolean>(props.myPointsOpen as boolean)

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.title}>
        <div className={styles.text}>{getTitle(router.asPath)}</div>
        {router.asPath === `/lk/${ProfileMenuSettings.Employees}` &&
          <Button className={styles.btn} color='blue' styleType='large' icon={<PlusSvg color={colors.white}/>}>
            Добавить сотрудника
          </Button>}
        {router.asPath === `/lk/${ProfileMenuSettings.ReceivingPoints}` &&
          <Button className={styles.btn} color='blue' styleType='large' icon={<PlusSvg color={colors.white}/>}>
            Добавить пункт приёма
          </Button>}
      </div>
      <div className={styles.container}>
        <div className={styles.menu}>
          {items.map((i, index) =>
            i.value !== 'exit' ?
              <Link
                href={i.link}
                onClick={() => i.value !== 'exit' ? null : handleExit()}
                key={index}
                className={classNames(styles.option, {
                  [styles.accordion]: i.value === ProfileMenuSettings.ReceivingPoints,
                  [styles.active]: (router.asPath.includes(ProfileMenuSettings.ReceivingPoints) &&
                    i.link.includes(ProfileMenuSettings.ReceivingPoints)) || (router.asPath === i.link),
                  [styles.receiving]: router.asPath.includes(ProfileMenuSettings.ReceivingPoints) && myPointsOpen
                })}>
                {i.value === ProfileMenuSettings.ReceivingPoints ?
                  <Accordion
                    onOpen={() => setMyPointsOpen(true)}
                    icon={i.icon}
                    text={i.text}
                    link={`/lk/${ProfileMenuSettings.ReceivingPoints}`}
                    open={router.asPath.includes(ProfileMenuSettings.ReceivingPoints) && myPointsOpen}
                  >{points.data.map((i, index) =>
                    <Accordion
                      key={index}
                      icon={<ChevronDownSvg color={colors.dark500}/>}
                      text={i.address}
                      open={router.asPath.includes(`/lk/${ProfileMenuSettings.ReceivingPoints}/${i.id}`)}
                      link={`/lk/${ProfileMenuSettings.ReceivingPoints}/${i.id}/info`}
                    >
                      {itemsInReceivingPoint.map((item, index) =>
                        <Link
                          className={classNames(styles.item, {
                            [styles.activeItem]: router.asPath === `/lk/${ProfileMenuSettings.ReceivingPoints}/${i.id}/${item.value}`,
                            [styles.receiving]: router.asPath.includes(ProfileMenuSettings.ReceivingPoints)
                          })}
                          key={index}
                          href={`/lk/${ProfileMenuSettings.ReceivingPoints}/${i.id}/${item.value}`}
                        >
                          <span>{item.text}</span>
                        </Link>
                      )}
                    </Accordion>
                  )}</Accordion> : <span>{i.text}</span>}
              </Link>
              :
              <div onClick={handleExit} className={styles.option}><span>{i.text}</span></div>
          )}
        </div>
        {router.asPath === `/lk/${ProfileMenuSettings.Employees}` &&
          <Button className={styles.btnMobile} color='blue' styleType='large' icon={<PlusSvg color={colors.white}/>}>
            Добавить сотрудника
          </Button>}
        {router.asPath === `/lk/${ProfileMenuSettings.ReceivingPoints}` &&
          <Button className={styles.btnMobile} color='blue' styleType='large' icon={<PlusSvg color={colors.white}/>}>
            Добавить пункт приёма
          </Button>}
        <div className={styles.content}>
          {props.children}
        </div>
      </div>
    </div>
  )
}
