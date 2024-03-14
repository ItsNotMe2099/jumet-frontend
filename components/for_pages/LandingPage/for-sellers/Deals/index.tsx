import { ReactElement } from 'react-markdown/lib/react-markdown'
import Item from './Item'
import styles from './index.module.scss'

interface IItem {
  image: string
  name: string
  desc: ReactElement
}

interface Props {
  items: IItem[]
}

export default function Deals({ items }: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>
          Самые выгодные, быстрые, удобные и безопасные сделки с помощью сервиса JUMET
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
