import styles from '@/components/for_pages/ReceivingPoint/Cards/ContactsViewCard/index.module.scss'
import { colors } from '@/styles/variables'
import PhoneSvg from '@/components/svg/PhoneSvg'
import { useState } from 'react'
import DeliverySvg from '@/components/svg/DeliverySvg'
import LoadingSvg from '@/components/svg/LoadingSvg'
import TimeSvg from '@/components/svg/TimeSvg'
import classNames from 'classnames'
import Button from '@/components/ui/Button'
import BookmarkSvg from '@/components/svg/BookmarkSvg'
import ShareSvg from '@/components/svg/ShareSvg'
import Rating from '@/components/for_pages/Common/Rating'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import Formatter from '@/utils/formatter'
import { useAppContext } from '@/context/state'
import { ModalType } from '@/types/enums'

interface Props {
  receivingPoint: IReceivingPoint
}

export default function ContactsViewCard(props: Props) {
  const [showPhone, setShowPhone] = useState<boolean>(false)
  const isOpen = true
  const { receivingPoint } = props

  const appContext = useAppContext()

  console.log(props.receivingPoint)

  return (
    <ReceivingPointViewCard title={<div className={styles.header}>
      <div className={styles.title}>{receivingPoint.name ?? ''}</div>
      <Rating rating={receivingPoint.rating} /></div>}>
      <div className={styles.middle}>
        <div className={styles.phone}>
          <PhoneSvg color={colors.dark500} />
          {(receivingPoint.phones?.length ?? 0) > 0 && <div className={styles.phoneNumber}>
            {receivingPoint.phones?.map(i => Formatter.formatPhone(i).slice(0, showPhone ? Formatter.formatPhone(i).length : Formatter.formatPhone(i)?.length - 6))}
            {showPhone ? <></> : <> ...</>}</div>}
          <div className={styles.show}
            onClick={() => setShowPhone(!showPhone)}>
            {showPhone ? <> Скрыть номер</> : <> Показать номер</>}
          </div>
        </div>
        <div className={styles.properties}>
          <div className={styles.property}>
            <DeliverySvg color={receivingPoint.hasDelivery ? colors.dark500 : colors.grey500} />
            <div
              className={classNames(styles.text, { [styles.inactiveText]: !receivingPoint.hasDelivery })}>{receivingPoint.hasDelivery ? <>Есть
                доставка</> : <>Нет доставки</>}</div>
          </div>
          <div className={styles.property}>
            <LoadingSvg color={receivingPoint.hasLoading ? colors.dark500 : colors.grey500} />
            <div
              className={classNames(styles.text, { [styles.inactiveText]: !receivingPoint.hasLoading })}>{receivingPoint.hasLoading ? <>Есть
                погрузка</> : <>Нет погрузки</>}</div>
          </div>
          <div className={styles.property}>
            <TimeSvg color={isOpen ? colors.dark500 : colors.grey500} />
            <div className={classNames(styles.text, {
              [styles.inactiveText]: !isOpen
            })}>
              {isOpen ? <>Открыто сейчас</> : <>Закрыто</>}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button onClick={() => appContext.showModal(ModalType.SaleRequestOffer, props.receivingPoint.id)} className={styles.suggest} styleType='large' color='lightBlue'>
          Предложить сделку
        </Button>
        <Button className={styles.btn} styleType='large' color='grey'>
          <BookmarkSvg color={colors.blue500} />
        </Button>
        <Button className={styles.btn} styleType='large' color='grey'>
          <ShareSvg color={colors.blue500} />
        </Button>
      </div>
    </ReceivingPointViewCard>
  )
}
