import CardLayout from '../../CardLayout'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import classNames from 'classnames'


interface Props {
  item: IPointData
  additionalEl?: React.ReactNode
  topClassName?: string
  cardLayoutClass?: string
  button?: React.ReactNode
}

export default function WorkingHoursCard(props: Props) {

  return (
    <CardLayout title='Режим работы'
      className={classNames(styles.root, props.cardLayoutClass)}
      additionalEl={props.additionalEl}
      topClassName={props.topClassName}>
      <div className={styles.schedule}>
        <div className={styles.text}>
          Пн-Пт: 09:00-22:00</div>
        <div className={styles.text}>Сб: 09:00-19:00</div>
        <div className={styles.text}>Вс: выходной</div>
      </div>
      {props.button}
    </CardLayout>
  )
}