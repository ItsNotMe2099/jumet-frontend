import { useAppContext } from '@/context/state'
import ChatSuggestionCardLayout from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionCardLayout'

interface Props {
  className?: string
}

export default function SuggestionCard(props: Props) {

  const appContext = useAppContext()
  return (
    <ChatSuggestionCardLayout text={'Диалог уже ведет другой менеджер'}/>
  )
}
