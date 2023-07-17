import CardLayout from '../../../CardLayout'
import PhotosForm from './Form'
import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'


interface Props {
  item: IPointData
  cardLayoutClass?: string
}

export default function PhotosCardLk({ item, cardLayoutClass }: Props) {

  return (
    <CardLayout className={cardLayoutClass} title='Фотографии пункта приёма'>
      <div className={styles.root}>
        <PhotosForm />
      </div>
    </CardLayout>
  )
}