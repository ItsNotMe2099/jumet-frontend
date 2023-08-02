import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import CardLayout from '../../../CardLayout'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import classNames from 'classnames'


interface Props {
  item: IReceivingPoint
  additionalEl?: React.ReactNode
  topClassName?: string
  cardLayoutClass?: string
  button?: React.ReactNode
  cardLayoutTitleClass?: string
}

export default function WorkingHoursCard(props: Props) {

  const workTime = props.item.workTimes.find(i => i.receivingPointId === props.item.id)

  return (
    <CardLayout title='Режим работы'
      className={classNames(styles.root, props.cardLayoutClass)}
      titleClassName={props.cardLayoutTitleClass}
      additionalEl={props.additionalEl}
      topClassName={props.topClassName}>
      <div className={styles.schedule}>
        <div className={styles.text}>
          Пн-Пт: {`${workTime?.startAt} - ${workTime?.finishAt}`}</div>
        <div className={styles.text}>Сб: {`${workTime?.startAt} - ${workTime?.finishAt}`}</div>
        <div className={styles.text}>Вс: выходной</div>
      </div>
      {props.button}
    </CardLayout>
  )
}