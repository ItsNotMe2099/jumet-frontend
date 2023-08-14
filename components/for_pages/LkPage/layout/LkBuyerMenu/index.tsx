import LogoutSvg from '@/components/svg/LogoutSvg'
import {colors} from '@/styles/variables'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import {Routes} from '@/types/routes'
import LkMenu from '@/components/for_pages/LkPage/layout/LkMenu'
import {ReceivingPointListWrapper, useReceivingPointListContext} from '@/context/receiving_point_list_state'

enum MenuItemType {
  Exit = 'exit',
  ReceivingPoints = 'receivingPoints',
}


interface Props {
}

const LkBuyerMenuInner = (props: Props)  => {
  const receivingListContext = useReceivingPointListContext()

  return (<LkMenu<MenuItemType> items={[
    {name: 'Настройки профиля', link: Routes.lkProfileSettings},
    {
      icon: <ChevronDownSvg color={colors.dark500}/>,
      name: 'Мои пункты приема',
      link: Routes.lkReceivingPoints,
      key: MenuItemType.ReceivingPoints,
      children: receivingListContext.items?.map((i) => (
        {
          name: i.name!, children: [
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
  ]} excludeFromMobileNested={[MenuItemType.ReceivingPoints]}/>)
}

export default function LkBuyerMenu(props: Props) {
  return (<ReceivingPointListWrapper>
    <LkBuyerMenuInner/>
  </ReceivingPointListWrapper>)
}