import CardLayout from '../../../CardLayout'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import ImageGallery from '@/components/ui/ImageGallery'
import styles from './index.module.scss'


interface Props {
  item: ISaleRequest
  cardLayoutClass?: string
}

export default function SaleRequestPhotosCard(props: Props) {

  if((props.item.photos?.length ?? 0) === 0){
    return null
  }
  return (
    <CardLayout title='Фотографии лома'   className={styles.card}>
      <ImageGallery images={props.item.photos ?? []} modalTitle={`Фотографии лома заявки №${props.item.id}`}/>
    </CardLayout>
  )
}
