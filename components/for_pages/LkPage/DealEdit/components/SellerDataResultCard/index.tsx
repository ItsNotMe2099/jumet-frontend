import styles from './index.module.scss'
import DealStepResultCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepResultCardLayout'
import {useDealContext} from '@/context/deal_state'
import DescField from '@/components/ui/DescField'
import UserUtils from '@/utils/UserUtils'
import DealUtils from '@/utils/DealUtils'
import {useAppContext} from '@/context/state'
import PassportDataViewSection from '@/components/for_pages/Common/PassportDataViewSection'

interface Props {
}

export default function SellerDataResultCard(props: Props) {
  const appContext = useAppContext()
  const dealContext = useDealContext()
  const deal = dealContext?.deal!
  const passportData = dealContext.deal?.representative?.passport ?? dealContext?.deal?.seller?.passport
  return (
    <DealStepResultCardLayout title={'Данные продавца'} date={dealContext.deal!.setUpAt}>
      <div className={styles.root}>
        <DescField label={'ФИО продавца'} value={`${UserUtils.getName(deal!.seller)}`}/>
        {dealContext.deal?.representative && <DescField label={'ФИО представителя продавца'} value={`${UserUtils.getName(dealContext.deal.representative)}`}/>}
        {passportData && <PassportDataViewSection scanModalTitle={dealContext.deal?.representative?.passport ? 'Скан паспорта представителя' : 'Скан паспорта'} passportData={passportData}/>}
        {deal.requiresDelivery &&
          <DescField label={'Удобное время доставка'} value={DealUtils.formatDeliveryTime(deal)}/>}
        <DescField label={'Предпочитаемый способ оплаты'} value={DealUtils.getPaymentType(deal.paymentType)}/>
      </div>
    </DealStepResultCardLayout>

  )
}
