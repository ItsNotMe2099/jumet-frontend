import classNames from 'classnames'
import styles from './index.module.scss'

interface Props {
 className?: string
 total?: number
 empty?: boolean
 borderColor?: string
}

export default function NotificationBadge(props: Props) {
  if(!props.empty && (!props.total || props.total === 0)){
    return null
  }
  return (<div className={classNames({
    [styles.root]: true,
    [styles.empty]: props.empty,
  },props.className)} style={{borderColor: props.borderColor}}>{props.total ?? ''}</div>)
}

