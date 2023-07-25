import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import styles from './index.module.scss'
import Image from 'next/image'
import JumetSvg from '@/components/svg/JumetSvg'
import { colors } from '@/styles/variables'
import Link from 'next/link'

interface Props {
  item: ISaleRequest
}

export default function SaleRequestCard({ item }: Props) {

  return (
    <Link href={''}>
      <div className={styles.root}>
        <div className={styles.left}>
          <div className={styles.top}>
            <div className={styles.weight}>
              {item.weight > 0 ? `${item.weight} тонн` : 'Вес не указан'}
            </div>
            <div className={styles.number}>
              Заявка №{item.id}
            </div>
          </div>
          <div className={styles.middle}>
            {item.address.address}
          </div>
          <div className={styles.bottom}>
            <div className={styles.item}>
              {item.scrapMetalCategory ? <>Категория {item.scrapMetalCategory}</> : 'Категория не указана'}
            </div>
            {item.price &&
              <div className={styles.item}>
                От {item.price} ₽
              </div>}
          </div>
        </div>
        <div className={styles.right}>
          {item.photos.length > 0 && item.photos[0].source ?
            <Image src={item.photos[0].source} alt='' fill />
            :
            <JumetSvg color={colors.white} />
          }
        </div>
      </div>
    </Link>
  )
}
