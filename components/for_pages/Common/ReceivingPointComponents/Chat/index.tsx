import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatMessageForm from './ChatMessageForm'
import SuggestionCard from './SuggestionCard'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
  messageClass?: string
}

export default function Chat(props: Props) {

  const hardCodedMsg = {
    text: 'Здравствуйте. Мы готовы ответить на любые ваши вопросы',
    time: '14:43', user: 'Сергей', self: true
  }

  const messages = [
    { text: 'Хочу продать лом ', time: '14:43', read: true, user: 'Vasya' },
    { text: 'Сколько лома и какой? Нужна доставка?', time: '14:43', user: 'Сергей', self: true },
    {
      text: '5 тонн арматуры, труб швелера и прочей ерунды. Важно, чтобы у вас была доставка.', time: '14:43',
      user: 'Vasya', unread: true
    }
  ]

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <ChatHeader />
        <div className={styles.messages}>
          <ChatMessage className={props.messageClass} message={hardCodedMsg} index={0} />
          {messages.map((i, index) =>
            <ChatMessage className={props.messageClass} message={i} index={index + 1} />
          )}
        </div>
        <ChatMessageForm />
      </div>
      <SuggestionCard className={styles.suggestion} />
    </div>
  )
}