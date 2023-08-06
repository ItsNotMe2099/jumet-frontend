import {useAppContext} from '@/context/state'
import styles from './index.module.scss'
import classNames from 'classnames'
import LogoutSvg from '@/components/svg/LogoutSvg'
import {colors} from '@/styles/variables'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import {IMenuItem} from '@/types/types'
import MenuVertical from '@/components/for_pages/Common/MenuVertical'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {UserRole} from '@/data/enum/UserRole'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import MenuHorizontal from '@/components/for_pages/Common/MenuHorizontal'
import {useMemo} from 'react'

enum MenuItemType {
  Exit = 'exit',
  ReceivingPoints = 'receivingPoints',
}


interface Props {
  className?: string
  receivingPoints: IReceivingPoint[]
}

export default function LkMenu(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

  const items: IMenuItem<MenuItemType>[] = appContext.aboutMe?.role === UserRole.Buyer ? [
    {name: 'Настройки профиля', link: Routes.lkProfileSettings},
    {
      icon: <ChevronDownSvg color={colors.dark500}/>,
      name: 'Мои пункты приема',
      link: Routes.lkReceivingPoints,
      key: MenuItemType.ReceivingPoints,
      children: props.receivingPoints?.map((i) => (
        {name: i.name!,  children: [
            {name: 'Информация о пункте приема', link: Routes.lkReceivingPointInfo(i.id)},
            {name: 'Сотрудники пункта приёма', link: Routes.lkReceivingPointEmployees(i.id)},
            {name: 'Отзывы о пункте приёма', link: Routes.lkReceivingPointReviews(i.id)},
            {name: 'Статистика пункта приёма', link: Routes.lkReceivingPointStat(i.id)},
          ]
        }
      )) ?? []
    },
    {name: 'Сотрудники', link: Routes.lkEmployees},
    {name: 'Оплата сервиса Jumet', link: Routes.lkPayment},
    {name: 'Выход', key: MenuItemType.Exit, icon: <LogoutSvg color={colors.dark500}/>},
  ] : [
    {name: 'Настройки профиля',  link: Routes.lkProfileSettings},
    {name: 'Мои представителя',  link: Routes.lkMyRepresentatives},
    {name: 'Выход', key: MenuItemType.Exit, icon: <LogoutSvg color={colors.dark500}/>},
  ]

  const handleExit = () => {
    setTimeout(() => appContext.logout(), 100)
    router.push('/')
  }

  const mobileItems = useMemo<IMenuItem<MenuItemType>[]>(() => {
    const initialPath = (router.asPath ?? '').replace('/', '') ?? ''

    const nestedFind = (pred: (value: IMenuItem<MenuItemType> | null) => boolean) => (xs: IMenuItem<MenuItemType>[]): IMenuItem<MenuItemType> | null =>
      xs.reduce (
        (res, x) => res ? res : pred(x) ? x : nestedFind (pred) (x.children || []),
        null as IMenuItem<MenuItemType> | null
      )

    const findById = (): IMenuItem<MenuItemType> | null =>
      nestedFind ((item) =>{
        console.log('Check', item?.link, item?.children?.map(i => i.link?.replace('/', '')))
        return item?.key !== MenuItemType.ReceivingPoints && !!(item?.children ?? [])?.find((i) => initialPath.includes((i.link ?? '').replace('/', '')))
      })(items)

    const finded = findById()
    return finded?.key !== MenuItemType.ReceivingPoints ? finded?.children ?? items : items

  }, [router.asPath])

  return (
    <div className={classNames(styles.root, props.className)}>
        <HiddenXs>
          <MenuVertical items={items} onClick={() => null}/>
        </HiddenXs>
        <VisibleXs>
          <MenuHorizontal items={mobileItems}/>
        </VisibleXs>
    </div>
  )
}
