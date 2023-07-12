import CardLayout from '../../CardLayout'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'


interface Props {
  item: IPointData
  additionalEl?: React.ReactNode
  topClassName?: string
}

export default function WorkingHoursCard(props: Props) {

  return (
    <CardLayout title='Режим работы' className={styles.root} additionalEl={props.additionalEl} topClassName={props.topClassName}>
      <div className={styles.schedule}>
        <div className={styles.text}>
          Пн-Пт: 09:00-22:00</div>
        <div className={styles.text}>Сб: 09:00-19:00</div>
        <div className={styles.text}>Вс: выходной</div>
      </div>
    </CardLayout>
  )
}