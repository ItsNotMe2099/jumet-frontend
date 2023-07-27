import Button from '@/components/ui/Button'
import CardLayout from '../../Common/CardLayout'
import styles from './index.module.scss'
import EditSvg from '@/components/svg/EditSvg'
import { colors } from '@/styles/variables'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import { format } from 'date-fns'
import Image from 'next/image'

interface Props {
  item: ISaleRequest
}

export default function SideCard({ item }: Props) {

  return (
    <CardLayout title={''}>
      <div className={styles.root}>
        <Button className={styles.btn} color='grey' styleType='large'>
          Остановить прием предложений
        </Button>
        <Button className={styles.btn} color='grey' styleType='large' icon={<EditSvg color={colors.blue500} />}>
          Редактировать заявку
        </Button>
        <div className={styles.info}>
          <div className={styles.item}>
            <div className={styles.top}>
              {item.address.address}
            </div>
            <div className={styles.bottom}>
              Адрес расположения лома
            </div>
          </div>
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
          {item.photos && <div className={styles.item}>
            <div className={styles.top}>
              {item.photos.map((i, index) =>
                <Image key={i.id} src={i.source} alt='' fill />
              )}
            </div>
            <div className={styles.bottom}>
              Фото лома
            </div>
          </div>}
        </div>
      </div>
    </CardLayout>
  )
}