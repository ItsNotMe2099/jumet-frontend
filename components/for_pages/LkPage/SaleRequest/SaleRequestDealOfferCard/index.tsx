import CardLayout from 'components/for_pages/Common/CardLayout'
import styles from 'components/for_pages/LkPage/SaleRequest/SaleRequestDealOfferCard/index.module.scss'
import Button from '@/components/ui/Button'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'
import {DealOfferWrapper, useDealOfferContext} from '@/context/deal_offer_state'
import Formatter from '@/utils/formatter'
import {IDealOffer} from '@/data/interfaces/IDealOffer'
import StatusBadge from '@/components/ui/StatusBadge'
import {DealOfferStatus} from '@/data/enum/DealOfferStatus'

interface Props {
  dealOffer: IDealOffer
}

const SaleRequestDealOfferCardInner = (props: Props) => {
  const dealOfferContext = useDealOfferContext()
  const dealOffer = dealOfferContext.dealOffer!
  const receivingPoint = dealOffer.receivingPoint

  const formatDate = dealOfferContext.dealOffer?.createdAt ? Formatter.formatDateRelative(dealOfferContext.dealOffer?.createdAt!) : null

  const badges = [
  ...(dealOffer.price  ? [{ text: dealOffer.price ? Formatter.formatDeliveryPrice(dealOffer.price) : '-' }] : []),
    { text: `Доставка – ${dealOffer.deliveryPrice ? Formatter.formatPrice(dealOffer.deliveryPrice) : 'бесплатно'}` },
    { text: `Погрузка – ${dealOffer.loadingPrice ? Formatter.formatPrice(dealOffer.loadingPrice) : 'бесплатно'}` }
  ]

  return (
    <CardLayout topClassName={styles.top} title={dealOffer.receivingPoint?.company?.name as string} contentClassName={styles.additional} additionalEl={
      <div className={styles.inner}>
        <StatusBadge<DealOfferStatus> data={{
          [DealOfferStatus.Applied]: {label: 'Новое предложение', color: 'blue'},
          [DealOfferStatus.Rejected]: {label: 'Отклонено', color: 'red'},
          [DealOfferStatus.Accepted]: {label: 'Принято', color: 'green'},
        }} value={dealOffer.status!}/>
        <div className={styles.date}>
          {formatDate}
        </div>
      </div>
    }>
      <div className={styles.root}>
        <div className={styles.address}>
          {receivingPoint?.address?.address}
        </div>
        <div className={styles.info}>
          {badges.map((i, index) =>
            <div className={styles.badge} key={index}>
              {i.text}
            </div>
          )}
        </div>
        {dealOffer.coverLetter && <div className={styles.desc}>
          {dealOffer.coverLetter}
        </div>}
        <div className={styles.controls}>
          <div className={styles.right}>
            {([DealOfferStatus.Applied] as DealOfferStatus[]).includes(dealOffer.status) && <>
            <Button spinner={dealOfferContext.acceptLoading} disabled={dealOfferContext.acceptLoading || dealOfferContext.rejectLoading}  color='blue' styleType='large' onClick={() => dealOfferContext.accept()}>
              Принять предложение
            </Button>
            <Button spinner={dealOfferContext.rejectLoading} disabled={dealOfferContext.acceptLoading || dealOfferContext.rejectLoading} className={styles.btn} color='grey' styleType='large' onClick={() => dealOfferContext.reject()}>
              Отклонить
            </Button>
            </>}
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


export default function SaleRequestDealOfferCard(props: Props) {
  return (<DealOfferWrapper dealOffer={props.dealOffer} dealOfferId={props.dealOffer.id!}>
      <SaleRequestDealOfferCardInner dealOffer={props.dealOffer}/>
  </DealOfferWrapper>)
}
