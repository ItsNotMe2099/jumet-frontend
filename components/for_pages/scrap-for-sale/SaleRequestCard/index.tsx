import styles from './index.module.scss'
import Image from 'next/image'
import JumetSvg from '@/components/svg/JumetSvg'
import { colors } from '@/styles/variables'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import { IDealOffer } from '@/data/interfaces/IDealOffer'
import classNames from 'classnames'
import { DealOfferStatus } from '@/data/enum/DealOfferStatus'
import { useState } from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import ChevronUpSvg from '@/components/svg/ChevronUpSvg'
import { format, isToday } from 'date-fns'
import { ru } from 'date-fns/locale'

interface Props {
  item: ISaleRequest
  dealOffer?: IDealOffer
}

export default function SaleRequestCard({ item, dealOffer }: Props) {

  const [show, setShow] = useState<boolean>(false)

  let formatDate: string | null = null

  if (dealOffer && dealOffer.createdAt) {
    const createdAtDate = new Date(dealOffer.createdAt)
    formatDate = isToday(createdAtDate)
      ? format(createdAtDate, 'HH:mm', { locale: ru })
      : format(createdAtDate, 'dd MMMM', { locale: ru })
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.top}>
            <div className={styles.weight}>
              {item.weight > 0 ? `${item.weight} тонн` : 'Вес не указан'}
            </div>
            <div className={styles.number}>
              Заявка №{item.id}
            </div>
            {dealOffer && <div className={classNames(styles.status,
              {
                [styles.applied]: dealOffer.status === DealOfferStatus.Applied,
                [styles.accepted]: dealOffer.status === DealOfferStatus.Accepted,
                [styles.rejected]: dealOffer.status === DealOfferStatus.Rejected,
              })}>
              {dealOffer.status}</div>}
          </div>
          <div className={styles.middle}>
            {item.address.address}
          </div>
          <div className={styles.bottom}>
            <div className={styles.item}>
              {item.scrapMetalCategory ? <>Категория {item.scrapMetalCategory}</> : 'Категория не указана'}
            </div>
            {item.price ?
              <div className={styles.item}>
                От {item.price} ₽
              </div> : null}
          </div>
          <div className={styles.offer} onClick={() => setShow(!show)}>
            <div className={styles.text}>
              Ваше предложение
            </div>
            {!show ? <ChevronDownSvg color={colors.grey500} /> : <ChevronUpSvg color={colors.grey500} />}
          </div>
        </div>
        <div className={styles.right}>
          {item.photos && item.photos[0].source ?
            <Image src={item.photos[0].source} alt='' fill />
            :
            <JumetSvg color={colors.white} />
          }
        </div>
      </div>
      {show &&
        <div className={styles.letter}>
          <div className={styles.header}>
            <div className={styles.title}>
              Предложение покупателю
            </div>
            <div className={styles.date}>
              {formatDate && (isToday(new Date(dealOffer?.createdAt as Date)) ? 'Сегодня ' : '') + formatDate}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.badge}>
              {dealOffer?.price ? `${dealOffer?.price} ₽/т` : 'Цена не указана'}
            </div>
            <div className={styles.badge}>
              Доставка - {dealOffer?.deliveryPrice ? `${dealOffer?.deliveryPrice} ₽` : 'бесплатно'}
            </div>
            <div className={styles.badge}>
              Погрузка - {dealOffer?.loadingPrice ? `${dealOffer?.loadingPrice} ₽` : 'бесплатно'}
            </div>
          </div>
          <div className={styles.cover}>
            {dealOffer?.coverLetter}
          </div>
        </div>}
    </div>
  )
}
