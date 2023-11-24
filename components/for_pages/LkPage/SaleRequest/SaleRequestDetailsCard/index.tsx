import Button from '@/components/ui/Button'
import CardLayout from 'components/for_pages/Common/CardLayout'
import styles from 'components/for_pages/LkPage/SaleRequest/SaleRequestDetailsCard/index.module.scss'
import EditSvg from '@/components/svg/EditSvg'
import {colors} from '@/styles/variables'
import {ReactElement, useState} from 'react'
import ChevronUpSvg from '@/components/svg/ChevronUpSvg'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'
import {useSaleRequestOwnerContext} from '@/context/sale_request_owner_state'
import {SaleRequestStatus} from '@/data/enum/SaleRequestStatus'
import {IOption} from '@/types/types'
import WeightUtils from '@/utils/WeightUtils'
import Formatter from '@/utils/formatter'
import ImageFile from '@/components/ui/ImageFile'
import {ModalType, Preset} from '@/types/enums'
import {useAppContext} from '@/context/state'
import {GalleryModalArguments} from '@/types/modal_arguments'
import {Routes} from '@/types/routes'

interface FieldProps{
  item: IOption<string | null | ReactElement>
}
function Field(props: FieldProps) {
  return (<div className={styles.field}>
    <div className={styles.fieldLabel}>
      {props.item.label}
    </div>
    <div className={styles.fieldValue}>
      {props.item.value}
    </div>
  </div>)
}
interface Props {

}

export default function SaleRequestDetailsCard(props: Props) {
  const appContext = useAppContext()
  const saleRequestOwnerContext = useSaleRequestOwnerContext()
  const saleRequest = saleRequestOwnerContext.saleRequest!
  const [opened, setOpened] = useState<boolean>(false)
  const fields: IOption<string | ReactElement>[] = [
    {label: 'Адрес расположения лома' , value: saleRequest.address?.address ?? ''},
    {label: 'Примерный вес' , value: (saleRequest.weight ?? 0) > 0 ? WeightUtils.formatWeight(saleRequest.weight) : 'Не указан'},
    {label: 'Цена' , value: Formatter.formatDeliveryPrice(saleRequest.price)},
    {label: 'Категория лома' , value: saleRequest.scrapMetalCategory},
    ...(saleRequest.requiresDelivery ? [{label: 'Доставка' , value: 'Нужна доставка' }] : []),
    ...(saleRequest.requiresLoading ? [{label: 'Погрузка' , value: 'Нужна погрузка' }] : []),
    {label: 'Дата создания' , value: Formatter.formatDateRelative(saleRequest.createdAt)},
  ...((saleRequest.photos?.length ?? 0) > 0 ? [{label: 'Фото лома', value: <div className={styles.photos}>
      {saleRequest.photos.map((i, index) =>
        <ImageFile onClick={() => {
          appContext.showModal(ModalType.Gallery, {
            title: `Фото заявки № ${saleRequest.id}`,
            images: saleRequest.photos,
            selectedSource: i.source,
          } as GalleryModalArguments)
        }} className={styles.image} preset={Preset.xsResize} key={i.id} file={i} />
      )}
  </div>}] : [])
  ]
  const fieldsView = fields.map((i, index) => <Field key={index} item={i}/>)
  return (
    <CardLayout title={''}>
      <div className={styles.root}>
        {saleRequest?.status === SaleRequestStatus.Published && <Button className={styles.btn} color='grey' styleType='large' onClick={() => saleRequestOwnerContext.unPublish()}>
          Остановить прием предложений
        </Button>}
        {saleRequest?.status === SaleRequestStatus.Draft && <Button className={styles.btn} color='grey' styleType='large' onClick={() => saleRequestOwnerContext.publish()}>
          Возобновить прием предложений
        </Button>}
        <Button className={styles.btn} onClick={saleRequestOwnerContext.edit} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
          Редактировать заявку
        </Button>
        {saleRequest?.status === SaleRequestStatus.Published && <Button href={Routes.lkSaleRequest(saleRequestOwnerContext.saleRequestId)} className={styles.btn} onClick={saleRequestOwnerContext.edit} color='grey' styleType='large'>
          Предпросмотр
        </Button>}
        <div className={styles.infoMobile}>
          <div className={styles.show} onClick={() => setOpened(!opened)}>
            <div className={styles.text}>Информация о заявке</div>
            {opened ? <ChevronUpSvg color={colors.blue500} /> : <ChevronDownSvg color={colors.blue500} />}
          </div>
          {opened && fieldsView}
        </div>
        <div className={styles.info}>
          {fieldsView}
        </div>
      </div>
    </CardLayout>
  )
}
