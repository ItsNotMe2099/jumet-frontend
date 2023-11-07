import {ChatMessageProps} from '@/types/types'
import ChatMessageCardLayout from '../ChatMessageCardLayout'
interface Props extends ChatMessageProps{
}

export default function ChatMessageText(props: Props) {
  return <ChatMessageCardLayout message={props.message} side={props.side}>
    {props.message?.message}
  </ChatMessageCardLayout>
}


