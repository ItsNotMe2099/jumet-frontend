import styles from './index.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppContext } from 'context/state'
import { forwardRef, useEffect, useRef } from 'react'
import { Swiper as SwiperClass } from 'swiper/types'
import ChevronLeftSvg from '@/components/svg/ChevronLeftSvg'
import { colors } from '@/styles/variables'
import ChevronRightSvg from '@/components/svg/ChevronRightSvg'
import classNames from 'classnames'
import Image from 'next/image'

export interface ImageSliderRef {
  setSlide(index: number): void
}
interface Props {
  images: any[] // any type is temporary
}

export const ImageSlider = forwardRef<ImageSliderRef, Props>((props, ref) => {
  const { images } = props
  const appContext = useAppContext()
  const swiperRef = useRef<SwiperClass | null>(null)

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev()
  }
  const handleNextClick = () => {
    swiperRef.current?.slideNext()

  }

  useEffect(() => {
    const swiperInstance = swiperRef.current
    if (swiperInstance) {
      swiperInstance.on('slideChange', () => {
        const prevButton = document.querySelector(`.${styles.prev}`)
        const nextButton = document.querySelector(`.${styles.next}`)

        if (prevButton) {
          if (swiperInstance.isBeginning) {
            prevButton.classList.add(styles.hidden)
          } else {
            prevButton.classList.remove(styles.hidden)
          }
        }

        if (nextButton) {
          if (swiperInstance.isEnd) {
            nextButton.classList.add(styles.hidden)
          } else {
            nextButton.classList.remove(styles.hidden)
          }
        }
      })
    }
  }, [])

  return (
    <div className={styles.root}>
      <div className={classNames(styles.prev, styles.hidden)} onClick={handlePrevClick}>
        <ChevronLeftSvg color={colors.grey500} />
      </div>
      <Swiper
        slidesPerView={1}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}

      >
        {images.map((item, index) => <SwiperSlide key={index} className={styles.slide}>
          <Image alt='' key={`${item.preview}`} src={item} fill />

        </SwiperSlide>)}
      </Swiper>
      <div className={styles.next} onClick={handleNextClick}>
        <ChevronRightSvg color={colors.grey500} />
      </div>
    </div>
  )
})
ImageSlider.displayName = 'ImageSlider'
