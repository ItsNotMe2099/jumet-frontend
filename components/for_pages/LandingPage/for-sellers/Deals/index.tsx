import { ReactElement } from 'react-markdown/lib/react-markdown'
import Item from './Item'
import styles from './index.module.scss'
import { UserRole } from '@/data/enum/UserRole'

interface IStep {
  image: string
  desc: ReactElement
  role: UserRole
}

interface IItem {
  image: string
  name: string
  desc: ReactElement
  steps: IStep[]
}

interface Props {
  items: IItem[]
}

export default function Deals({ items }: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>
          Самые выгодные, быстрые, удобные и безопасные сделки с помощью сервиса Ломмаркет
        </div>
        <div className={styles.row}>
          {items.map((i, index) =>
            <Item item={i} key={index} />
          )}
        </div>
      </div>
    </div>
  )
}
