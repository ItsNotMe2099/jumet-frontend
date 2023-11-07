import Button from '@/components/ui/Button'
import { Routes } from '@/types/routes'
import ChatSuggestionCardLayout from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionCardLayout'
import {useRouter} from 'next/router'

interface Props {
  className?: string
}

export default function ChatSuggestionLogin(props: Props) {

  const router = useRouter()
  return (
    <ChatSuggestionCardLayout text={' Представьтесь, чтобы доставить сообщение'} actions={[
      <Button href={Routes.login(router.asPath)} color='grey' styleType='large'>
        Войти
      </Button>,
      <Button href={Routes.registration} color='blue' styleType='large'>
        Зарегистрироваться
      </Button>
    ]}/>
  )

}
