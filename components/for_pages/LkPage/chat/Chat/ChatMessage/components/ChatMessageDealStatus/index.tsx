import styles from './index.module.scss'
import {useAppContext} from '@/context/state'
import DealUtils from '@/utils/DealUtils'
import {DealStatus} from '@/data/enum/DealStatus'
import {ChatMessageProps} from '@/types/types'
import ChatMessageCardLayout from '../ChatMessageCardLayout'

interface Props extends ChatMessageProps{
}

export default function ChatMessageDealStatus(props: Props) {
  const appContext = useAppContext()

  const description = DealUtils.getStateDescription({status:props.message.type as DealStatus } as any, appContext?.aboutMe!.role)
  return <ChatMessageCardLayout color={'yellow'} message={props.message} side={props.side}>
    <div className={styles.root}>
      {description.name && <div className={styles.title}>{description.name}</div>}
      {description.description && <div className={styles.desc}>{description.description}</div>}
    </div>
  </ChatMessageCardLayout>
}


