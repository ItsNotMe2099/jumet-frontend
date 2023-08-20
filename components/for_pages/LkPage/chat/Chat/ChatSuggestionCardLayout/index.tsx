import styles from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionCardLayout/index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'

interface Props {
  text: string
  actions?: ReactElement | ReactElement[] | undefined
  children?:  ReactElement | ReactElement[] | undefined
}

export default function ChatSuggestionCardLayout(props: Props) {
  return (
    <div className={classNames(styles.root, props.className)}>
      {props.text && <div className={styles.text}>
        {props.text}
      </div>}
      {props.actions && <div className={styles.actions}>
        {props.actions}
      </div>}
      {props.children}
    </div>
  )
}
