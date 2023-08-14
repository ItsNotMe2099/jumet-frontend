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
import ClearSvg from '@/components/svg/ClearSvg'
import {colors} from '@/styles/variables'
import {useEffect, useRef} from 'react'
interface Props extends IField<IAddress | string | null>{
  query?: any
  isString?: boolean
  onChange?: (val: IAddress | string | null) => void
  resettable?: boolean
}
export default function AddressField(props: Props) {
  const [field, meta, helpers] = useField(props as any)
  const showError = !!meta.error && meta.touched
  const suggestionsRef = useRef<AddressSuggestions | null>(null)
  const initRef = useRef<boolean>(false)
  useEffect(() => {
    if(!initRef.current){
      initRef.current = true
      return
    }
    suggestionsRef.current?.setInputValue(field.value?.address ?? '')
  }, [field.value])
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
  const handleClear = () => {
    helpers.setValue(null)
    props.onChange?.(null)
    suggestionsRef.current?.setInputValue('')
  }
    return (
    <div className={cx(styles.root, {[styles.hasError]: !!meta.error && meta.touched})} data-field={props.name}>
      {props.label &&
        <div className={styles.label}>
          {props.label}
        </div>
      }
      <div className={styles.inputWrapper}>
      <AddressSuggestions ref={suggestionsRef} defaultQuery={field.value?.address ?? field.value} currentSuggestionClassName={styles.active} highlightClassName={styles.highlight} inputProps={{
        placeholder: props.placeholder ?? '',
        className: classNames({
          [styles.input]: true,
          [styles.inputError]: showError,
          [styles.withReset]: props.resettable
        })
      }}  onChange={handleChange} token={runtimeConfig.DADATA_KEY} />
        {props.resettable && !!field.value && <div className={classNames(styles.clear)} onClick={handleClear}><ClearSvg className={styles.clearIcon} color={colors.grey500}/></div>}

      </div>

      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
