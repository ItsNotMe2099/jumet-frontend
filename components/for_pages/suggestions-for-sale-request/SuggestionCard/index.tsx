//import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import CardLayout from '../../Common/CardLayout'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import isToday from 'date-fns/isToday'

interface Props {
  point: any//IReceivingPoint
  suggestion: string
}

export default function SuggestionCard({ point, suggestion }: Props) {

  const createdAtDate = new Date(point.createdAt)
  const today = isToday(createdAtDate)

  const formatDate = today
    ? format(createdAtDate, 'HH:mm', { locale: ru })
    : format(createdAtDate, 'dd MMMM', { locale: ru })

  const badges = [
    { text: `${point.price} ₽/т` },
    { text: 'Доставка – 500 ₽' },
    { text: 'Погрузка – бесплатно' }
  ]

  return (
    <CardLayout topClassName={styles.top} title={point.title as string} contentClassName={styles.additional} additionalEl={
      <div className={styles.inner}>
        {today && <div className={styles.new}>Новое предложение</div>}
        <div className={styles.date}>
          {today ? 'Сегодня ' + formatDate : formatDate}
        </div>
      </div>
    }>
      <div className={styles.root}>
        <div className={styles.address}>
          {point.address.address}
        </div>
        <div className={styles.info}>
          {badges.map((i, index) =>
            <div className={styles.badge} key={index}>
              {i.text}
            </div>
          )}
        </div>
        <div className={styles.desc}>
          {suggestion}
        </div>
        <div className={styles.controls}>
          <div className={styles.right}>
            <Button color='blue' styleType='large'>
              Принять предложение
            </Button>
            <Button className={styles.btn} color='grey' styleType='large'>
              Отклонить
            </Button>
          </div>
          <div className={styles.left}>
            <Button className={styles.btn} color='grey' styleType='large' icon={<ChatSvg color={colors.blue500} />}>
              Чат с пунктом приёма
            </Button>
          </div>
        </div>
      </div>
    </CardLayout>
  )
}