import CardLayout from '../../CardLayout'
import PhotosForm from './Form'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'


interface Props {
  item: IPointData
}

export default function PhotosCardLk({ item }: Props) {

  return (
    <CardLayout title='Фотографии пункта приёма'>
      <div className={styles.root}>
        <PhotosForm />
      </div>
    </CardLayout>
  )
}