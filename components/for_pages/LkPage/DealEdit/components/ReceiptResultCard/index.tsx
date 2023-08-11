import styles from 'components/for_pages/LkPage/DealEdit/components/ReceiptResultCard/index.module.scss'
import FileDownload from '@/components/ui/FileDownload'
import DealStepResultCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepResultCardLayout'
import {useDealContext} from '@/context/deal_state'
import ImageHelper from '@/utils/ImageHelper'
import DescField from '@/components/ui/DescField'
//import Formatter from '@/utils/formatter'



interface Props {

}

export default function ReceiptResultCard(props: Props) {
  const dealContext = useDealContext()
  return (
    <DealStepResultCardLayout title={'Квитанция об оплате'} date={dealContext.deal!.paidAt} >
      <div className={styles.root}>
        <DescField label={'Дата оплаты'} value={'-'}/>
        {dealContext.deal!.paymentReceipt && <FileDownload href={ImageHelper.urlFromFile(dealContext.deal!.paymentReceipt)} label='Квитанция об оплате' />}
      </div>
    </DealStepResultCardLayout>
  )
}
