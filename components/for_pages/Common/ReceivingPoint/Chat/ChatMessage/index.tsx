import ReadSvg from '@/components/svg/ReadSvg'
import styles from './index.module.scss'
import classNames from 'classnames'
import { colors } from '@/styles/variables'
import UnreadSvg from '@/components/svg/UnreadSvg'

interface IMessage {
  unread?: boolean
  read?: boolean
  text: string
  time: string
  user: string
  self?: boolean
}

interface Props {
  index: number
  message: IMessage
  className?: string
}

export default function ChatMessage(props: Props) {

  return (
    <div className={classNames(styles.root,
      { [styles.self]: props.message.self, [styles.odd]: (props.index + 1) % 2 !== 0 },
      props.className)}>
      {props.message.self &&
        <div className={styles.name}>
          {props.message.user}:
        </div>
      }
      <div className={styles.body}>
        <div className={styles.text}>
          {props.message.text}
        </div>
        <div className={styles.info}>
          <div className={styles.time}>
            {props.message.time}
          </div>
          {props.message.read && <ReadSvg color={colors.grey500} />}
          {props.message.unread && <UnreadSvg color={colors.grey500} />}
        </div>
      </div>
    </div>
  )
}