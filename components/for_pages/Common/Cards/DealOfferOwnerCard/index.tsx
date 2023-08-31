import styles from 'components/for_pages/Common/Cards/DealOfferOwnerCard/index.module.scss'
import JumetSvg from '@/components/svg/JumetSvg'
import { colors } from '@/styles/variables'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import { IDealOffer } from '@/data/interfaces/IDealOffer'
import { DealOfferStatus } from '@/data/enum/DealOfferStatus'
import {MouseEventHandler, useEffect, useState} from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import ChevronUpSvg from '@/components/svg/ChevronUpSvg'
import WeightUtils from '@/utils/WeightUtils'
import Formatter from '@/utils/formatter'
import Link from 'next/link'
import {Routes} from '@/types/routes'
import StatusBadge from '@/components/ui/StatusBadge'
import ImageHelper from '@/utils/ImageHelper'
import Image from 'next/image'
import {Preset} from '@/types/enums'
import Badge from '@/components/ui/Badge'
import {NotificationUnreadType} from '@/data/interfaces/INotification'
import {useNotificationContext} from '@/context/notifications_state'
import NotificationBadge from '@/components/ui/NotificationBadge'

interface Props {
  saleRequest: ISaleRequest
  dealOffer?: IDealOffer
  active?: boolean
}

const DealOfferOwnerCardInner = ({ saleRequest, dealOffer, active }: Props) => {
  const [showOffer, setShowOffer] = useState<boolean>(false)

  const createdAt = Formatter.formatDateRelative(dealOffer?.createdAt ?? saleRequest.createdAt)
  const link = dealOffer?.deal ? Routes.lkDeal(dealOffer.deal.id) : (saleRequest.receivingPointId ? Routes.saleRequestPrivate(saleRequest.id) : Routes.saleRequest(saleRequest.id))
  const handleShowOffer: MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
     setShowOffer(!showOffer)
  }
  return (
    <Link href={link} className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.top}>
            <div className={styles.first}>
              <Link  href={link} className={styles.weight}>
                {saleRequest.weight > 0 ? WeightUtils.formatWeight(saleRequest.weight) : 'Вес не указан'}
              </Link>
              <Link href={link} className={styles.number}>
                Заявка №{saleRequest.id}
              </Link>
              {dealOffer?.deal && <Link href={Routes.lkDeal(dealOffer.deal.id)} className={styles.number}>
                Сделка №{dealOffer.deal.id}
              </Link>}
            </div>
            <div className={styles.second}>
              {dealOffer && <StatusBadge<DealOfferStatus> data={{
                [DealOfferStatus.Applied]: {color: 'blue', label: 'На рассмотрении'},
                [DealOfferStatus.Accepted]: {color: 'blue', label: 'Принято (Открыта сделка)'},
                [DealOfferStatus.Rejected]: {color: 'blue', label: 'Отклонено'},
              }} value={dealOffer.status!}/>}
              {active && <NotificationBadge position={'static'} empty className={styles.badge} color={'blue'}/>}

            </div>

          </div>
          <div className={styles.middle}>
            {saleRequest.address.address}
          </div>
          {(saleRequest.scrapMetalCategory ||saleRequest.price > 0) && <div className={styles.bottom}>
            {saleRequest.scrapMetalCategory && <Badge active text={saleRequest.scrapMetalCategory} />}
            {saleRequest.price > 0 && <Badge active text={`От ${Formatter.formatPrice(saleRequest.price)}`} />}
          </div>}
          {dealOffer &&  <div className={styles.offer} onClick={handleShowOffer}>
            <div className={styles.text}>
              Ваше предложение
            </div>
            {!showOffer ? <ChevronDownSvg color={colors.grey500} /> : <ChevronUpSvg color={colors.grey500} />}
          </div>}
        </div>
        <div className={styles.right}>
          {(saleRequest.photos?.length ?? 0) > 0 ?
            <Image src={ImageHelper.urlFromFile(saleRequest.photos[0], Preset.smCrop)} alt='' fill unoptimized />
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
              {dealOffer?.price ? `${Formatter.formatPrice(dealOffer.price, '₽/т')}` : 'Цена не указана'}
            </div>
            <div className={styles.badge}>
              Доставка - {dealOffer?.deliveryPrice ? `${Formatter.formatPrice(dealOffer?.deliveryPrice, '₽/т')}` : dealOffer?.deliveryPrice === 0  ? 'бесплатно' : 'не нужна'}
            </div>
            <div className={styles.badge}>
              Погрузка - {dealOffer?.loadingPrice ? `${Formatter.formatPrice(dealOffer?.loadingPrice, '₽/т')}` : dealOffer?.loadingPrice === 0  ? 'бесплатно' : 'не нужна'}
            </div>
          </div>
          <div className={styles.cover}>
            {dealOffer?.coverLetter}
          </div>
        </div>}
    </Link>
  )
}

export function DealOfferOwnerCard(props: Props) {
  const dealOffer = props.dealOffer
  const notifyContext = useNotificationContext()
  const active = notifyContext.store[NotificationUnreadType.dealOffer].find(i => i.eId === dealOffer!.id)
  useEffect(() => {
    console.log('AddDealOffer1', dealOffer?.id)
    notifyContext.addRecord(dealOffer!.id, NotificationUnreadType.dealOffer)
    return () => {
      console.log('RemoveDealOffer1', dealOffer?.id)
      notifyContext.removeRecord(dealOffer!.id, NotificationUnreadType.dealOffer)
    }
  }, [])
  useEffect(() => {
    if (active) {
      notifyContext.markRead(dealOffer!.id, NotificationUnreadType.dealOffer, true)
    }
  }, [active])
  return <DealOfferOwnerCardInner {...props} active={!!active}/>
}

export function SaleRequestSearchCard(props: Props) {
  return <DealOfferOwnerCardInner {...props}/>
}
