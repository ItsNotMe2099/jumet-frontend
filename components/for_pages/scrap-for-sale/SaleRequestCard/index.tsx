import styles from './index.module.scss'
import Image from 'next/image'
import JumetSvg from '@/components/svg/JumetSvg'
import { colors } from '@/styles/variables'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import { IDealOffer } from '@/data/interfaces/IDealOffer'
import { DealOfferStatus } from '@/data/enum/DealOfferStatus'
import { useState } from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import ChevronUpSvg from '@/components/svg/ChevronUpSvg'
import WeightUtils from '@/utils/WeightUtils'
import Formatter from '@/utils/formatter'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import StatusBadge from '@/components/ui/StatusBadge'

interface Props {
  item: ISaleRequest
  dealOffer?: IDealOffer
}

export default function SaleRequestCard({ item, dealOffer }: Props) {

  const [showOffer, setShowOffer] = useState<boolean>(false)

  const createdAt = Formatter.formatDateRelative(dealOffer?.createdAt ?? item.createdAt)

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.top}>
            <div className={styles.first}>
              <Link  href={Routes.saleRequest(item.id)} className={styles.weight}>
                {item.weight > 0 ? WeightUtils.formatWeight(item.weight) : 'Вес не указан'}
              </Link>
              <Link href={Routes.saleRequest(item.id)} className={styles.number}>
                Заявка №{item.id}
              </Link>
            </div>
            <div>
              {dealOffer && <StatusBadge<DealOfferStatus> data={{
                [DealOfferStatus.Applied]: {color: 'blue', label: 'На рассмотрении'},
                [DealOfferStatus.Accepted]: {color: 'blue', label: 'Принято (Открыта сделка)'},
                [DealOfferStatus.Rejected]: {color: 'blue', label: 'Отклонено'},
              }} value={dealOffer.status!}/>}
            </div>
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
                От {Formatter.formatPrice(item.price)}
              </div> : null}
          </div>
          {dealOffer &&  <div className={styles.offer} onClick={() => setShowOffer(!showOffer)}>
            <div className={styles.text}>
              Ваше предложение
            </div>
            {!showOffer ? <ChevronDownSvg color={colors.grey500} /> : <ChevronUpSvg color={colors.grey500} />}
          </div>}
        </div>
        <div className={styles.right}>
          {item.photos && item.photos[0].source ?
            <Image src={item.photos[0].source} alt='' fill />
            :
            <JumetSvg color={colors.white} />
          }
        </div>
        {dealOffer && <div className={styles.offerMobile} onClick={() => setShowOffer(!showOffer)}>
          <div className={styles.text}>
            Ваше предложение
          </div>
          {!showOffer ? <ChevronDownSvg color={colors.grey500} /> : <ChevronUpSvg color={colors.grey500} />}
        </div>}
      </div>
      {showOffer &&
        <div className={styles.letter}>
          <div className={styles.header}>
            <div className={styles.title}>
              Предложение покупателю
            </div>
            <div className={styles.date}>
              {createdAt}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.badge}>
              {dealOffer?.price ? `${Formatter.formatPrice(dealOffer.price)}` : 'Цена не указана'}
            </div>
            <div className={styles.badge}>
              Доставка - {dealOffer?.deliveryPrice ? `${Formatter.formatPrice(dealOffer?.deliveryPrice)}` : 'бесплатно'}
            </div>
            <div className={styles.badge}>
              Погрузка - {dealOffer?.loadingPrice ? `${Formatter.formatPrice(dealOffer?.loadingPrice)}` : 'бесплатно'}
            </div>
          </div>
          <div className={styles.cover}>
            {dealOffer?.coverLetter}
          </div>
        </div>}
    </div>
  )
}
