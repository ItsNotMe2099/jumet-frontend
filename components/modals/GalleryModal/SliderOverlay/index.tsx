import styles from './index.module.scss'
import IFile from 'data/interfaces/IFile'
import { Preset } from 'types/enums'

import {Swiper, SwiperSlide} from 'swiper/react'
import { useAppContext } from 'context/state'
import { useEffect, useRef, useState } from 'react'
import { colors } from 'styles/variables'
import CloseModalBtn from 'components/ui/CloseModalBtn'
import ArrowForSlider from 'components/ui/ArrowForSlider'
import Spinner from 'components/ui/Spinner'
import classNames from 'classnames'
import imagePreloader from 'utils/imagePreloader'
import ImageFile from 'components/ui/ImageFile'
import useClient from 'components/hooks/useClient'
import {Swiper as SwiperClass} from 'swiper/types'

import { Zoom } from 'swiper/modules'

interface Props {
  title: string
  images: IFile[]
  selectedId: number
  onRequestClose: () => void
}

export default function SliderOverlay(props: Props) {
  const appContext = useAppContext()
  const initIndex = props.images.findIndex((item) => item.id === props.selectedId)
  const [index, setIndex] = useState(initIndex)
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const activeImage = props.images[index]
  const swiperRef = useRef<SwiperClass | null>(null)

  const isClient = useClient()
  const preset = appContext.isMobile ? Preset.mdResize : Preset.lgResize
  const preloadImages = async () => {
    await imagePreloader(props.images[initIndex], preset)
    setLoaded(true)
    setTimeout(() => {
      setVisible(true)
    }, 100)
  }

  useEffect(() => {
    preloadImages()
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.wrapTitle}>
        <div className={styles.title}>
          {props.title}
          <CloseModalBtn
            className={styles.closeBtn}
            onClick={() => {
              props.onRequestClose()
            }}
            color={colors.white}
          />
        </div>
      </div>

      {!loaded && (
        <div className={classNames([styles.slide, styles.blank])}>
          <Spinner size={32} color="#fff" secondaryColor="rgba(255,255,255,0.4)" />
        </div>
      )}

      {loaded && (
        <Swiper
          spaceBetween={8}
          slidesPerView={1}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          modules={[Zoom]}
          zoom={{
            maxRatio: 2,
            minRatio: 1

          }}

        >
          {props.images.map(item => (<SwiperSlide key={item.id} className={styles.slide} >
              <div className={'swiper-zoom-container'}>
                <ImageFile
                  className={styles.image}
                  file={item}
                  preset={preset}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}


      <div className={styles.arrows}>
        <ArrowForSlider direction="prev" sliderRef={swiperRef} className={styles.arrow} classNameIcon={styles.arrowIcon} />
        <ArrowForSlider direction="next" sliderRef={swiperRef} className={styles.arrow} classNameIcon={styles.arrowIcon} />
      </div>
    </div>
  )
}
