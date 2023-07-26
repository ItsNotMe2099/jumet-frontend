import {useAppContext} from '@/context/state'
import styles from './index.module.scss'
import LogoutSvg from '@/components/svg/LogoutSvg'
import {colors} from '@/styles/variables'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'
import LkMenuItem from '@/components/for_pages/LkPage/layout/LkMenuItem'
import {IMenuItem} from '@/types/types'

enum MenuItemType {
  Exit = 'exit'
}


interface Props {
  children: React.ReactNode
  myPointsOpen?: boolean
  className?: string
}

export default function LkMenuSeller(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()

  const handleExit = () => {
    setTimeout(() => appContext.logout(), 100)
    router.push('/')
  }

  const items: IMenuItem<MenuItemType>[] = [
    {name: 'Настройки профиля',  link: Routes.lkProfileSettings},
    {name: 'Мои представителя',  link: Routes.lkMyRepresentatives},
    {name: 'Выход', key: MenuItemType.Exit, icon: <LogoutSvg color={colors.dark500}/>},
  ]


  return (

    <div className={styles.root}>
      {items.map((i, index) =>
        <LkMenuItem href={i.link}
                    onClick={i.key === MenuItemType.Exit ? handleExit : null}>{i.name}</LkMenuItem>)}
    </div>
  )
}
