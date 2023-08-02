import styles from './index.module.scss'
import { useField} from 'formik'
import classNames from 'classnames'
import {runtimeConfig} from '@/config/runtimeConfig'
import {IField} from '@/types/types'
import FieldError from '@/components/fields/FieldError'
import {ICompany, LegalType} from '@/data/interfaces/ICompany'
import {PartySuggestions} from 'react-dadata'
import {useEffect, useRef} from 'react'
interface Props extends IField<ICompany | null>{
  query?: any
  onChange?: (val: ICompany | null) => void
}
export default function CompanyField(props: Props) {
  const [field, meta, helpers] = useField(props as any)
  const suggestionRef = useRef<PartySuggestions | null>(null)
  useEffect(() => {

  }, [field.value])
  const handleChange = (val: any) => {
    if(!val){
      helpers.setValue(null)
      props.onChange?.(null)
      return
    }
    const newCompany: ICompany = {
      name: val.value,
      inn: val.data.inn,
      kpp: val.data.kpp,
      ogrn: val.data.ogrn,
      address: val.data.address.value,
      legalType: val.data.type === 'LEGAL' ? LegalType.LegalEntity : LegalType.Ip
    }
    helpers.setValue(newCompany)
    props.onChange?.(newCompany)
    suggestionRef.current?.setInputValue(newCompany.inn!)
  }
    const showError = !!meta.error && meta.touched
  return (
    <div className={styles.root}>
      {props.label &&
        <div className={styles.label}>
          {props.label}
        </div>
      }
      <PartySuggestions ref={suggestionRef} defaultQuery={field.value?.inn ?? field.value} currentSuggestionClassName={styles.active} highlightClassName={styles.highlight} inputProps={{className: classNames({
          [styles.input]: true,
          [styles.inputError]: showError,
        })}} onChange={handleChange} token={runtimeConfig.DADATA_KEY} />
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
