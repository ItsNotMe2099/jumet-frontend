import CardLayout from 'components/for_pages/Common/CardLayout'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import ImageGallery from '@/components/ui/ImageGallery'
import styles from 'components/for_pages/sale-request/SaleRequestPhotosPageCard/index.module.scss'


interface Props {
  item: ISaleRequest
  cardLayoutClass?: string
}

export default function SaleRequestPhotosPageCard(props: Props) {

  if((props.item.photos?.length ?? 0) === 0){
    return null
  }
  return (
    <CardLayout title='Фотографии лома'   className={styles.card}>
      <ImageGallery images={props.item.photos ?? []} modalTitle={`Фотографии лома заявки №${props.item.id}`}/>
    </CardLayout>
  )
}
