import styles from './index.module.scss'
import { FieldConfig, useField } from 'formik'
import classNames from 'classnames'
import { IField } from 'types/types'
import FieldError from 'components/fields/FieldError'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

interface Props extends IField<string> {
  className?: string
  onChange?: () => void
  onBlur?: () => void
  onMapClick: (e: ymaps.Event) => void
}

export default function YMapsField(props: Props) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props as FieldConfig)
  const showError = meta.touched && !!meta.error

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.map}>
        <YMaps query={{ apikey: 'YOUR_API_KEY' }}>
          <Map
          className={styles.internal}
            state={{ center: [55.76, 37.64], zoom: 10 }}
            onClick={props.onMapClick}
          >
            <Placemark geometry={field.value} />
          </Map>
        </YMaps>
      </div>
      <div className={styles.wrapper}>
        <input
          {...field}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <FieldError {...meta} />
      </div>
    </div>
  )
}

YMapsField.defaultProps = {

}

