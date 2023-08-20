import ChatSuggestionCardLayout from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionCardLayout'
import Button from '@/components/ui/Button'

interface Props {
  className?: string
}

export default function ChatSuggestionCreateDeal(props: Props) {
  return (
    <ChatSuggestionCardLayout actions={<Button color='blue' styleType='large'>
      Предложить сделку
    </Button>}/>
  )
}
