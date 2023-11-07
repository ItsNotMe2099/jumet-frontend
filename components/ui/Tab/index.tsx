import styles from './index.module.scss'
import classNames from 'classnames'
import {Nullable} from '@/types/types'
import NotificationBadge from '@/components/ui/NotificationBadge'
export type TabStyleType = 'default' | 'outlined' | 'filter'

interface Props {
  text: string
  styleType: TabStyleType
  active?: boolean
  onClick?: () => void
  className?: string
  badge?: Nullable<number>
}

export default function Tab(props: Props) {
  return (
    <div onClick={props.onClick} className={classNames(styles.root, props.className, {[styles.active]: props.active, [styles[props.styleType]]: true})}>
      <div className={styles.text}>{props.text}</div>
      {(props.badge ?? 0) > 0 && <NotificationBadge className={styles.badge} position={'static'} color={'blue'} total={props.badge!}/>}
    </div>
  )
}
