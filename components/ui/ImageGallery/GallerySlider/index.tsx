import styles from './index.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Swiper as SwiperClass } from 'swiper/types'
import IFile from '@/data/interfaces/IFile'
import ImageFile from '@/components/ui/ImageFile'
import classNames from 'classnames'
import {Preset} from '@/types/enums'
export interface GallerySliderRef {
  setSlide(index: number): void;
}

interface Props {
  images: IFile[]
  onClick: (index: number) => void
  activeIndex: number
}

export const GallerySlider = forwardRef<GallerySliderRef, Props>((props, ref) => {
  const { images } = props
  const swiperRef = useRef<SwiperClass | null>(null)
  useImperativeHandle(
    ref,
    () => ({
      setSlide(index: number) {
        swiperRef.current?.slideTo(index)
      }
    }),
  )
  const handlePrevClick = () => {
    swiperRef.current?.slidePrev()
  }
  const handleNextClick = () => {
    swiperRef.current?.slideNext()

  }
  console.log('ActiveIndex', props.activeIndex)
  return (
    <div className={styles.root}>
      <Swiper
        className={styles.swiper}
        spaceBetween={12}
        slidesPerView='auto'
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}

      >
        {images.map((item, index) => <SwiperSlide className={styles.slide} key={index} onClick={() => props.onClick(index)}>
          <ImageFile preset={Preset.xsResize} className={classNames(styles.image, {[styles.active]: props.activeIndex === index})} file={item} />
        </SwiperSlide>)}
      </Swiper>

    </div>
  )
})
GallerySlider.displayName = 'GallerySlider'
