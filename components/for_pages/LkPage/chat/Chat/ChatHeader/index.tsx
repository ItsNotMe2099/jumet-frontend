import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import IChat from 'data/interfaces/IChat'
import {ReactElement} from 'react'
import {UserRole} from '@/data/enum/UserRole'
import UserUtils from '@/utils/UserUtils'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import BackButton from '@/components/ui/BackButton'
import Formatter from '@/utils/formatter'
import {ChatNameType, Nullable} from '@/types/types'

interface Props {
  chat: IChat | null
  title?: string | ReactElement | null
  actions?: ReactElement
  hasBack?: boolean
  onBackClick?: () => void | undefined
  showBothChatNames?: boolean | undefined
}

export default function ChatHeader(props: Props) {
  const appContext = useAppContext()
  const user = appContext.aboutMe?.id !== props.chat?.sellerId ? props.chat?.seller : ((props.chat?.users?.length ?? 0) > 0 ? props.chat?.users[0] : null)
  const profileName = (user?.firstName || user?.lastName) ? UserUtils.getName(user) : (user?.phone ? Formatter.formatPhone(user.phone) : '')
  const chatName = props.title || appContext.aboutMe?.role === UserRole.Seller ? props.chat?.receivingPoint?.address?.address : profileName
  const chatNameType = props.title ? null : (appContext.aboutMe?.role === UserRole.Seller ? ChatNameType.ReceivingPoint : ChatNameType.Seller)

  const getChatNameType = (type: Nullable<ChatNameType>) => {
    switch (type){
      case ChatNameType.Seller:
        return 'Продавец'
      case ChatNameType.ReceivingPoint:
        return 'Пункт приема'
      default:
        return null
    }
  }

  const getChatName = (type: Nullable<ChatNameType>) => {
    switch (type){
      case ChatNameType.ReceivingPoint:
        const chatName = props.title || appContext.aboutMe?.role === UserRole.Seller ? props.chat?.receivingPoint?.address?.address : profileName

        return <Link className={styles.link} target={'_blank'} href={Routes.receivingPoint(props.chat?.receivingPointId!)}>{chatName}</Link>
      case ChatNameType.Seller:
        return <span className={styles.value}>{chatName}</span>
      default:
        return props.title
    }
  }
  const renderChatNameType = (type: ChatNameType) => {
    return <div className={styles.name}>
      <span className={styles.label}>{getChatNameType(chatNameType)}: </span>
      {getChatName(chatNameType)}
    </div>
  }
  return (   <div className={styles.root}>
        <div className={styles.colLeft}>

          <div className={styles.title}>   {props.hasBack && props.onBackClick &&    <BackButton className={styles.back} onClick={props.onBackClick}>Назад</BackButton>}
            {!props.showBothChatNames && chatNameType && renderChatNameType(chatNameType)}
            {props.showBothChatNames && <div className={styles.names}>{renderChatNameType(ChatNameType.ReceivingPoint)}{renderChatNameType(ChatNameType.Seller)}</div>}
          </div>
        </div>
      </div>
  )
}


