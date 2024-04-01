import styles from './index.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppContext } from 'context/state'
import { ReactElement, useRef } from 'react'
import ArrowForSlider from 'components/ui/ArrowForSlider'
import { Swiper as SwiperClass } from 'swiper/types'
import Image from 'next/image'
import { UserRole } from '@/data/enum/UserRole'
import { Pagination, EffectFade } from 'swiper/modules'
import NewCloseSvg from '@/components/svg/NewCloseSvg'
import AvatarSvg from '@/components/svg/landing/advantages/AvatarSvg'
import Avatar2Svg from '@/components/svg/landing/advantages/Avatar2Svg'

interface IItem {
  image: string
  desc: ReactElement
  role: UserRole
}

interface Props {

}

export default function SwiperPopup(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as IItem[]
  const swiperRef = useRef<SwiperClass | null>(null)

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + '</span>'
    },
  }

  const fadeEffect = {
    crossFade: true
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <NewCloseSvg className={styles.close} onClick={appContext.hideModal} />
        <Swiper
          effect='fade'
          spaceBetween={8}
          slidesPerView={1}
          pagination={pagination}
          fadeEffect={fadeEffect}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          modules={[Pagination, EffectFade]}
          loop
        >
          {args.map((i, index) => (<SwiperSlide key={index} className={styles.slide} >
            <Image className={styles.left} src={i.image} alt='' fill />
            <div className={styles.right}>
              <div className={styles.step}>
                <div><span>ШАГ {index + 1}</span> / {args.length}</div>
              </div>
              <div className={styles.name}>
                {i.role === UserRole.Seller ? <AvatarSvg /> : <Avatar2Svg />}
                <div className={styles.role}>
                  {i.role === UserRole.Seller ? <><span>Продавец,</span><br /> ломосдатчик</> :
                    <><span>Покупатель,</span><br /> ломозаготовитель</>}
                </div>
              </div>
              {i.desc}
            </div>
          </SwiperSlide>
          ))}
          <ArrowForSlider newBtn direction="prev" sliderRef={swiperRef} className={styles.prev} classNameIcon={styles.arrowIcon} />
          <ArrowForSlider newBtn direction="next" sliderRef={swiperRef} className={styles.next} classNameIcon={styles.arrowIcon} />
        </Swiper>
      </div>
    </div>
  )
}