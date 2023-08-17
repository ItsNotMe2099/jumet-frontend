import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import IChat from 'data/interfaces/IChat'
import InfiniteScroll from 'react-infinite-scroll-component'
import ContentLoader from 'components/ui/ContentLoader'
import ChatDialogItem from './ChatDialogItem'
import {useChatContext} from 'context/chat_state'
import FlipMove from 'react-flip-move'
import ChatDialogFilter from '@/components/for_pages/LkPage/chat/ChatDialogList/ChatDialogFilter'

interface Props {
  chatId: number | null
  onSelect: (chat: IChat) => void
}

export default function ChatDialogList(props: Props) {
  const appContext = useAppContext()
  const chatContext = useChatContext()


  return (<div className={styles.root}>
        <ChatDialogFilter/>
      <div className={styles.dialogs}>
        {!chatContext.loading && chatContext.search && chatContext.totalChats === 0 ? <div className={styles.empty}>
          По вашей запросу ничего не найдено
        </div> :  <InfiniteScroll
          dataLength={chatContext.chats.length}
          next={chatContext.fetchMore}
          style={{overflow: 'inherit'}}
          loader={chatContext.totalChats > 0 ? <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
          hasMore={chatContext.totalChats > chatContext.chats.length}
          scrollThreshold={0.6}>
          <div className={styles.list}>
            <FlipMove
              staggerDurationBy="30"
              duration={500}
              enterAnimation={'accordionVertical'}
              leaveAnimation={'accordionVertical'}
            >
            {chatContext.chats.map((i, index) => <ChatDialogItem key={`${i.id}`} highlight={chatContext.filter?.search} isActive={props.chatId === i.id} chat={i}
                                           onClick={() => props.onSelect(i)}/>)}
            </FlipMove>
         </div>
        </InfiniteScroll>}
      </div>
    </div>
  )
}
