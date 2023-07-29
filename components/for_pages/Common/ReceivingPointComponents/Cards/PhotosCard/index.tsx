import CardLayout from '../../../CardLayout'
//import styles from './index.module.scss'
import IPointData from '@/data/interfaces/IPointData'
import { ImageSlider } from './Slider'
import { GallerySlider, GallerySliderRef } from './GallerySlider'
import { useRef } from 'react'


interface Props {
  item: IPointData
  cardLayoutClass?: string
}

export default function PhotosCard({ item, cardLayoutClass }: Props) {

  const galleryRef = useRef<GallerySliderRef | null>(null)
  const imageRef = useRef<GallerySliderRef | null>(null)

  const handleChangeGallery = (index: number) => {
    imageRef.current?.setSlide(index)
  }

  return (
    <CardLayout className={cardLayoutClass} title='Фотографии пункта приёма'>
      <ImageSlider ref={imageRef} images={item.photos} />
      <GallerySlider ref={galleryRef} images={item.photos} onClick={handleChangeGallery} />
    </CardLayout>
  )
}
