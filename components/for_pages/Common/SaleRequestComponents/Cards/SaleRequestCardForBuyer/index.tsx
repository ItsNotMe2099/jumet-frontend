import { format } from 'date-fns'
import CardLayout from '../../../CardLayout'
import styles from './index.module.scss'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import Button from '@/components/ui/Button'
import ShareSvg from '@/components/svg/ShareSvg'
import { colors } from '@/styles/variables'


interface Props {
  item: ISaleRequest
}

export default function SaleRequestCardForBuyer({ item }: Props) {

  const first = [
    { text1: 'Примерный вес', text2: item.weight },
    { text1: 'Цена', text2: item.price ? item.price : 'Не указана' },
    { text1: 'Категория лома', text2: item.scrapMetalCategory },
  ]

  const second = [
    { text1: 'Доставка', text2: 'Нужна доставка' },
    { text1: 'Погрузка', text2: 'Нужна погрузка' },
    { text1: 'Дата создания', text2: item.createdAt },
  ]

  return (
    <CardLayout title={'Заявка на продажу лома №256'} className={styles.card}>
      <div className={styles.info}>
        <div className={styles.top}>
          {first.map((i, index) =>
            <div className={styles.item} key={index}>
              <div className={styles.top}>
                {i.text1}
              </div>
              <div className={styles.bottom}>
                {i.text2} {index === 0 && 'тонн'}
              </div>
            </div>
          )}
        </div>
        <div className={styles.bottom}>
          {second.map((i, index) =>
            <div className={styles.item} key={index}>
              <div className={styles.top}>
                {i.text1}
              </div>
              <div className={styles.bottom}>
                {index === 2 ? format(new Date(i.text2), 'dd.MM.yyyy г.') : i.text2}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.controls}>
        <Button className={styles.suggest} styleType='large' color='blue'>
          Предложить сделку
        </Button>
        <Button className={styles.btn} styleType='large' color='grey'>
          <ShareSvg color={colors.blue500} />
        </Button>
      </div>
    </CardLayout>
  )
}