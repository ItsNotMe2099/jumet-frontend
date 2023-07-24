import { FieldConfig, FieldHookConfig, useField } from 'formik'
import styles from './index.module.scss'
import { CountryCode } from 'libphonenumber-js/core'
import classNames from 'classnames'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { useState } from 'react'
import { FieldValidator } from 'formik/dist/types'
import { IField } from 'types/types'
import { InputStyleType } from '@/types/enums'
import FieldError from '../FieldError'

interface Props extends IField<string> {
  blurValidate?: FieldValidator
  className?: string
  fieldWrapperClassName?: string
  label?: string
  errorClassName?: string
  defaultCountry?: string
  countrySelectClassName?: string
  styleType: InputStyleType
}

export default function PhoneField(props: Props & FieldConfig) {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>)
  const [focused, setFocus] = useState(false)
  const showError = meta.touched && !!meta.error && !focused
  const handleChange = (value: string) => {
    helpers.setValue(value)
  }
  return (
    <div className={classNames(styles.root, props.className)}>
      {props.label ? <div className={styles.label}>
        {props.label}
      </div> : null}
      <PhoneInputWithCountrySelect
        disabled={props.disabled}
        countrySelectComponent={() => null}
        defaultCountry={props.defaultCountry as CountryCode}
        className={classNames({
          [styles.input]: true,
          [styles.inputError]: showError,
          [styles.inputFocused]: focused,
        })}
        placeholder={props.placeholder}
        onFocus={(e) => {
          setFocus(true)
        }}
        value={field.value}
        onBlur={(e) => {
          setFocus(false)
          field.onBlur(e)

        }}
        international
        withCountryCallingCode
        useNationalFormatForDefaultCountryValue
        countrySelectProps={{
          className: props.countrySelectClassName,
        }}

        onChange={handleChange}
      />
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div>
  )
}
