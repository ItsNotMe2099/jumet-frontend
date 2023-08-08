import { format } from 'date-fns'
import CardLayout from '../../../CardLayout'
import styles from './index.module.scss'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import Button from '@/components/ui/Button'
import { useAppContext } from '@/context/state'
import { ModalType } from '@/types/enums'
import Formatter from '@/utils/formatter'
import {IOption} from '@/types/types'
import ShareLinkButton from '@/components/ui/Buttons/ShareLinkButton'
import {Routes} from '@/types/routes'
import {UserRole} from '@/data/enum/UserRole'
import {useRouter} from 'next/router'
import {DealOfferModalArguments} from '@/types/modal_arguments'
import {ReactElement} from 'react'

interface FieldProps{
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
}

export default function SaleRequestCardForBuyer({ item }: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const options: IOption<string>[] = [
    {label: 'Примерный вес' , value: `${item.weight} ${Formatter.pluralize(item.weight, 'тонны', 'тонн', 'тонн')}`},
    {label: 'Цена' , value: item.price ? Formatter.formatPrice(item.price) : 'Не указана'},
    {label: 'Категория лома' , value: item.scrapMetalCategory ?? '-'},
    {label: 'Доставка' , value: item.requiresDelivery ? 'Нужна доставка' : '-' },
    {label: 'Погрузка' , value: item.requiresDelivery ? 'Нужна погрузка' : '-'},
    {label: 'Дата создания' , value: format(new Date(item.createdAt), 'dd.MM.yyyy г.')}
  ]
  const handleCreateOffer = () => {
    if(!appContext.isLogged){
      router.push(Routes.login(Routes.saleRequest(item.id)))
    }else{
      appContext.showModal(ModalType.DealOffer, {saleRequestId: item.id} as DealOfferModalArguments)
    }
  }
  return (
    <CardLayout titleClassName={styles.title} title={'Заявка на продажу лома №256'} className={styles.card}>
      <div className={styles.info}>
        <div className={styles.top}>
          {[...options].slice(0, 3).map((i, index) => <Field key={index} item={i}/>)}
        </div>
        <div className={styles.bottom}>
          {[...options].slice(-3).map((i, index) => <Field key={index} item={i}/>)}
        </div>
      </div>
      <div className={styles.controls}>
        {!appContext.isLogged || appContext?.aboutMe?.role === UserRole.Buyer && <Button onClick={handleCreateOffer} className={styles.suggest} styleType='large' color='blue'>
          Предложить сделку
        </Button>}
      <ShareLinkButton shareLink={Routes.saleRequest(item.id)}/>
      </div>
    </CardLayout>
  )
}
