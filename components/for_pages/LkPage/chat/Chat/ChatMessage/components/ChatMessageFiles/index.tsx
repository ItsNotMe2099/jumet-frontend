import styles from './index.module.scss'
import {ChatMessageProps} from '@/types/types'
import ChatMessageCardLayout from '../ChatMessageCardLayout'
import DocumentPreview from '@/components/ui/DocumentPreview'
import Link from 'next/link'
interface Props extends ChatMessageProps{
}

export default function ChatMessageFiles(props: Props) {
  return <ChatMessageCardLayout message={props.message} side={props.side}>
    <div className={styles.root}>
      {props.message.assets?.map(i => <Link href={i.source ?? '#'} className={styles.file}>
          <DocumentPreview file={i.source}  className={styles.icon}/>
        <div className={styles.name}>{i.name}</div>
      </Link>)}
    </div>
    {props.message.message ? <div className={styles.text}>{props.message.message!}</div> : <></>}

  </ChatMessageCardLayout>
}


