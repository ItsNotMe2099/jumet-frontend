import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import styles from './index.module.scss'
import { format } from 'date-fns'
import Button from '@/components/ui/Button'
import EditSvg from '@/components/svg/EditSvg'
import { colors } from '@/styles/variables'
import JumetSvg from '@/components/svg/JumetSvg'

interface Props {
  item: ISaleRequest
  number?: number
}

export default function SaleRequestCard({ item, number }: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.title}>
          Заявка №15
        </div>
        <div className={styles.info}>
          <div className={styles.item}>
            <div className={styles.top}>
              {item.weight} тонн
            </div>
            <div className={styles.bottom}>
              Примерный вес
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.top}>
              {item.price ? item.price : <>Не указана</>}
            </div>
            <div className={styles.bottom}>
              Цена
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.top}>
              {item.scrapMetalCategory}
            </div>
            <div className={styles.bottom}>
              Категория лома
            </div>
          </div>
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
        <div className={styles.controls}>
          <Button className={styles.btnFirst} color='blue' styleType='large'>
            Открыть предложения {item.contacts.length} {number && <div className={styles.plus}>+{number}</div>}
          </Button>
          <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
            Редактировать заявку
          </Button>
        </div>
      </div>
      <div className={styles.right}>
        <JumetSvg color={colors.white} />
      </div>
    </div>
  )
}
