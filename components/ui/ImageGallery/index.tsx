import styles from './index.module.scss'
import {ImageSlider} from './Slider'
import {GallerySlider, GallerySliderRef} from './GallerySlider'
import {useRef, useState} from 'react'
import IFile from '@/data/interfaces/IFile'


interface Props {
  images: IFile[]
  modalTitle?: string
}

export default function ImageGallery(props: Props) {

  const galleryRef = useRef<GallerySliderRef | null>(null)
  const imageRef = useRef<GallerySliderRef | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const handleChangeGallery = (index: number) => {
    imageRef.current?.setSlide(index)
    setActiveIndex(index)
  }
  const handleChangeSlide = (index: number) => {
    galleryRef.current?.setSlide(index)
    setActiveIndex(index)
  }

  return (
    <div className={styles.root}>
      <ImageSlider modalTitle={props.modalTitle} ref={imageRef} images={props.images} onChangeSlide={handleChangeSlide}/>
      <GallerySlider ref={galleryRef} activeIndex={activeIndex} images={props.images} onClick={handleChangeGallery}/>
    </div>
  )
}
