import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import styles from 'components/for_pages/Common/Cards/SaleRequestOwnerCard/index.module.scss'
import {format} from 'date-fns'
import Button from '@/components/ui/Button'
import EditSvg from '@/components/svg/EditSvg'
import {colors} from '@/styles/variables'
import JumetSvg from '@/components/svg/JumetSvg'
import Formatter from '@/utils/formatter'
import {Routes} from '@/types/routes'
import Link from 'next/link'
import {SaleRequestOwnerWrapper, useSaleRequestOwnerContext} from '@/context/sale_request_owner_state'
import WeightUtils from '@/utils/WeightUtils'
import ChatSvg from '@/components/svg/ChatSvg'
import StatusBadge from '@/components/ui/StatusBadge'
import {SaleRequestStatus} from '@/data/enum/SaleRequestStatus'
import Image from 'next/image'
import ImageHelper from '@/utils/ImageHelper'
import {Preset} from '@/types/enums'
import {IOption} from '@/types/types'
import {ReactElement} from 'react'
import NotificationBadge from '@/components/ui/NotificationBadge'

interface FieldProps {
  item: IOption<number | string | ReactElement>
}

function Field(props: FieldProps) {
  return (<div className={styles.item}>
    <div className={styles.top}>
      {props.item.label}
    </div>
    <div className={styles.bottom}>
      {props.item.value}
    </div>
  </div>)
}

interface Props {
  item: ISaleRequest
  mode: 'seller' | 'buyer'
}

const SaleRequestOwnerCardInner = (props: Props) => {
  const saleRequestOwnerContext = useSaleRequestOwnerContext()
  const item = saleRequestOwnerContext.saleRequest!
  const options: IOption<string>[] = [
    {label: 'Примерный вес', value: `${WeightUtils.formatWeight(item.weight)}`},
    {label: 'Цена', value: item.price ? Formatter.formatPrice(item.price) : 'Не указана'},
    {label: 'Категория лома', value: item.scrapMetalCategory ?? '-'},
    {label: 'Доставка', value: item.requiresDelivery ? 'Нужна доставка' : '-'},
    {label: 'Погрузка', value: item.requiresDelivery ? 'Нужна погрузка' : '-'},
    {label: 'Дата создания', value: format(new Date(item.createdAt), 'dd.MM.yyyy г.')}
  ]
  const link = props.mode === 'seller' ? Routes.lkSaleRequest(item.id) : item.receivingPointId ? Routes.saleRequestPrivate(item.id) : Routes.saleRequest(item.id)
  return (<Link href={link} className={styles.root}>
    <div className={styles.left}>
      {props.mode === 'seller' && <div className={styles.title}>
        Заявка №{item.id}
      </div>}
      {props.mode === 'buyer' && <div className={styles.leftTop}>
        <div className={styles.title}>
          {WeightUtils.formatWeight(item.weight)}
        </div>
        <StatusBadge<SaleRequestStatus> data={{
          [SaleRequestStatus.Published]: {label: 'Новое предложение', color: 'blue'},
          [SaleRequestStatus.Draft]: {label: 'Новое предложение', color: 'blue'},
          [SaleRequestStatus.Completed]: {label: 'Выполнено', color: 'green'},
          [SaleRequestStatus.Rejected]: {label: 'Отклонено', color: 'red'},
          [SaleRequestStatus.Accepted]: {label: 'Принято', color: 'green'},
        }} value={item.status!}/>
        <div className={styles.date}>{Formatter.formatDateRelative(item.createdAt)}</div>
      </div>}
      <div className={styles.middle}>
        <div className={styles.info}>
          <div className={styles.first}>
            {[...options].slice(0, 3).map((i, index) => <Field key={index} item={i}/>)}
          </div>
          <div className={styles.second}>
            {[...options].slice(-3).map((i, index) => <Field key={index} item={i}/>)}
          </div>
        </div>
        {props.mode === 'seller' && <div className={styles.controls}>
          <Button href={Routes.lkSaleRequest(item.id)} className={styles.btnFirst} color='blue' styleType='large'>
            Открыть предложения {item.offersCount ?? '0'} {item.newOffersCount > 0 &&
            <NotificationBadge className={styles.notificationBadge} position={'static'} size={'large'} color={'white'}
                               total={item.newOffersCount}/>}
          </Button>
          <Button onClick={saleRequestOwnerContext.edit} className={styles.btn} color='grey' styleType='large'
                  icon={<EditSvg color={colors.blue500}/>}>
            Редактировать заявку
          </Button>
        </div>}
        {props.mode === 'buyer' && <div className={styles.controls}>
          {([SaleRequestStatus.Published, SaleRequestStatus.Draft] as SaleRequestStatus[]).includes(item.status) && <>
            <Button spinner={saleRequestOwnerContext.acceptLoading}
                    disabled={saleRequestOwnerContext.acceptLoading || saleRequestOwnerContext.rejectLoading}
                    color='blue' styleType='large' onClick={() => saleRequestOwnerContext.accept()}>
              Принять предложение
            </Button>
            <Button spinner={saleRequestOwnerContext.rejectLoading}
                    disabled={saleRequestOwnerContext.acceptLoading || saleRequestOwnerContext.rejectLoading}
                    className={styles.btn} color='grey' styleType='large'
                    onClick={() => saleRequestOwnerContext.reject()}>
              Отклонить
            </Button>
            <div className={styles.controlsSeparator}></div>
          </>}
          <Button href={Routes.lkChat(null, {receivingPointId: item.receivingPointId, sellerId: item.ownerId})} className={styles.btn} color='grey' styleType='large' icon={<ChatSvg color={colors.blue500}/>}>
            Чат с продавцом
          </Button>
        </div>}
      </div>
    </div>
    <div className={styles.right}>
      {(item.photos?.length ?? 0) > 0 ?
        <Image src={ImageHelper.urlFromFile(item.photos[0], Preset.mdCrop)} alt='' fill unoptimized/>
        :
        <JumetSvg color={colors.white}/>
      }
    </div>
  </Link>)

}
export default function SaleRequestOwnerCard(props: Props) {
  return <SaleRequestOwnerWrapper saleRequestId={props.item.id} saleRequest={props.item}>
    <SaleRequestOwnerCardInner item={props.item} mode={props.mode}/>
  </SaleRequestOwnerWrapper>
}
