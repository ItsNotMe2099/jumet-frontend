import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import IChat from 'data/interfaces/IChat'
import {ReactElement} from 'react'

interface Props {
  chat: IChat | null
  title: string | ReactElement | null
  actions?: ReactElement
}

export default function ChatHeader(props: Props) {
  const appContext = useAppContext()


  return (   <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.colLeft}>
           <div className={styles.title}>{props.title}</div>
        </div>
      </div>

      </div>
  )
}


