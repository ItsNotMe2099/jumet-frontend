import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import IPointData from '@/data/interfaces/IPointData'
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
import CardLayout from '../../CardLayout'
import Rating from '../../Rating'


interface Props {
  item: IPointData
}

export default function ContactsCard(props: Props) {

  const [showPhone, setShowPhone] = useState<boolean>(false)

  const date = new Date()
  const timeZone = 'Europe/Moscow'
  const hour = formatInTimeZone(date, timeZone, 'H', { locale: ru })

  const currentHour = Number(hour)

  return (
    <CardLayout title={props.item.title} additionalEl={<Rating rating={props.item.rating} />} topClassName={styles.top}>
      <div className={styles.middle}>
        <div className={styles.phone}>
          <PhoneSvg color={colors.dark500} />
          <div className={styles.phoneNumber}>
            {props.item.phone.slice(0, showPhone ? props.item.phone.length : props.item.phone.length - 6)}
            {showPhone ? <></> : <> ...</>}</div>
          <div className={styles.show}
            onClick={() => setShowPhone(!showPhone)}>
            {showPhone ? <> Скрыть номер</> : <> Показать номер</>}
          </div>
        </div>
        <div className={styles.properties}>
          <div className={styles.property}>
            <DeliverySvg color={props.item.isDelivery ? colors.dark500 : colors.grey500} />
            <div className={classNames(styles.text, { [styles.inactiveText]: !props.item.isDelivery })}>{props.item.isDelivery ? <>Есть доставка</> : <>Нет доставки</>}</div>
          </div>
          <div className={styles.property}>
            <LoadingSvg color={props.item.haveLoading ? colors.dark500 : colors.grey500} />
            <div className={classNames(styles.text, { [styles.inactiveText]: !props.item.haveLoading })}>{props.item.haveLoading ? <>Есть погрузка</> : <>Нет погрузки</>}</div>
          </div>
          <div className={styles.property}>
            <TimeSvg color={(props.item.opens && currentHour >= +props.item.opens &&
              props.item.closes && currentHour < +props.item.closes || props.item.alwaysOpen) ? colors.dark500 : colors.grey500} />
            <div className={classNames(styles.text, {
              [styles.inactiveText]: !(props.item.opens && currentHour >= +props.item.opens &&
                props.item.closes && currentHour < +props.item.closes || props.item.alwaysOpen)
            })}>
              {(props.item.opens && currentHour >= +props.item.opens &&
                props.item.closes && currentHour < +props.item.closes || props.item.alwaysOpen) ?
                <>Открыто сейчас</> : <>Закрыто</>
              }
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button styleType='large' color='lightBlue'>
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