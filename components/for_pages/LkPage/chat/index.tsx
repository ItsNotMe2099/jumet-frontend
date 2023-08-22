import {useAppContext} from 'context/state'
import {useRouter} from 'next/router'
import styles from './index.module.scss'
import {useState} from 'react'
import IChat from 'data/interfaces/IChat'
import {Routes} from 'types/routes'
import {ChatSocketWrapper} from 'context/chat_socket_state'
import {ChatWrapper} from 'context/chat_state'
import ChatDialogList from '@/components/for_pages/LkPage/chat/ChatDialogList'
import Chat from '@/components/for_pages/LkPage/chat/Chat'
import {UserRole} from '@/data/enum/UserRole'

interface Props {

}

export default function ChatPage(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const [chatId, setChatId] = useState<number | null>(router.query.chatId ? parseInt(router.query.chatId as string, 10) : null)

  const handleSelectChat = (chat: IChat) => {
    setChatId(chat.id)
    router.replace(Routes.lkChat(chat.id), Routes.lkChat(chat.id), {shallow: true})
  }

  return (
    <ChatSocketWrapper>
      <ChatWrapper>
        <div className={styles.wrapper}>
          <div className={styles.root}>
            {(appContext.isDesktop || !chatId) && <div className={styles.sidebar}>
              <ChatDialogList chatId={chatId} onSelect={handleSelectChat}/>
            </div>}
            <div className={styles.chat}>
              {(chatId || (router.query.receivingPointId && router.query.sellerId)) && <Chat showBothChatNames={appContext.aboutMe?.role === UserRole.Buyer} hasBack={appContext.isMobile} onBackClick={() => setChatId(null)} chatId={chatId}
                                                                                           receivingPointId={router.query.receivingPointId ? parseInt(router.query.receivingPointId as string, 10) : null}
                                                                                           sellerId={router.query.sellerId as string}
              />}
            </div>

          </div>
        </div>
      </ChatWrapper>
    </ChatSocketWrapper>
  )
}
