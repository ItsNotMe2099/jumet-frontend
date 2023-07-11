import CardLayout from '../../CardLayout'
//import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'


interface Props {
  item: IPointData
}

export default function PhotosCard({ item }: Props) {

  return (
    <CardLayout title='Фотографии пункта приёма'>

    </CardLayout>
  )
}