import ChatSuggestionCardLayout from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionCardLayout'
import IChat from '@/data/interfaces/IChat'
import UserUtils from '@/utils/UserUtils'
import {Nullable} from '@/types/types'

interface Props {
  className?: string
  chat: Nullable<IChat>
}

export default function ChatSuggestionOtherManager(props: Props) {
  console.log('props.chat1111', props.chat)
  return (
    <ChatSuggestionCardLayout text={`Диалог уже ведет другой менеджер${props.chat?.manager ? ` ${UserUtils.getName(props.chat.manager)}` : ''}`}/>
  )
}
