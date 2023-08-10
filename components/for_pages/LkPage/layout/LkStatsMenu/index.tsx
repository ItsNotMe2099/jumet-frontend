import { useAppContext } from '@/context/state'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Routes } from '@/types/routes'
import { IMenuItem } from '@/types/types'
import MenuVertical from '@/components/for_pages/Common/MenuVertical'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import MenuHorizontal from '@/components/for_pages/Common/MenuHorizontal'
import { useMemo } from 'react'


interface Props {
  className?: string
}

enum MenuItemType {
  ReceivingPoints = 'receivingPoints',
}

export default function LkStatsMenu(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

  const items: IMenuItem<MenuItemType>[] = [
    { name: 'Обзор', link: Routes.lkCrm },
    { name: 'Сделки', link: Routes.lkCrmDeals },
    { name: 'Пункты приёма ', link: Routes.lkCrmReceivingPoints, key: MenuItemType.ReceivingPoints, },
    { name: 'Клиенты', link: Routes.lkCrmClients },
  ]

  const handleExit = () => {
    setTimeout(() => appContext.logout(), 100)
    router.push('/')
  }

  const mobileItems = useMemo<IMenuItem<MenuItemType>[]>(() => {
    const initialPath = (router.asPath ?? '').replace('/', '') ?? ''

    const nestedFind = (pred: (value: IMenuItem<MenuItemType> | null) => boolean) => (xs: IMenuItem<MenuItemType>[]): IMenuItem<MenuItemType> | null =>
      xs.reduce(
        (res, x) => res ? res : pred(x) ? x : nestedFind(pred)(x.children || []),
        null as IMenuItem<MenuItemType> | null
      )

    const findById = (): IMenuItem<MenuItemType> | null =>
      nestedFind((item) => {
        console.log('Check', item?.link, item?.children?.map(i => i.link?.replace('/', '')))
        return item?.key !== MenuItemType.ReceivingPoints && !!(item?.children ?? [])?.find((i) => initialPath.includes((i.link ?? '').replace('/', '')))
      })(items)

    const finded = findById()
    return finded?.key !== MenuItemType.ReceivingPoints ? finded?.children ?? items : items

  }, [router.asPath])

  return (
    <div className={classNames(styles.root, props.className)}>
      <HiddenXs>
        <MenuVertical items={items} onClick={() => null} />
      </HiddenXs>
      <VisibleXs>
        <MenuHorizontal items={mobileItems} />
      </VisibleXs>
    </div>
  )
}
