//import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import CardLayout from '../../Common/CardLayout'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface Props {
  point: any//IReceivingPoint
  suggestion: string
}

export default function SuggestionCard({ point, suggestion }: Props) {

  const badges = [
    { text: `${point.price} ₽/т` },
    { text: 'Доставка – 500 ₽' },
    { text: 'Погрузка – бесплатно' }
  ]

  return (
    <CardLayout title={point.title as string} contentClassName={styles.additional} additionalEl={
    <div className={styles.inner}>
      <div className={styles.date}>
        {format(new Date(point.createdAt), 'dd MMMM', { locale: ru })}
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