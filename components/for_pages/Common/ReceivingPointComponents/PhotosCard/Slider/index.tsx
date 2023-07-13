import styles from './index.module.scss'
import {Swiper, SwiperSlide} from 'swiper/react'
import {useAppContext} from 'context/state'
import {forwardRef, useImperativeHandle, useRef} from 'react'
import {Swiper as SwiperClass} from 'swiper/types'

export interface ImageSliderRef {
  setSlide(index: number): void;
}
interface Props {
  images: any[] // any type is temporary
}

export const ImageSlider = forwardRef<ImageSliderRef, Props>((props, ref) => {
  const {images} = props
  const appContext = useAppContext()
  const swiperRef = useRef<SwiperClass | null>(null)
  useImperativeHandle(
    ref,
    () => ({
      setSlide(index: number) {
        swiperRef.current?.slideToLoop(index)
      }
    }),
  )

  return (
    <div className={styles.root}>
      <Swiper
        slidesPerView={1}
        loop
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}

      >
        {images.map((item, index) => <SwiperSlide key={index} className={styles.slide}>
          <img key={`${item.preview}`} src={item}
        />

        </SwiperSlide>)}
      </Swiper>
    </div>
  )
})
ImageSlider.displayName = 'ImageSlider'
