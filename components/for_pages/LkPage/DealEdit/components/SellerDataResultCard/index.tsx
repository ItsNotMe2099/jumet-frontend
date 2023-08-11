import styles from './index.module.scss'
import DealStepResultCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepResultCardLayout'
import {useDealContext} from '@/context/deal_state'
import DescField from '@/components/ui/DescField'
import UserUtils from '@/utils/UserUtils'
import DealUtils from '@/utils/DealUtils'
import ImageFile from '@/components/ui/ImageFile'
import {ModalType, Preset} from '@/types/enums'
import {GalleryModalArguments} from '@/types/modal_arguments'
import {useAppContext} from '@/context/state'

interface Props {
}

export default function SellerDataResultCard(props: Props) {
  const appContext = useAppContext()
  const dealContext = useDealContext()
  const deal = dealContext?.deal!
  const passportData = dealContext?.deal?.seller?.passportData
  return (
    <DealStepResultCardLayout title={'Данные продавца'} date={dealContext.deal!.setUpAt}>
      <div className={styles.root}>
        <DescField label={'ФИО продавца'} value={`${UserUtils.getName(deal!.seller)}`}/>
        {passportData?.scan && <div><ImageFile preset={Preset.mdResize} onClick={() => appContext.showModal(ModalType.Gallery, {
          title: 'Скан паспорта продавца',
          images: [passportData?.scan],
          selectedId: passportData?.scan!.id
        } as GalleryModalArguments)} className={styles.image} file={passportData.scan}/></div>}
        <DescField label={'Адрес регистрации'} value={passportData?.address}/>
        <DescField label={'Серия паспорта'} value={passportData?.series}/>
        <DescField label={'Номер паспорта'} value={passportData?.number}/>
        <DescField label={'Кем выдан'} value={passportData?.issuedBy}/>
        <DescField label={'Адрес рапсоложения лома'} value={passportData?.address}/>
        {deal.requiresDelivery &&
          <DescField label={'Удобное время доставка'} value={DealUtils.formatDeliveryTime(deal)}/>}
        <DescField label={'Предпочитаемый способ оплаты'} value={DealUtils.getPaymentType(deal.paymentType)}/>
      </div>
    </DealStepResultCardLayout>

  )
}
