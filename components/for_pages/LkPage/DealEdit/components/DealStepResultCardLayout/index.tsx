import styles from './index.module.scss'

import Collapsible from 'react-collapsible'
import * as React from 'react'
import {ReactElement, useState} from 'react'
import {colors} from '@/styles/variables'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import classNames from 'classnames'
import Formatter from '@/utils/formatter'


interface CardHeaderProps{
  title: string
  date?: string | null
  isOpened: boolean
  onClick: () => void
}
const CardHeader = (props: CardHeaderProps) => {
return <div className={classNames(styles.header, {[styles.opened]: props.isOpened})} onClick={props.onClick}>
  <div className={styles.left}>
    <div className={styles.title}>{props.title}</div>
    <ChevronDownSvg className={classNames(styles.chevron, {[styles.reversed]: props.isOpened})} color={colors.grey500}/>
  </div>
  {props.date && <div className={styles.date}>{Formatter.formatDateRelative(props.date)}</div>}

</div>
}
interface Props{
  title: string
  date?: string | null
  children: ReactElement | ReactElement[]
  initialOpen?: boolean
}
export default function DealStepResultCardLayout(props: Props) {
  const [open, setOpen] = useState<boolean>(props.initialOpen ?? false)
  const handleClick = () => [
    setOpen(!open)
  ]
  const trigger = (<CardHeader title={props.title} date={props.date} isOpened={open} onClick={handleClick}/>)
  return <div className={styles.root}><Collapsible
    open={open}
    trigger={trigger}
    triggerWhenOpen={trigger}
  >
    <div className={styles.content}>
    {props.children}
    </div>
  </Collapsible>
  </div>
}
