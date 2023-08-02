import {useAppContext} from '@/context/state'
import styles from './index.module.scss'
import classNames from 'classnames'
import {ProfileMenuSettings} from '@/types/enums'
import LogoutSvg from '@/components/svg/LogoutSvg'
import {colors} from '@/styles/variables'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import {useRouter} from 'next/router'
import Button from '@/components/ui/Button'
import PlusSvg from '@/components/svg/PlusSvg'
import {Routes} from '@/types/routes'
import {IMenuItem} from '@/types/types'
import MenuVertical from '@/components/for_pages/Common/MenuVertical'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
enum MenuItemType {
  Exit = 'exit'
}


interface Props {
  className?: string
  receivingPoints: IReceivingPoint[]
}

export default function LkMenuBuyer(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

  const items: IMenuItem<MenuItemType>[] = [
    {name: 'Настройки профиля',  link: Routes.lkProfileSettings},
    {
      icon: <ChevronDownSvg color={colors.dark500}/>,
      name: 'Мои пункты приема',
      link: Routes.lkReceivingPoints,
      children: props.receivingPoints?.map( (i) => ({name: i.name!, link: Routes.lkReceivingPointEdtInfo(i.id)})) ?? []
    },
    {name: 'Сотрудники',  link: Routes.lkEmployees},
    {name: 'Оплата сервиса Jumet', link: Routes.lkPayment},
    {name: 'Выход', key: MenuItemType.Exit, icon: <LogoutSvg color={colors.dark500}/>},
  ]
  const handleExit = () => {
    setTimeout(() => appContext.logout(), 100)
    router.push('/')
  }


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
           <MenuVertical items={items} onClick={() => null}/>
        </div>
        {router.asPath === `/lk/${ProfileMenuSettings.Employees}` &&
          <Button className={styles.btnMobile} color='blue' styleType='large' icon={<PlusSvg color={colors.white}/>}>
            Добавить сотрудника
          </Button>}
        {router.asPath === `/lk/${ProfileMenuSettings.ReceivingPoints}` &&
          <Button className={styles.btnMobile} color='blue' styleType='large' icon={<PlusSvg color={colors.white}/>}>
            Добавить пункт приёма
          </Button>}
      </div>
    </div>
  )
}
