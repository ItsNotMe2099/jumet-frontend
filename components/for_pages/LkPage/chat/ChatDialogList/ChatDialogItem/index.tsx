import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import IChat from 'data/interfaces/IChat'
import classNames from 'classnames'
import Highlighter from 'react-highlight-words'
import UserUtils from '@/utils/UserUtils'
import DateUtils from '@/utils/DateUtils'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import NotificationBadge from '@/components/ui/NotificationBadge'

interface Props {
  chat: IChat
  isActive?: boolean
  onClick: () => void
  highlight: string | null
}

export default function ChatDialogItem(props: Props) {
  const appContext = useAppContext()
  const [avatarRef, press, hover] = usePressAndHover()
  const user = appContext.aboutMe?.id !== props.chat.sellerId ? props.chat.seller : props.chat.users[0]
  const profileName = UserUtils.getName(user)
  const entityName = 'Тест имя'
  const entityHighlighted = props.highlight && entityName ? props.highlight?.split(' ').some(i => entityName.toLowerCase().includes(i.toLowerCase())) : false
  const nameHighlighted = props.highlight && profileName ? props.highlight?.split(' ').some(i => profileName.toLowerCase().includes(i.toLowerCase())) : false
  return (<div className={classNames(styles.root, {[styles.active]: props.isActive})} onClick={props.onClick}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={classNames(styles.name, {[styles.highlighting]: nameHighlighted})}>
            {nameHighlighted && <Highlighter
              highlightClassName={styles.highlighted}
              searchWords={props.highlight?.split(' ') || []}
              autoEscape={true}
              textToHighlight={UserUtils.getName(user)}
            />}
            {!nameHighlighted && UserUtils.getName(user)}
          </div>
          {props.chat.lastMessageAt &&
            <div className={styles.date}>{DateUtils.formatDateRelative(props.chat.lastMessageAt, true)}</div>}

        </div>
        <div className={styles.center}>
          <div className={styles.left}>
            {props.chat.lastMessage && <div className={styles.lastMessage}>{props.chat.lastMessage}</div>}
            <div className={classNames(styles.entityName, {[styles.highlighting]: entityHighlighted})}>
              {entityHighlighted && <Highlighter
                highlightClassName={styles.highlighted}
                searchWords={props.highlight?.split(' ') || []}
                autoEscape={true}
                textToHighlight={entityName ?? ''}
              />}
              {!entityHighlighted && entityName}</div>
          </div>
          {props.chat.totalUnread > 0 && <NotificationBadge position={'static'} size={'large'} color={'blue'} className={styles.badge} total={props.chat.totalUnread}/>}
        </div>

      </div>


    </div>
  )
}


