import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import InfiniteScroll from 'react-infinite-scroll-component'
import ContentLoader from 'components/ui/ContentLoader'
import {ChatDialogWrapper, ChatDisabledType, useChatDialogContext} from 'context/chat_dialog_state'
import ChatMessage from './ChatMessage'
import Spacer from 'components/ui/Spacer'
import {ReactElement, RefObject} from 'react'
import ChatHeader from '@/components/for_pages/LkPage/chat/Chat/ChatHeader'
import ChatMessageForm from '@/components/for_pages/LkPage/chat/Chat/ChatMessageForm'
import classNames from 'classnames'
import ChatSuggestionOtherManager from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionOtherManager'
import ChatSuggestionLogin from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionLogin'
import ChatSuggestionReceivingPoint from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionReceivingPoint'

interface Props {
  className?: string
  chatId?: number | null
  title?: string | ReactElement | null
  receivingPointId?: number | undefined
  hasBack?: boolean
  onBackClick?: () => void | undefined
  sellerId?: string | undefined
}

const ChatInner = (props: Props) => {
  const appContext = useAppContext()
  const chatContext = useChatDialogContext()
  const loading = chatContext.loading || !appContext.aboutMeLoaded
  const renderChatSuggestion = () => {
    switch (chatContext.disabledType) {
      case ChatDisabledType.OtherManager:
        return <ChatSuggestionOtherManager chat={chatContext.chat}/>
      case ChatDisabledType.Auth:
        return <ChatSuggestionLogin/>
      case ChatDisabledType.ReceivingPoint:
        return <ChatSuggestionReceivingPoint/>
    }
    return null

  }
  return (<div className={classNames(styles.root, props.className)}>
      {<ChatHeader hasBack={props.hasBack ?? false} onBackClick={props.onBackClick} chat={chatContext.chat}
                   title={props.title ?? null}/>}
      <div className={styles.messages} id={'chat-messages'}
           ref={chatContext.scrollableTarget as RefObject<HTMLDivElement>}>
        {loading && <ContentLoader style={'block'} isOpen={true}/>}
        {!loading && !chatContext.disabled && <InfiniteScroll
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
        </InfiniteScroll>}
        {!loading && renderChatSuggestion()}
      </div>
      <div className={styles.bottom}>
        <ChatMessageForm/>
      </div>
    </div>
  )
}


export default function Chat(props: Props) {
  console.log('props.receivingPointId', props.receivingPointId)
  return <ChatDialogWrapper chatId={props.chatId} sellerId={props.sellerId} receivingPointId={props.receivingPointId}>
    <ChatInner {...props}/>
  </ChatDialogWrapper>
}
