import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'


interface Props {
  item: IPointData
}

export default function PhotosCard({ item }: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Фотографии пункта приёма
      </div>
    </div>
  )
}