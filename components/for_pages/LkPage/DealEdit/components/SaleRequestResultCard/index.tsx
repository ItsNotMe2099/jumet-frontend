import styles from './index.module.scss'
import { IDealOffer } from '@/data/interfaces/IDealOffer'
import Badge from '@/components/ui/Badge'
import DealStepResultCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepResultCardLayout'
import DescField from '@/components/ui/DescField'
import {useDealContext} from '@/context/deal_state'
import Formatter from '@/utils/formatter'
import WeightUtils from '@/utils/WeightUtils'


interface Props {
  offer?: IDealOffer
  initialOpen?: boolean
}

export default function SaleRequestResultCard(props: Props) {
  const dealContext = useDealContext()
  const deal = dealContext.deal!
  const saleRequest = deal.saleRequest!
  if(!saleRequest){
    return null
  }
  return (
    <DealStepResultCardLayout title={'Заявка на продажу'} date={saleRequest.createdAt} initialOpen={props.initialOpen ?? false} >
      <div className={styles.root}>
        {saleRequest.weight && <div className={styles.weight}>{WeightUtils.formatWeight(saleRequest.weight)}</div>}
        <div className={styles.badges}>
          {saleRequest.scrapMetalCategory && <Badge active text={`Категория ${saleRequest.scrapMetalCategory}`} />}
          {saleRequest.price && <Badge active text={`От ${Formatter.formatPrice(saleRequest.price, '₽/т')}`} />}
        </div>
        <DescField label={'Доставка'} value={saleRequest.requiresDelivery ? 'Нужна доставка' : 'Не нужна'}/>
        <DescField label={'Погрузка'} value={saleRequest.requiresLoading ? 'Нужна погрузка' : 'Не нужна'}/>
        <DescField label={'Покупатель'} value={deal.receivingPoint?.company?.name}/>
        <DescField label={'Адрес расположения лома'} value={deal.receivingPoint?.address?.address}/>
      </div>
    </DealStepResultCardLayout>

  )
}
