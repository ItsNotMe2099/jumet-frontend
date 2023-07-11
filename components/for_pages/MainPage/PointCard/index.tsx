import Badge from '@/components/ui/Badge'
import styles from './index.module.scss'
import StarSvg from '@/components/svg/StarSvg'
import { colors } from '@/styles/variables'
import { formatInTimeZone } from 'date-fns-tz'
import ru from 'date-fns/locale/ru'
import Link from 'next/link'
import IPointData from '@/data/interfaces/IPointData'


interface Props {
  item: IPointData
}

export default function PointCard(props: Props) {

  const date = new Date()
  const timeZone = 'Europe/Moscow'
  const hour = formatInTimeZone(date, timeZone, 'H', { locale: ru })

  const opens = Number(props.item.opens)
  const closes = Number(props.item.closes)
  const currentHour = Number(hour)

  const openingTime = new Date()
  openingTime.setHours(opens, 0, 0)

  const closingTime = new Date()
  closingTime.setHours(closes, 0, 0)

  let openingStatus
  if ((currentHour < opens || currentHour >= closes) && !props.item.alwaysOpen) {
    openingStatus = `Откроется в ${opens}:00`
  } else {
    openingStatus = 'Открыто сейчас'
  }

  // format the opening time to display in the UI

  return (
    <Link href={`/receiving-point/${props.item.id}`}>
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={styles.right}>
            <div className={styles.title}>
              {props.item.title}
            </div>
            <div className={styles.rating}>
              <StarSvg color={colors.yellow500} />
              <div className={styles.number}>{props.item.rating}</div>
            </div>
          </div>
          <div className={styles.price}>
            До {props.item.price} ₽/тонна
          </div>
        </div>
        <div className={styles.middle}>
          {props.item.address}
        </div>
        <div className={styles.bottom}>
          <Badge active={props.item.isDelivery} text='Есть доставка' />
          <Badge active={props.item.haveLoading} text='Есть погрузка' />
          <Badge
            active={currentHour >= opens && currentHour < closes || props.item.alwaysOpen}
            text={openingStatus} />
        </div>
      </div>
    </Link>
  )
}
