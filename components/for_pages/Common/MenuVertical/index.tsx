import styles from './index.module.scss'
import {useState} from 'react'
import Collapsible from 'react-collapsible'
import MenuHeader from './MenuHeader'
import {MenuDropdown} from './MenuDropdown'
import {IMenuItem} from 'types/types'
import {useRouter} from 'next/router'

interface AccordionProps<T> {
  item: IMenuItem<T>
  open: boolean
  onClick: (item: IMenuItem<T>) => void
}
function MenuAccordion<T>(props: AccordionProps<T>){
    const [active, setActive] = useState<boolean>(props.open)
  const handleClick = () => {
      setActive(!active)
  }
  return <Collapsible
    open={active}
    trigger={<MenuHeader title={props.item.name} isActive={active} hasChildren onClick={handleClick} href={props.item.link}/>}
    triggerWhenOpen={<MenuHeader title={props.item.name} isActive={active}  hasChildren onClick={handleClick} href={props.item.link} isOpen={true}/>}
    openedClassName={styles.active}
    contentInnerClassName={styles.content}
  >
    {(props.item.children?.length ?? 0) > 0 && <MenuDropdown items={props.item.children!} onClick={props.onClick}/>}
  </Collapsible>
}
interface Props<T> {
  items: IMenuItem<T>[]
  onClick: (item: IMenuItem<T>) => void
}
export default function MenuVertical<T>(props: Props<T>) {
  const { asPath } = useRouter()
    const [initialAsPath, setInitialAsPath] = useState<string | null>(asPath)

  return (
    <div className={styles.root}>
      {props.items.map((item, index) => {
        const initialPath =  (initialAsPath ?? '').replace('/', '') ?? ''
        const initialIsActive = initialPath.includes((item.link ?? '').replace('/', '')) || !!item.children?.find(i => (initialPath ?? '').includes((i.link ?? '').replace('/', '')))
         return (
        <>
      {(item.children?.length ?? 0)  > 0 && <MenuAccordion item={item} open={initialIsActive} onClick={props.onClick}/>}
      {((item.children?.length ?? 0) === 0) && <MenuHeader title={item.name} href={item.link} color={item.color}/>}

        </>
      )})}


    </div>
  )
}
