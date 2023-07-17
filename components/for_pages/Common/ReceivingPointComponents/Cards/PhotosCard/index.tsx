import CardLayout from '../../../CardLayout'
//import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import { ImageSlider } from './Slider'


interface Props {
  item: IPointData
  cardLayoutClass?: string
}

export default function PhotosCard({ item, cardLayoutClass }: Props) {

  return (
    <CardLayout className={cardLayoutClass} title='Фотографии пункта приёма'>
      <ImageSlider images={item.photos} />
    </CardLayout>
  )
}