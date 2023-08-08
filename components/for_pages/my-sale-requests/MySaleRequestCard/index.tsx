import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import styles from './index.module.scss'
import { format } from 'date-fns'
import Button from '@/components/ui/Button'
import EditSvg from '@/components/svg/EditSvg'
import { colors } from '@/styles/variables'
import JumetSvg from '@/components/svg/JumetSvg'
import Formatter from '@/utils/formatter'
import {Routes} from '@/types/routes'
import Link from 'next/link'
import {SaleRequestOwnerWrapper, useSaleRequestOwnerContext} from '@/context/sale_request_owner_state'
import WeightUtils from '@/utils/WeightUtils'
interface Props {
  item: ISaleRequest
  number?: number
}

const MySaleRequestCardInner = ({ item, number }: Props) => {
  const saleRequestOwnerContext = useSaleRequestOwnerContext()
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <Link href={Routes.saleRequest(item.id)} className={styles.title}>
          Заявка №{item.id}
        </Link>
        <div className={styles.middle}>
          <div className={styles.info}>
            <div className={styles.first}>
              <div className={styles.item}>
                <div className={styles.top}>
                  {item.weight ?  `${WeightUtils.formatWeight(item.weight)}` : 'Не указан'}
                </div>
                <div className={styles.bottom}>
                  Примерный вес
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.top}>
                  {item.price ? Formatter.formatPrice(item.price) : <>Не указана</>}
                </div>
                <div className={styles.bottom}>
                  Цена
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.top}>
                  {item.scrapMetalCategory ? item.scrapMetalCategory : 'не указан'}
                </div>
                <div className={styles.bottom}>
                  Категория лома
                </div>
              </div>
            </div>
            <div className={styles.second}>
              {item.requiresDelivery && <div className={styles.item}>
                <div className={styles.top}>
                  Нужна доставка
                </div>
                <div className={styles.bottom}>
                  Доставка
                </div>
              </div>}
              {item.requiresLoading && <div className={styles.item}>
                <div className={styles.top}>
                  Нужна погрузка
                </div>
                <div className={styles.bottom}>
                  Погрузка
                </div>
              </div>}
              <div className={styles.item}>
                <div className={styles.top}>
                  {format(new Date(item.createdAt), 'dd.MM.yyyy')}
                </div>
                <div className={styles.bottom}>
                  Дата создания
                </div>
              </div>
            </div>
          </div>
          <div className={styles.controls}>
            <Button href={Routes.lkSaleRequest(item.id)} className={styles.btnFirst} color='blue' styleType='large'>
              Открыть предложения {item.contacts.length ? item.contacts.length : null} {number && <div className={styles.plus}>+{number}</div>}
            </Button>
            <Button onClick={saleRequestOwnerContext.edit} className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
              Редактировать заявку
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <JumetSvg color={colors.white} />
      </div>
    </div>
  )
}
export default function MySaleRequestCard(props: Props) {
  return <SaleRequestOwnerWrapper saleRequestId={props.item.id} saleRequest={props.item}>
    <MySaleRequestCardInner item={props.item}/>
  </SaleRequestOwnerWrapper>
}
