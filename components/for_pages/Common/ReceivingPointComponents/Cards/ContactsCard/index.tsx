import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import PhoneSvg from '@/components/svg/PhoneSvg'
import { useState } from 'react'
import DeliverySvg from '@/components/svg/DeliverySvg'
import LoadingSvg from '@/components/svg/LoadingSvg'
import TimeSvg from '@/components/svg/TimeSvg'
import { formatInTimeZone } from 'date-fns-tz'
import ru from 'date-fns/locale/ru'
import classNames from 'classnames'
import Button from '@/components/ui/Button'
import BookmarkSvg from '@/components/svg/BookmarkSvg'
import ShareSvg from '@/components/svg/ShareSvg'
import CardLayout from '../../../CardLayout'
import Rating from '../../../Rating'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'


interface Props {
  item: IReceivingPoint
  cardLayoutClass?: string
  cardLayoutTitleClass?: string
}

export default function ContactsCard(props: Props) {

  const [showPhone, setShowPhone] = useState<boolean>(false)

  const date = new Date()
  const timeZone = 'Europe/Moscow'
  const hour = formatInTimeZone(date, timeZone, 'H', { locale: ru })

  const currentHour = Number(hour)

  const workTime = props.item.workTimes.find(i => i.receivingPointId === props.item.id)

  return (
    <CardLayout className={props.cardLayoutClass} titleClassName={props.cardLayoutTitleClass}
      title={props.item.name as string} additionalEl={<Rating rating={props.item.rating} />} topClassName={styles.top}>
      <div className={styles.middle}>
        <div className={styles.phone}>
          <PhoneSvg color={colors.dark500} />
          <div className={styles.phoneNumber}>
            {props.item.phones && props.item.phones.slice(0, showPhone ? props.item.phones.length : props.item.phones.length - 6)}
            {showPhone ? <></> : <> ...</>}</div>
          <div className={styles.show}
            onClick={() => setShowPhone(!showPhone)}>
            {showPhone ? <> Скрыть номер</> : <> Показать номер</>}
          </div>
        </div>
        <div className={styles.properties}>
          <div className={styles.property}>
            <DeliverySvg color={props.item.hasDelivery ? colors.dark500 : colors.grey500} />
            <div className={classNames(styles.text, { [styles.inactiveText]: !props.item.hasDelivery })}>
              {props.item.hasDelivery ? <>Есть доставка</> : <>Нет доставки</>}</div>
          </div>
          <div className={styles.property}>
            <LoadingSvg color={props.item.hasLoading ? colors.dark500 : colors.grey500} />
            <div className={classNames(styles.text, { [styles.inactiveText]: !props.item.hasLoading })}>
              {props.item.hasLoading ? <>Есть погрузка</> : <>Нет погрузки</>}</div>
          </div>
          <div className={styles.property}>
            <TimeSvg color={(workTime?.startAt && currentHour >= +workTime?.startAt &&
              workTime.finishAt && currentHour < +workTime.finishAt) ? colors.dark500 : colors.grey500} />
            <div className={classNames(styles.text, {
              [styles.inactiveText]: !(workTime?.startAt && currentHour >= +workTime?.startAt &&
                workTime.finishAt && currentHour < +workTime.finishAt)
            })}>
              {(workTime?.startAt && currentHour >= +workTime?.startAt &&
                workTime.finishAt && currentHour < +workTime.finishAt) ?
                <>Открыто сейчас</> : <>Закрыто</>
              }
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button className={styles.suggest} styleType='large' color='lightBlue'>
          Предложить сделку
        </Button>
        <Button className={styles.btn} styleType='large' color='grey'>
          <BookmarkSvg color={colors.blue500} />
        </Button>
        <Button className={styles.btn} styleType='large' color='grey'>
          <ShareSvg color={colors.blue500} />
        </Button>
      </div>
    </CardLayout >
  )
}