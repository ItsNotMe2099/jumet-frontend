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
import AvatarNewSvg from '@/components/svg/landing/advantages/AvatarNewSvg'
import Avatar2NewSvg from '@/components/svg/landing/advantages/Avatar2NewSvg'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { Routes } from '@/types/routes'

interface IItem {
  image: string
  desc: ReactElement
  role: UserRole
  title: string | ReactElement
}

interface Props {

}

export default function SwiperPopup(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as IItem[]
  const swiperRef = useRef<SwiperClass | null>(null)

  const router = useRouter()

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + '</span>'
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
            <div className={styles.left}>
              <div className={classNames(styles.imgContainer,
                { [styles.mainPage]: router.asPath === Routes.landing })}><Image key={i.image} src={i.image} alt='' fill /></div>
            </div>
            <div className={styles.right}>
              <div className={styles.step}>
                <div><span>{index + 1}</span> / {args.length}</div>
              </div>
              <div className={styles.name}>
                {i.role === UserRole.Seller ? <AvatarNewSvg /> : <Avatar2NewSvg />}
                <div className={styles.role}>
                  {i.title}
                </div>
              </div>
              {i.desc}
            </div>
          </SwiperSlide>
          ))}
          {args.length > 1 &&
            <>
              <ArrowForSlider newBtn direction="prev" sliderRef={swiperRef} className={styles.prev} classNameIcon={styles.arrowIcon} />
              <ArrowForSlider newBtn direction="next" sliderRef={swiperRef} className={styles.next} classNameIcon={styles.arrowIcon} /></>
          }
        </Swiper>
      </div>
    </div>
  )
}
