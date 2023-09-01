import styles from 'components/for_pages/LkPage/DealEdit/components/WeighingtResultCard/index.module.scss'
import Button from '@/components/ui/Button'
import {useAppContext} from '@/context/state'
import {ModalType, Preset} from '@/types/enums'
import FileDownload from '@/components/ui/FileDownload'
import DealStepResultCardLayout from '@/components/for_pages/LkPage/DealEdit/components/DealStepResultCardLayout'
import DescField from '@/components/ui/DescField'
import {useDealContext} from '@/context/deal_state'
import WeightUtils from '@/utils/WeightUtils'
import ImageHelper from '@/utils/ImageHelper'
import ImageFile from '@/components/ui/ImageFile'
import {GalleryModalArguments} from '@/types/modal_arguments'
import Formatter from '@/utils/formatter'

//import Formatter from '@/utils/formatter'



interface Props {
  hasActions?: boolean
  initialOpen?: boolean
}

export default function WeighningResultCard(props: Props) {
  const appContext = useAppContext()
  const dealContext = useDealContext()
  const deal =dealContext.deal!
  const formatWeightWithRubbish = () => {
    return WeightUtils.formatWeight(deal.actualWeight - parseFloat((deal.actualWeight * (deal.actualRubbishInPercents / 100)).toFixed(2)))
  }
  const formatRubbish = () => {
    if(!deal.actualRubbishInPercents){
      return '0%'
    }
    return `${deal.actualRubbishInPercents}% (${formatWeightWithRubbish()})`
  }

  return (
    <DealStepResultCardLayout title={'Результат взвешивания'} date={deal.weighingAt} initialOpen={props.initialOpen ?? false} >
      <div className={styles.root}>
        <DescField label={'Общий вес лома'} value={WeightUtils.formatWeight(deal.actualWeight)}/>
        <DescField label={'Засор'} value={formatRubbish()}/>
        {deal.weighingComment && <DescField label={'Комментарий к качеству лома'} value={deal.weighingComment}/>}
        <DescField label={'Вес лома за вычетом засора'} value={formatWeightWithRubbish()}/>
        {!!deal.price && <DescField label={'Цена за тонну'} value={Formatter.formatDeliveryPrice(deal.price)}/>}
        {(deal.requiresDelivery) && <DescField label={'Доставка'} value={`${Formatter.formatPrice(deal.totalDelivery ?? 0)} (${Formatter.formatDeliveryPrice(deal.deliveryPrice ?? 0)})`}/>}
        {(deal.requiresLoading) && <DescField label={'Погрузка'} value={`${Formatter.formatPrice(deal.totalLoading ?? 0)} (${Formatter.formatDeliveryPrice(deal.loadingPrice ?? 0)})`}/>}
        {(deal.requiresLoading || deal.requiresDelivery) && <DescField label={'Сумма без доставки и погрузки'} value={Formatter.formatPrice(deal.subTotal ?? 0)}/>}
        {!!deal.total && <DescField label={'К оплате'} value={Formatter.formatPrice(deal.total)}/>}
        {deal?.acceptanceCertificate && <FileDownload href={ImageHelper.urlFromFile(deal?.acceptanceCertificate)} label='Приёмо-сдаточный акт' />}
        {deal.weighingPhoto && <div><ImageFile preset={Preset.mdResize} onClick={() => appContext.showModal(ModalType.Gallery, {title: 'Фото подтверждения взвешивания лома', images: [deal.weighingPhoto], selectedId: deal.weighingPhoto.id} as GalleryModalArguments)} className={styles.image} file={deal.weighingPhoto} /></div>}
        {props.hasActions && <div className={styles.buttons}>
          <Button spinner={dealContext.editLoading} disabled={dealContext.terminateLoading} styleType='large' color='blue' onClick={() => dealContext.submitStepWeighingAccept()}>
            Подтвердить
          </Button>
          <Button disabled={dealContext.editLoading} spinner={dealContext.terminateLoading} onClick={() => dealContext.terminateBySeller()} styleType='large' color='greyRed'>
            Расторгнуть сделку
          </Button>
        </div>}
      </div>
    </DealStepResultCardLayout>

  )
}
