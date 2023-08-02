import styles from '@/components/for_pages/ReceivingPoint/Cards/PhotosViewCard/GallerySlider/index.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import classNames from 'classnames'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Swiper as SwiperClass } from 'swiper/types'
export interface GallerySliderRef {
  setSlide(index: number): void;
}

interface Props {
  images: any[] // any type is temporary
  onClick: (index: number) => void
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
  return (
    <div className={styles.root}>
      <div className={classNames(styles.arrow, { [styles.arrowTop]: true })} onClick={handlePrevClick}>
        <img
          src='/img/ProductPage/ProductSheet/SwiperSmall/prev.svg'
          alt='' />
      </div>
      <Swiper
        spaceBetween={13}
        slidesPerView='auto'
        direction='vertical'
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}

      >
        {images.map((item, index) => <SwiperSlide className={styles.slide} key={index} onClick={() => props.onClick(index)}>
          <Image alt={''} key={`${item.preview}`} src={item} fill />
        </SwiperSlide>)}
      </Swiper>
      <div className={classNames(styles.arrow, { [styles.arrowBottom]: true })} onClick={handleNextClick}>
        <img
          src='/img/ProductPage/ProductSheet/SwiperSmall/next.svg'
          alt='' />
      </div>

    </div>
  )
})
GallerySlider.displayName = 'GallerySlider'
