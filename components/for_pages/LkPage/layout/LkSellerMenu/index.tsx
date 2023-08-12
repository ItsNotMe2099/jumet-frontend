import LogoutSvg from '@/components/svg/LogoutSvg'
import {colors} from '@/styles/variables'
import {Routes} from '@/types/routes'
import LkMenu from '@/components/for_pages/LkPage/layout/LkMenu'

enum MenuItemType {
  Exit = 'exit',
}

interface Props {
}

export default function LkSellerMenu(props: Props) {
  return (<LkMenu<MenuItemType> items={[
    {name: 'Настройки профиля',  link: Routes.lkProfileSettings},
    {name: 'Мои представителя',  link: Routes.lkMyRepresentatives},
    {name: 'Выход', key: MenuItemType.Exit, icon: <LogoutSvg color={colors.dark500}/>},
  ]}/>)
}
