import styles from './index.module.scss'
import {runtimeConfig} from '@/config/runtimeConfig'
import MarkerSvg from '@/components/svg/MarkerSvg'
import {colors} from '@/styles/variables'
import {ReactElement} from 'react'
import {ILocation} from '@/data/interfaces/ILocation'
import classNames from 'classnames'

interface Props {
  children?: ReactElement | null
  center?: ILocation | null
  onClick?: () => void
  className?: string
}

export default function YandexStaticMap(props: Props) {

  if(!props.center){
    return null
  }
  return (
    <div style={{display: 'flex'}}>
   <div className={classNames(styles.root, props.className)} onClick={props.onClick}>
        <img className={styles.image} src={`https://static-maps.yandex.ru/1.x/?lang=ru_RU&ll=${props.center?.lng},${props.center?.lat}&z=16&size=632,328&l=map&apikey=${runtimeConfig.MAP_KEY}`}/>
        <div className={styles.placemark}><MarkerSvg color={colors.blue500}/></div>
      </div>
    </div>
  )
}

