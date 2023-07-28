import styles from './index.module.scss'
import { useField} from 'formik'
import classNames from 'classnames'
import {ReactElement, useEffect, useState} from 'react'
import {FieldValidator} from 'formik/dist/types'
import {useIMask} from 'react-imask'
import {AsYouType, isValidPhoneNumber} from 'libphonenumber-js'
import cx from 'classnames'
import Converter from 'utils/converter'
import {IField} from 'types/types'
import FieldError from 'components/fields/FieldError'
import EyeSvg from '@/components/svg/EyeSvg'
import {colors} from '@/styles/variables'
import EyeCloseSvg from '@/components/svg/EyeCloseSvg'
import Formatter from '@/utils/formatter'

type FormatType = 'phone' | 'phoneAndEmail' | 'cardExpiry' | 'cardPan' | 'cardCvv' | 'number' | 'price' | 'weight'

export interface InputFieldProps extends IField<string | number> {
  obscure?: boolean
  format?: FormatType
  blurValidate?: FieldValidator
  className?: string
  label?: string
  errorClassName?: string
  suffix?: 'clear' | 'arrow' | string | ReactElement
  staticSuffix?: 'clear' | 'arrow' | string | ReactElement
  prefix?: string | ReactElement
  prefixClassName?: string
  suffixClassName?: string
  onChange?: (val: string | number | null) => void
  noAutoComplete?: boolean
  max?: number,
  min?: number
}
interface Props extends InputFieldProps{

}
const defaultPhonePattern = '+0[00000000000000000000]'
const defaultCardExpiryPattern = '00/00'
const defaultCardPanPattern = '0000 0000 0000 0000000b gj'
const defaultCardCvvPattern = '0000'
const defaultPricePattern = '0 000'
const getInitialPatternFromFormat = (format: FormatType | undefined) => {
    switch (format){
      case 'phone':
        return defaultPhonePattern
      case 'cardExpiry':
        return defaultCardExpiryPattern
      case 'number':
      case 'price':
      case 'weight':
        return Number
      case 'cardPan':
        return defaultCardPanPattern
      case 'cardCvv':
        return defaultCardCvvPattern
      case 'phoneAndEmail':
      default:
        return null
    }
}
const formatValue = (format: FormatType, value: string | number | null) => {
  switch (format){
    case 'phone':
      return value ? Formatter.cleanPhone(`${value}`) : null
    case 'number':
    case 'price':
    case 'weight':
      return value ? parseInt(`${value}`.replace(/\D+/g, ''), 10) : null
    case 'cardExpiry':
    case 'cardPan':
    case 'cardCvv':
    case 'phoneAndEmail':
    default:
      return value
  }
}
export default function InputField(props: Props) {

  const [focused, setFocus] = useState(false)
  const [obscureShow, setObscureShow] = useState(false)
  const [field, meta, helpers] = useField(props as any)
  const [phoneIsValid, setPhoneIsValid] = useState(false)
  const [pattern, setPattern] = useState<string | null | NumberConstructor>(getInitialPatternFromFormat(props.format))
  const showError = meta.touched && !!meta.error && !focused
  const {ref, maskRef} = useIMask({mask: pattern as any || /.*/, ...(props.format && ['number', 'price', 'weight'].includes(props.format) ? {
      mask: Number,
      max: props.max ?? 10000,
      min: props.min ?? 0,

    } : {})}, {onAccept: (value) => {
      const formatted = formatValue(props.format!, value as string | null)
      console.log('formatted', formatted, ':', value)
      helpers.setValue(formatted)
      props.onChange?.(formatted)
      setTimeout(() => {
        maskRef.current?.updateValue()
      }, 50)
    }})
  const autoCompleteProps: any = props.noAutoComplete ? {autoComplete: 'off', autoCorrect: 'off'} : {}
  useEffect(() => {

    if (maskRef.current && (props.format === 'phone' || props.format === 'phoneAndEmail')) {
      const phone = `${field.value && !`${field.value}`.startsWith('+') ? '+' : ''}${field.value}`
      if (isValidPhoneNumber(phone || '')) {
        if (!phoneIsValid) {
          setPhoneIsValid(true)
          const asYouType = new AsYouType()
          asYouType.input(phone || '')
          setPattern(Converter.convertLibphonenumberToMask(asYouType.getTemplate()))
          updateValueFromMask()
        }
      } else if (phoneIsValid) {
        setPhoneIsValid(false)
        setPattern(defaultPhonePattern)
        updateValueFromMask()
      }
      if (props.format === 'phoneAndEmail') {
        const looksLikePhone = /^\+?\d\s?\d\s?\d/.test(field.value || '') || /\d/.test(field.value || '')
        const looksLikeEmail = /[@.]/.test(field.value || '')
        if (!looksLikeEmail && looksLikePhone && !pattern && !setPhoneIsValid) {
          setPattern(defaultPhonePattern)
          updateValueFromMask()
        } else if (pattern && (field.value?.length < 4 || looksLikeEmail)) {
          setPattern(null)
          updateValueFromMask()
        }
      }
    }


  }, [ref.current, field.value])

  const updateValueFromMask = () => {
    setTimeout(() => {
      helpers.setValue(maskRef.current?.value ?? null)
    }, 50)
  }

  const blurValidator = async () => {
    if (props.blurValidate) {
      const err = await props.blurValidate(field.value)
      if (err) {
        helpers.setError(err)
      }
    }
  }
  const renderSuffix = () => {
    if (typeof props.suffix === 'string') {
      return <div className={cx(styles.suffix)}>{props.suffix}</div>
    }
    return props.suffix
  }
  const renderPrefix = () => {
    if (typeof props.prefix === 'string') {
      return <div className={cx(styles.prefix)}>{props.prefix}</div>
    }
    return props.prefix
  }
  return (
    <div className={classNames(styles.root, props.className, {
      [props.errorClassName as string]: showError,
    })}>
      <div className={styles.wrapper}>
        {props.label &&
          <div className={styles.label}>
            {props.label}
          </div>
        }
        <div className={classNames(styles.inputWrapper, {
          [styles.withLabel]: props.label,
          [styles.withPrefix]: !!props.prefix,
          [styles.withSuffix]: !!props.suffix,
          [styles.inputError]: showError,
          [styles.inputFocused]: focused,
        })}>

          {props.staticSuffix && (
            props.staticSuffix
          )}
          <input
            name={field.name}
            value={field.value}
            disabled={props.disabled}
            ref={props.format && ref as any}
            type={props.obscure ? (obscureShow ? 'text' : 'password') : props.type ?? 'text'}
            className={classNames({
              [styles.input]: true,
              [styles.inputError]: showError,
              [styles.inputFocused]: focused,
              [styles.withSuffix]: !!props.suffix,
              [styles.withPrefix]: !!props.prefix,
            })}
            {...!props.format ? {onChange: (e) => {
              field.onChange(e)
              props.onChange?.(e.currentTarget.value)
              }} : {}}
            placeholder={props.placeholder}
            onFocus={(e) => {

              setFocus(true)
            }}
            onBlur={(e) => {
              setFocus(false)
              field.onBlur(e)
              blurValidator()
            }}
            {...autoCompleteProps}
          />
          {props.obscure && (
            <div className={classNames(styles.obscure)} onClick={() => {
              setObscureShow(!obscureShow)
            }}>
              (obscureShow ? <EyeSvg className={styles.icon} color={colors.grey500}/>
              :
              <EyeCloseSvg color={colors.grey500}/>

            </div>
          )}
          {props.prefix && (
            renderPrefix()
          )}
          {props.suffix && (
            renderSuffix()
          )}
        </div>
        <FieldError showError={showError}>{meta.error}</FieldError>
      </div>
    </div>
  )
}

