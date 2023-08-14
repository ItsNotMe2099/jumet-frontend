import {Routes} from '@/types/routes'
import LkMenu from '@/components/for_pages/LkPage/layout/LkMenu'

enum MenuItemType {
  ReceivingPoints = 'receivingPoints',
}

interface Props {
}

export default function LkStatsMenu(props: Props) {
  return (<LkMenu<MenuItemType> items={[
    { name: 'Обзор', link: Routes.lkCrm },
    { name: 'Сделки', link: Routes.lkCrmDeals },
    { name: 'Пункты приёма ', link: Routes.lkCrmReceivingPoints, key: MenuItemType.ReceivingPoints, },
    { name: 'Клиенты', link: Routes.lkCrmClients },
  ]}/>)
}
