import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ImageGallery from '@/components/ui/ImageGallery'

interface Props {
  receivingPoint: IReceivingPoint
}

export default function PhotosViewCard(props: Props) {
  return (
    <ReceivingPointViewCard title='Фотографии пункта приёма'>
      <ImageGallery images={props.receivingPoint.photos ?? []} modalTitle={'Фото пункта приема'}/>
    </ReceivingPointViewCard>
  )
}
