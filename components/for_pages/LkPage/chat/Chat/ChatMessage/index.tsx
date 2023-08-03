import styles from './index.module.scss'
import IChatMessage from 'data/interfaces/IChatMessage'
import classNames from 'classnames'
import {format} from 'date-fns'

interface Props {
  message: IChatMessage
  side: 'my' | 'other'
}

export default function ChatMessage(props: Props) {

  return (<div className={classNames(styles.root, {
    [styles.sideMy]: props.side === 'my',
    [styles.sideOther]: props.side === 'other',
  })}>
    <div className={styles.message}>
    {props.message.message}
    <div className={styles.time}>{format(new Date(props.message.createdAt), 'HH:mm')}</div>
    </div>
    </div>)
}


