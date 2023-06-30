import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'


interface Props {
  item: IPointData
}

export default function WorkingHoursCard({ item }: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Режим работы
      </div>
      <div className={styles.schedule}>
        <div className={styles.text}>
          Пн-Пт: 09:00-22:00</div>
        <div className={styles.text}>Сб: 09:00-19:00</div>
        <div className={styles.text}>Вс: выходной</div>
      </div>
    </div>
  )
}