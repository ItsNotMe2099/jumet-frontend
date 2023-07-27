import styles from './index.module.scss'
import { useField} from 'formik'
import cx from 'classnames'
import {AddressSuggestions} from 'react-dadata'
import {runtimeConfig} from '@/config/runtimeConfig'
import {DaDataAddress, DaDataSuggestion} from 'react-dadata/dist/types'
import {IAddress} from '@/data/interfaces/IAddress'
import {IField} from '@/types/types'
import classNames from 'classnames'
import FieldError from '@/components/fields/FieldError'
interface Props extends IField<IAddress | string | null>{
  query?: any
  isString?: boolean
  onChange?: (val: IAddress | string | null) => void
}
export default function AddressField(props: Props) {
  const [field, meta, helpers] = useField(props as any)
  const showError = !!meta.error && meta.touched

  const handleChange = (val?: DaDataSuggestion<DaDataAddress>) => {
    if(!val){
      helpers.setValue(null)
      props.onChange?.(null)
      return
    }
    if(props.isString){
      helpers.setValue(val.value)
      props.onChange?.(val.value)
      return
    }
    const newAddress: IAddress = {
      city: val.data.city,
      region: val.data.region,
      street: val.data.street,
      house: val.data.house,
      floor: val.data.floor,
      address: val.value,
      ...(val.data.geo_lat && val.data.geo_lon  ? {
        location: {
          lat: parseFloat(`${val.data.geo_lat}`),
          lng: parseFloat(`${val.data.geo_lon}`),
        }
      } : {})}
    helpers.setValue(newAddress)
    props.onChange?.(newAddress)
  }
    return (
    <div className={cx(styles.root, {[styles.hasError]: !!meta.error && meta.touched})}>
      {props.label &&
        <div className={styles.label}>
          {props.label}
        </div>
      }
      <AddressSuggestions currentSuggestionClassName={styles.active} highlightClassName={styles.highlight} inputProps={{placeholder: props.placeholder, className: classNames({
          [styles.input]: true,
          [styles.inputError]: showError,
        })}}  onChange={handleChange} token={runtimeConfig.DADATA_KEY} />
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
