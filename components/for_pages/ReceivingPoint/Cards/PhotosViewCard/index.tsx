//import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import { ImageSlider } from '@/components/for_pages/ReceivingPoint/Cards/PhotosViewCard/Slider'
import { GallerySlider, GallerySliderRef } from '@/components/for_pages/ReceivingPoint/Cards/PhotosViewCard/GallerySlider'
import { useRef } from 'react'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'


interface Props {
  receivingPoint: IPointData
}

export default function PhotosViewCard(props: Props) {
  const {receivingPoint} = props
  const galleryRef = useRef<GallerySliderRef | null>(null)
  const imageRef = useRef<GallerySliderRef | null>(null)

  const handleChangeGallery = (index: number) => {
    imageRef.current?.setSlide(index)
  }

  return (
    <ReceivingPointViewCard title='Фотографии пункта приёма'>
      <ImageSlider ref={imageRef} images={receivingPoint.photos} />
      <GallerySlider ref={galleryRef} images={receivingPoint.photos} onClick={handleChangeGallery} />
    </ReceivingPointViewCard>
  )
}
