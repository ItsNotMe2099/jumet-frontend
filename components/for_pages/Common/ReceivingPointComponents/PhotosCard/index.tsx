import CardLayout from '../../CardLayout'
//import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
//import { ImageSlider } from './Slider'


interface Props {
  item: IPointData
}

export default function PhotosCard({ item }: Props) {

  return (
    <CardLayout title='Фотографии пункта приёма'>
      {/*<ImageSlider images={item.photos} />*/}
    </CardLayout>
  )
}