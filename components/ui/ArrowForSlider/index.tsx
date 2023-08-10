import styles from './index.module.scss'
import classNames from 'classnames'
import ButtonArrowSvg from 'components/svg/ButtonArrowSvg'
import { colors } from 'styles/variables'
import IconButton from 'components/ui/IconButton'
import { RefObject } from 'react'
import usePressAndHover from 'components/hooks/usePressAndHover'
import useStopPropagation from 'components/hooks/useStopPropagation'
import {Swiper as SwiperClass} from 'swiper/types'

interface Props {
  direction: 'next' | 'prev'
  sliderRef: RefObject<SwiperClass | undefined>
  className?: string
  classNameIcon?: string
  color?: string
  hint?: string
  onClick?: () => void
}

export default function ArrowForSlider(props: Props) {
  const [ref, press, hover] = usePressAndHover()
  const color = hover ? colors.blue500 : (props.color || colors.grey500)

  useStopPropagation(ref)

  return (
    <IconButton
      buttonRef={ref}
      className={classNames([styles.root, props.className])}
      onClick={(e) => {
        e.stopPropagation()
        if (props.direction === 'next') {
          props.sliderRef.current?.slideNext()
        } else {
          props.sliderRef.current?.slidePrev()
        }
        if(props.onClick){
          props.onClick()
        }
      }}
    >
      <ButtonArrowSvg
        color={color}
        className={classNames([styles.icon, props.classNameIcon, styles[props.direction]])}
      />
      {props.hint && hover && (
        <div className={classNames([styles.hint, styles[props.direction]])}>
          {props.hint}
        </div>
      )}
    </IconButton>
  )
}

