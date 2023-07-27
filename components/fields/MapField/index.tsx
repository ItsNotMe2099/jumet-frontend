import styles from './index.module.scss'
import { useField} from 'formik'
import {IField} from 'types/types'
import {Map as YMap, YMaps} from '@pbe/react-yandex-maps'
import {runtimeConfig} from 'config/runtimeConfig'
import classNames from 'classnames'
import {useEffect, useRef, useState} from 'react'
import {ILocation} from '@/data/interfaces/ILocation'
import MarkerSvg from '@/components/svg/MarkerSvg'
import {colors} from '@/styles/variables'
interface Props  extends IField<ILocation | null>{
  className?: string
  mapClassName?: string
  address?: string
}

export default function MapField(props: Props) {
  const {label, placeholder, className} = props
  const [field, meta, helpers] = useField(props)
  const placemarkRef = useRef<any>()
  const {value} = field
  const [showTipAnimation, setShowTipAnimation] = useState<boolean>(false)
  const [showTip, setShowTip] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setShowTip(true)
      setShowTipAnimation(true)
    }, 5000)
    setTimeout(() => {
      setShowTipAnimation(false)
    }, 10000)
  }, [])
  const hasError = !!meta.error && meta.touched


  return (
    <YMaps query={{ lang: 'ru_RU', apikey: runtimeConfig.MAP_KEY }}>
      <div className={classNames([styles.root, props.className])}>
        <YMap  defaultState={{ center: value ? [value.lat, value.lng] : [44.497415, 34.169506], zoom: 17 }}
              className={props.mapClassName}
               onBoundsChange={(val) => {
                 const newCenter = val.originalEvent.newCenter
                 helpers.setValue({lat: newCenter[0], lng: newCenter[1]})
               }}
              options={{
                suppressMapOpenBlock: true
              }}
              width="100%" height="100%">

        </YMap>
        <div className={styles.placemark}><MarkerSvg color={colors.blue500}/></div>
        {showTip && <div className={classNames(styles.tip, {[styles.isActive]: showTipAnimation})}>Перемещайте карту чтобы установить точку<br/>
          {field.value ? 'Или перетащите метку' : ''}</div>}
      </div>
    </YMaps>
  )
}
