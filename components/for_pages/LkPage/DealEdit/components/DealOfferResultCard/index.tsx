import styles from './index.module.scss'
import { IDealOffer } from '@/data/interfaces/IDealOffer'
import Badge from '@/components/ui/Badge'
import DealStepResultCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepResultCardLayout'
import DescField from '@/components/ui/DescField'
import {useDealContext} from '@/context/deal_state'
import Formatter from '@/utils/formatter'


interface Props {
  offer?: IDealOffer
  initialOpen?: boolean
}

export default function DealOfferResultCard(props: Props) {
  const dealContext = useDealContext()
  const deal = dealContext.deal!
  const dealOffer = deal.dealOffer!
  if(!dealOffer){
    return null
  }
  return (
    <DealStepResultCardLayout title={'Предложение покупателя'} date={dealOffer.createdAt} initialOpen={props.initialOpen ?? false}>
      <div className={styles.root}>
        <div className={styles.badges}>
          {dealOffer.price && <Badge active text={Formatter.formatPrice(dealOffer.price, '₽/т')} />}
          {dealOffer.deliveryPrice !== null && <Badge active text={`Доставка – ${dealOffer.deliveryPrice > 0 ? Formatter.formatPrice(dealOffer.deliveryPrice, '₽/т') : dealOffer.deliveryPrice  === 0 ? 'бесплатно' : 'не нужна'}`} />}
          {dealOffer.loadingPrice !== null && <Badge active text={`Погрузка – ${dealOffer.loadingPrice > 0 ? Formatter.formatPrice(dealOffer.loadingPrice, '₽/т') : dealOffer.loadingPrice  === 0 ? 'бесплатно' : 'не нужна'}`} />}
        </div>
        <DescField label={'Покупатель'} value={deal.receivingPoint?.company?.name}/>
        <DescField label={'Адрес пункта приёма'} value={deal.receivingPoint?.address?.address}/>
        {dealOffer.coverLetter && <DescField label={'Комментарий'} value={dealOffer.coverLetter}/>}
      </div>
    </DealStepResultCardLayout>

  )
}
