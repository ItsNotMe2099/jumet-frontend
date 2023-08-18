import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import IChat from 'data/interfaces/IChat'
import classNames from 'classnames'
import Highlighter from 'react-highlight-words'
import UserUtils from '@/utils/UserUtils'
import DateUtils from '@/utils/DateUtils'
import NotificationBadge from '@/components/ui/NotificationBadge'
import {UserRole} from '@/data/enum/UserRole'
import ChatUserAvatar from '@/components/ui/ChatUserAvatar'
import {forwardRef} from 'react'
import Formatter from '@/utils/formatter'

interface Props {
  chat: IChat
  isActive?: boolean
  onClick: () => void
  highlight: string | null
}
const ChatDialogItem = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const appContext = useAppContext()
  const user = appContext.aboutMe?.id !== props.chat.sellerId ? props.chat.seller : props.chat.users[0]
  const profileName = (user.firstName || user.lastName) ? UserUtils.getName(user) : Formatter.formatPhone(user.phone)
  const nameHighlighted = props.highlight && profileName ? props.highlight?.split(' ').some(i => profileName.toLowerCase().includes(i.toLowerCase())) : false
  const messageHighlighted = props.highlight && props.chat.searchMessage  ? props.highlight?.split(' ').some(i => props.chat.searchMessage!.toLowerCase().includes(i.toLowerCase())) : false
  const chatName = appContext.aboutMe?.role === UserRole.Seller ? props.chat.receivingPoint?.address?.address : profileName
  const lastMessage = props.chat.searchMessage ?? props.chat.lastMessage
  const lastMessageAt = props.chat.searchMessageAt ?? props.chat.lastMessageAt

  const hasUnAssignedBadge = appContext.aboutMe?.role === UserRole.Buyer && !props.chat.managerId
  const hasNotificationBadge = !hasUnAssignedBadge && props.chat.totalUnread > 0
  return (<div ref={ref} className={classNames(styles.root, {[styles.active]: props.isActive})} onClick={props.onClick}>
      <ChatUserAvatar type={appContext.aboutMe?.role === UserRole.Seller ? 'receivingPoint' : 'user'} user={user} receivingPoint={props.chat.receivingPoint} />
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={classNames(styles.name, {[styles.highlighting]: nameHighlighted})}>
            {nameHighlighted && <Highlighter
              highlightClassName={styles.highlighted}
              searchWords={props.highlight?.split(' ') || []}
              autoEscape={true}
              textToHighlight={chatName ?? ''}
            />}
            {!nameHighlighted && chatName}
          </div>
          {lastMessageAt &&
            <div className={styles.date}>{DateUtils.formatDateRelativeShort(lastMessageAt)}</div>}

        </div>
        <div className={styles.center}>
          <div className={styles.left}>
            {lastMessage  && <div className={styles.lastMessage}>
              {messageHighlighted && <Highlighter
              highlightClassName={styles.highlighted}
              searchWords={props.highlight?.split(' ') || []}
              autoEscape={true}
              textToHighlight={lastMessage ?? ''}
            />}
              {!messageHighlighted && lastMessage}</div>}
          </div>
          {hasNotificationBadge && <NotificationBadge position={'static'} size={'large'} color={'blue'} className={styles.badge} total={props.chat.totalUnread}/>}
          {hasUnAssignedBadge && <div className={styles.unassignedBadge}>Новая</div>}
        </div>

      </div>


    </div>
  )
})

export default ChatDialogItem
