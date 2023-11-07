import styles from './index.module.scss'
import classNames from 'classnames'
import {useRouter} from 'next/router'
import {IMenuItem} from '@/types/types'
import MenuVertical from '@/components/for_pages/Common/MenuVertical'
import HiddenXs from '@/components/visibility/HiddenXs'
import VisibleXs from '@/components/visibility/VisibleXs'
import MenuHorizontal from '@/components/for_pages/Common/MenuHorizontal'
import {useMemo} from 'react'
import {useAppContext} from '@/context/state'


interface Props<T extends string> {
  className?: string
  items: IMenuItem<T>[]
  excludeFromMobileNested?: T[] | null
}
export default function LkMenu<T extends string>(props: Props<T>) {
  const appContext = useAppContext()
  const router = useRouter()
  const mobileItems = useMemo<IMenuItem<T>[]>(() => {
    const initialPath = (router.asPath ?? '').replace('/', '') ?? ''

    const nestedFind = (pred: (value: IMenuItem<T> | null) => boolean) => (xs: IMenuItem<T>[]): IMenuItem<T> | null =>
      xs.reduce (
        (res, x) => res ? res : pred(x) ? x : nestedFind (pred) (x.children || []),
        null as IMenuItem<T> | null
      )

    const findById = (): IMenuItem<T> | null =>
      nestedFind ((item) =>{
        return !(props.excludeFromMobileNested ?? []).includes(item?.key as any) && !!(item?.children ?? [])?.find((i) => initialPath.includes((i.link ?? '').replace('/', '')))
      })(props.items)

    const finded = findById()
    return !(props.excludeFromMobileNested ?? []).includes(finded?.key as any)  ? finded?.children ?? props.items : props.items

  }, [router.asPath])
  const handleClick = (item: IMenuItem<T> | null) => {
    if(item?.key === 'exit'){
        setTimeout(() => appContext.logout(), 100)
        router.push('/')
    }
  }
  return (
    <div className={classNames(styles.root, props.className)}>
        <HiddenXs>
          <MenuVertical items={props.items} onClick={handleClick}/>
        </HiddenXs>
        <VisibleXs>
          <MenuHorizontal items={mobileItems} onClick={handleClick}/>
        </VisibleXs>
    </div>
  )
}
