import LogoutSvg from '@/components/svg/LogoutSvg'
import {colors} from '@/styles/variables'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import {Routes} from '@/types/routes'
import LkMenu from '@/components/for_pages/LkPage/layout/LkMenu'
import { useReceivingPointListContext} from '@/context/receiving_point_list_state'
import {SITE_NAME} from '@/types/constants'
import {useMemo} from 'react'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {useAppContext} from '@/context/state'

enum MenuItemType {
  Exit = 'exit',
  ReceivingPoints = 'receivingPoints',
}


interface Props {
}

const LkBuyerMenuInner = (props: Props)  => {
  const appContext = useAppContext()
  const receivingListContext = useReceivingPointListContext()
  const byCities = useMemo<{city: string, receivingPoints: IReceivingPoint[]}[]>(() => {
      const cities = [...new Set(receivingListContext.items.filter(i => !!i.address?.city).map(i => i.address?.city))]
      return cities.map(city => ({city: city!, receivingPoints: receivingListContext.items.filter(i => i.address?.city === city)}))
  }, [receivingListContext.items])

  return (<LkMenu<MenuItemType> items={[
    {name: 'Настройки профиля', link: Routes.lkProfileSettings},
    {
      icon: <ChevronDownSvg color={colors.dark500}/>,
      name: 'Мои пункты приема',
      link: Routes.lkReceivingPoints,
      key: MenuItemType.ReceivingPoints,
      children: appContext.isDesktop ? byCities.map(i => ({
        name: i.city,
        children: i.receivingPoints.map(i => ({
          name: (`${[i.address.street, i.address.house].filter(i => !!i).join(', ') || i.address?.address}`), children: [
            {name: 'Информация о пункте приема', link: Routes.lkReceivingPointInfo(i.id)},
            {name: 'Сотрудники пункта приёма', link: Routes.lkReceivingPointEmployees(i.id)},
            {name: 'Отзывы о пункте приёма', link: Routes.lkReceivingPointReviews(i.id)},
            {name: 'Статистика пункта приёма', link: Routes.lkReceivingPointStat(i.id)},
          ]}))
      })) : receivingListContext.items.map(i => ({
        name: i.name, children: [
          {name: 'Информация о пункте приема', link: Routes.lkReceivingPointInfo(i.id)},
          {name: 'Сотрудники пункта приёма', link: Routes.lkReceivingPointEmployees(i.id)},
          {name: 'Отзывы о пункте приёма', link: Routes.lkReceivingPointReviews(i.id)},
          {name: 'Статистика пункта приёма', link: Routes.lkReceivingPointStat(i.id)},
        ]})),
    },
    {name: 'Сотрудники', link: Routes.lkEmployees},
    {name: 'Статистика', link: Routes.lkCrmMain},
    {name: `Оплата сервиса ${SITE_NAME}`, link: Routes.lkPayment},
    {name: 'API', link: Routes.lkApiSettings},

    {name: 'Выход', key: MenuItemType.Exit, icon: <LogoutSvg color={colors.dark500}/>},
  ]} excludeFromMobileNested={[MenuItemType.ReceivingPoints]}/>)
}

export default function LkBuyerMenu(props: Props) {
  return ( <LkBuyerMenuInner/>)
}
