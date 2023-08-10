import Badge from '@/components/ui/Badge'
import styles from './index.module.scss'
import StarSvg from '@/components/svg/StarSvg'
import { colors } from '@/styles/variables'
import { formatInTimeZone } from 'date-fns-tz'
import ru from 'date-fns/locale/ru'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import Button from '@/components/ui/Button'
import TrashSvg from '@/components/svg/TrashSvg'


interface Props {
  item: IReceivingPoint
  onDelete: () => void
}

export default function ReceivingPointCard(props: Props) {

  const date = new Date()
  const timeZone = 'Europe/Moscow'
  const hour = formatInTimeZone(date, timeZone, 'H', { locale: ru })

  const opens = Number(0)
  const closes = Number(1)
  const currentHour = Number(hour)

  const openingTime = new Date()
  openingTime.setHours(opens, 0, 0)

  const closingTime = new Date()
  closingTime.setHours(closes, 0, 0)

  let openingStatus
  if ((currentHour < opens || currentHour >= closes)) {
    openingStatus = `Откроется в ${opens}:00`
  } else {
    openingStatus = 'Открыто сейчас'
  }

  // format the opening time to display in the UI

  const handleDelete = async () => {
    props.onDelete()
  }

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.right}>
          <div className={styles.title}>
            {props.item.name}
          </div>
          {props.item.rating && <div className={styles.rating}>
            <StarSvg color={colors.yellow500} />
            <div className={styles.number}>{props.item.rating}</div>
          </div>}
        </div>
        {props.item.price && <div className={styles.price}>
          До {props.item.price} ₽/тонна
        </div>}
      </div>
      <div className={styles.middle}>
        {props.item.address?.address}
      </div>
      <div className={styles.bottom}>
        <div className={styles.badges}>
          <div className={styles.first}>
            <Badge active={props.item.hasDelivery} text='Есть доставка' />
            <Badge active={props.item.hasLoading} text='Есть погрузка' />
          </div>
          <div className={styles.last}>
            <Badge
              active={currentHour >= opens && currentHour < closes}
              text={openingStatus} />
          </div>
        </div>
        <Button onClick={handleDelete} className={styles.btn} color='grey' styleType='large' icon={<TrashSvg color={colors.blue500} />}>
          Убрать из избранного
        </Button>
      </div>
    </div>
  )
}
