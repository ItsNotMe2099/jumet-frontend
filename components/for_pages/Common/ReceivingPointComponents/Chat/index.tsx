import ChatHeader from './ChatHeader'
import ChatMessageForm from './ChatMessageForm'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
}

export default function Chat(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <ChatHeader />
        <div className={styles.messages}>

        </div>
        <ChatMessageForm />
      </div>
    </div>
  )
}