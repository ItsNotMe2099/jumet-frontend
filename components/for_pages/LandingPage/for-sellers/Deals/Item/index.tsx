import Image from 'next/image'
import styles from './index.module.scss'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import Button from '@/components/ui/Button'

interface IItem {
  image: string
  name: string
  desc: ReactElement
}

interface Props {
  item: IItem
}

export default function Item({ item }: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <div className={styles.top}>
          <a>
            <Image src={item.image} alt='' fill />
          </a>
          <div className={styles.name}>{item.name}</div>
          {item.desc}
        </div>
        <div className={styles.bottom}>
          <Button className={styles.btn} styleType='large' color='blue'>
            Смотреть подробнее
          </Button>
        </div>
      </div>
    </div>
  )
}
