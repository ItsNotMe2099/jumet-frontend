import styles from './index.module.scss'
import {useState} from 'react'
import Collapsible from 'react-collapsible'
import MenuHeader from './MenuHeader'
import {IMenuItem} from 'types/types'
import {useRouter} from 'next/router'
import {MenuItem} from '@/components/for_pages/Common/MenuVertical/MenuItem'
import * as React from 'react'

interface AccordionProps<T> {
  item: IMenuItem<T>
  open: boolean
  onClick: (item: IMenuItem<T>) => void
}

function MenuAccordion<T>(props: AccordionProps<T>) {
  const [active, setActive] = useState<boolean>(props.open)
  const {asPath} = useRouter()
  const [initialAsPath, setInitialAsPath] = useState<string | null>(asPath)

  const handleClick = () => {
    setActive(!active)
  }
  return <Collapsible
    open={active}
    trigger={<MenuHeader className={styles.menuHeader}  title={props.item.name} isActive={active} hasChildren onClick={handleClick}
                         href={props.item.link}/>}
    triggerWhenOpen={<MenuHeader  className={styles.menuHeader}  title={props.item.name} isActive={active} hasChildren onClick={handleClick}
                                 href={props.item.link} isOpen={true}/>}
    openedClassName={styles.active}
    contentOuterClassName={styles.content}
  >
      {props.item.children?.map((item, index) => {
        const initialPath = (initialAsPath ?? '').replace('/', '') ?? ''
        const initialIsActive = initialPath.includes((item.link ?? '').replace('/', '')) || !!item.children?.find(i => (initialPath ?? '').includes((i.link ?? '').replace('/', '')))
        return (item.children?.length ?? 0) > 0 ?
          <MenuAccordion item={item} open={initialIsActive} onClick={props.onClick}/> :
          <MenuItem className={styles.menuItem} key={item.link} title={item.name} link={item.link} onClick={() => props.onClick(item)}/>
      })}

  </Collapsible>
}

interface Props<T> {
  items: IMenuItem<T>[]
  onClick: (item: IMenuItem<T>) => void
}

export default function MenuVertical<T>(props: Props<T>) {
  const {asPath} = useRouter()
  const [initialAsPath, setInitialAsPath] = useState<string | null>(asPath)

  return (
    <div className={styles.root}>
      {props.items.map((item, index) => {
        const initialPath = (initialAsPath ?? '').replace('/', '') ?? ''
        const initialIsActive = initialPath.includes((item.link ?? '').replace('/', '')) || !!item.children?.find(i => (initialPath ?? '').includes((i.link ?? '').replace('/', '')))
        return (
          <>
            {(item.children?.length ?? 0) > 0 &&
              <MenuAccordion item={item} open={initialIsActive} onClick={props.onClick}/>}
            {((item.children?.length ?? 0) === 0) &&
              <MenuItem className={styles.menuItem} key={item.link} title={item.name} link={item.link} onClick={() => props.onClick(item)}/>
            }

          </>
        )
      })}


    </div>
  )
}
