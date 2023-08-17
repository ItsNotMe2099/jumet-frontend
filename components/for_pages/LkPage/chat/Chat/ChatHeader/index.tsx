import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import IChat from 'data/interfaces/IChat'
import {ReactElement} from 'react'
import {UserRole} from '@/data/enum/UserRole'
import UserUtils from '@/utils/UserUtils'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import BackButton from '@/components/ui/BackButton'
enum ChatNameType{
  ReceivingPoint = 'receivingPoint',
  Seller = 'seller'
}
interface Props {
  chat: IChat | null
  title?: string | ReactElement | null
  actions?: ReactElement
  hasBack?: boolean
  onBackClick: () => void
}

export default function ChatHeader(props: Props) {
  const appContext = useAppContext()
  const user = appContext.aboutMe?.id !== props.chat?.sellerId ? props.chat?.seller : ((props.chat?.users?.length ?? 0) > 0 ? props.chat?.users[0] : null)
  const profileName = user ? UserUtils.getName(user) : ''
  const chatName = props.title || appContext.aboutMe?.role === UserRole.Seller ? props.chat?.receivingPoint?.address?.address : UserUtils.getName(user)
  const chatNameType = props.title ? null : (appContext.aboutMe?.role === UserRole.Seller ? ChatNameType.ReceivingPoint : ChatNameType.Seller)
  const getChatNameType = () => {
    switch (chatNameType){
      case ChatNameType.Seller:
        return 'Продавец'
      case ChatNameType.ReceivingPoint:
        return 'Пункт приема'
      default:
        return null
    }
  }
  const getChatName = () => {
    switch (chatNameType){
      case ChatNameType.ReceivingPoint:
        return <Link className={styles.link} target={'_blank'} href={Routes.receivingPoint(props.chat?.receivingPointId!)}>{chatName}</Link>
      case ChatNameType.Seller:
        return <span className={styles.value}>{chatName}</span>
      default:
        return null
    }
  }
  return (   <div className={styles.root}>
        <div className={styles.colLeft}>

          <div className={styles.title}>   {props.hasBack &&    <BackButton className={styles.back} onClick={props.onBackClick}>Назад</BackButton>}
            {chatNameType && <span className={styles.label}>{getChatNameType()}: </span>}{getChatName()}</div>
        </div>
      </div>
  )
}


