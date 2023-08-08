import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import InfiniteScroll from 'react-infinite-scroll-component'
import ContentLoader from 'components/ui/ContentLoader'
import {ChatDialogWrapper, useChatDialogContext} from 'context/chat_dialog_state'
import ChatMessage from './ChatMessage'
import Spacer from 'components/ui/Spacer'
import {ReactElement, RefObject} from 'react'
import ChatHeader from '@/components/for_pages/LkPage/chat/Chat/ChatHeader'
import ChatMessageForm from '@/components/for_pages/LkPage/chat/Chat/ChatMessageForm'
import classNames from 'classnames'

interface Props {
  className?: string
  chatId?: number | null
  title?: string | ReactElement | null
  receivingPointId?: number
}

const ChatInner = (props: Props) => {
  const appContext = useAppContext()
  const chatContext = useChatDialogContext()
  return (<div className={classNames(styles.root, props.className)}>
      {<ChatHeader chat={chatContext.chat} title={props.title ?? null}/>}
      <div className={styles.messages} id={'chat-messages'}
           ref={chatContext.scrollableTarget as RefObject<HTMLDivElement>}>
        <InfiniteScroll
          dataLength={chatContext.messages.length}
          next={chatContext.fetchMore}
          scrollableTarget={'chat-messages'}
          inverse
          style={{overflow: 'inherit'}}
          className={styles.list}
          loader={chatContext.totalMessages > 0 ? <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
          hasMore={chatContext.totalMessages > chatContext.messages.length}
          scrollThreshold={0.6}>
          {chatContext.messages.map((i, index) => {
            const previous = index > 0 ? chatContext.messages[index - 1] : null
            return (<>
              {previous && previous.userId !== i.userId && <Spacer basis={10}/>}
              <ChatMessage key={i.sid ?? i.id} side={appContext.aboutMe?.id === i.userId ? 'my' : 'other'}
                           message={i}/></>)
          })}
        </InfiniteScroll>
      </div>
      <div className={styles.bottom}>
        <ChatMessageForm/>
      </div>
    </div>
  )
}


export default function Chat(props: Props) {
  console.log('props.receivingPointId', props.receivingPointId)
  return <ChatDialogWrapper chatId={props.chatId} receivingPointId={props.receivingPointId}>
    <ChatInner {...props}/>
  </ChatDialogWrapper>
}
