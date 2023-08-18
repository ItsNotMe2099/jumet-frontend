import styles from './index.module.scss'
import {useAppContext} from '@/context/state'
import DealUtils from '@/utils/DealUtils'
import {DealStatus} from '@/data/enum/DealStatus'
import {ChatMessageProps} from '@/types/types'
import ChatMessageCardLayout from '../ChatMessageCardLayout'
import {ChatMessageType} from '@/data/enum/ChatMessageType'

interface Props extends ChatMessageProps{
}

export default function ChatMessageDealStatus(props: Props) {
  const appContext = useAppContext()
  const convertMessageTypeToDealStatus = (type: ChatMessageType): DealStatus => {
    switch (props.message.type){
      case ChatMessageType.DealSetUp:
        return DealStatus.SetUp
      case ChatMessageType.DealWeighed:
        return DealStatus.Weighing
      case ChatMessageType.DealTerminatedByBuyer:
        return DealStatus.TerminatedByBuyer
      case ChatMessageType.DealTerminatedBySeller:
        return DealStatus.TerminatedBySeller
      case ChatMessageType.DealWeighingAccepted:
        return DealStatus.WeighingAccepted
      case  ChatMessageType.DealPaid:
        return DealStatus.Paid
    }
  }
  const description = DealUtils.getStateDescription({status: convertMessageTypeToDealStatus(props.message.type) } as any, appContext?.aboutMe!.role)
  return <ChatMessageCardLayout color={'yellow'} message={props.message} side={props.side}>
    <div className={styles.root}>
      {description.name && <div className={styles.title}>{description.name}</div>}
      {description.description && <div className={styles.desc}>{description.description}</div>}
    </div>
  </ChatMessageCardLayout>
}


