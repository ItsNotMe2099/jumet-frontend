import { useAppContext } from '@/context/state'
import styles from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionCardLayout/index.module.scss'
import Button from '@/components/ui/Button'
import { Routes } from '@/types/routes'
import ChatSuggestionCardLayout from '@/components/for_pages/LkPage/chat/Chat/ChatSuggestionCardLayout'

interface Props {
  className?: string
}

export default function SuggestionCard(props: Props) {

  const appContext = useAppContext()
  return (
    <ChatSuggestionCardLayout text={' Представьтесь, чтобы доставить сообщение'} actions={[
      <Button href={Routes.login()} className={styles.signIn} color='grey' styleType='large'>
        Войти
      </Button>,
      <Button href={Routes.registration} className={styles.signUp} color='blue' styleType='large'>
        Зарегистрироваться
      </Button>
    ]}/>
  )

}
