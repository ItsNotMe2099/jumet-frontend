import styles from './index.module.scss'
import { useField} from 'formik'
import classNames from 'classnames'
import {ReactElement, useEffect, useRef, useState} from 'react'
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
import SearchSvg from '@/components/svg/SearchSvg'
import ClearSvg from '@/components/svg/ClearSvg'

export type InputValueType<T> = T | null | undefined
type FormatType = 'phone' | 'phoneAndEmail' | 'cardExpiry' | 'cardPan' | 'cardCvv' | 'number' | 'price' | 'weight' | 'decimal'

export interface InputFieldProps<T> extends IField<InputValueType<T>> {
  obscure?: boolean
  format?: FormatType
  blurValidate?: FieldValidator
  className?: string
  label?: string
  errorClassName?: string
  suffix?: 'clear' | 'arrow' | 'search' | string | ReactElement
  prefix?: 'search' | string | ReactElement
  prefixClassName?: string
  suffixClassName?: string
  onChange?: (val: InputValueType<T> ) => void
  noAutoComplete?: boolean
  max?: number,
  min?: number
  scale?: number
  resettable?: boolean
  formatValue?: (val: InputValueType<T>) => InputValueType<T>
  parseValue?: (val: InputValueType<T>) => InputValueType<T>
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
        return 'd'
      case 'cardPan':
        return defaultCardPanPattern
      case 'cardCvv':
        return defaultCardCvvPattern
      case 'phoneAndEmail':
      default:
        return null
    }
}
export default function InputField<T extends string | number>(props: InputFieldProps<T>) {

  const [focused, setFocus] = useState(false)
  const [obscureShow, setObscureShow] = useState(false)
  const [field, meta, helpers] = useField(props as any)
  const [phoneIsValid, setPhoneIsValid] = useState(false)
  const [pattern, setPattern] = useState<string | null | NumberConstructor>(getInitialPatternFromFormat(props.format))
  const showError = meta.touched && !!meta.error && !focused
  const decimalStartTyping = useRef<boolean>(false)
  const formatValue = (value: InputValueType<T>) => {
    return props.formatValue ? props.formatValue(value) : value
  }
  const parseValue = (value: InputValueType<T>) => {
    console.log('P1parseValue', value, props.parseValue?.(value))
    return props.parseValue ? props.parseValue(value) : value
  }

  const formatValueByType = (format: FormatType, value: InputValueType<T>): string | number | null | undefined => {
    switch (format){
      case 'phone':
        return value ? Formatter.cleanPhone(`${value}`) : null
      case 'number':
      case 'price':
      case 'weight':
        return value || value === '0' ? parseInt(`${value}`.replace(/\D+/g, ''), 10) : null
      case 'decimal':
        return value || value === '0' ? parseFloat(`${value}`) : null

      case 'cardExpiry':
      case 'cardPan':
      case 'cardCvv':
      case 'phoneAndEmail':
      default:
        return value
    }
  }

  const {ref, maskRef} = useIMask({mask: pattern as any || /.*/, ...(props.format && ['number', 'price', 'weight', 'decimal'].includes(props.format) ? {
      mask: Number,
      max: props.max ?? 10000000,
      min: props.min ?? 0,
      ...(props.format === 'decimal' ? {
        normalizeZeros: false,
        padFractionalZeros: false,
        radix: '.',
        mapToRadix: [','],
        scale: props.scale ?? 3
      } : {}),

    } : {})}, {onAccept: (value) => {
      if(props.format === 'decimal'){
        const valueStr = `${value}`
        if([',', '.'].includes(valueStr[valueStr.length - 1]) || (valueStr.length > 2 && valueStr.slice(-2) === '.0')){
          console.log('Set111')
          decimalStartTyping.current = true
        }else{
          console.log('Set111000')
          decimalStartTyping.current = false

        }
      }
      const formatted = formatValue(formatValueByType(props.format!, value as any  as InputValueType<T>) as InputValueType<T>)
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
    }else{
      maskRef.current?.updateValue()
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
    if(props.suffix === 'search'){
      return <div className={cx(styles.suffix)}><SearchSvg color={colors.grey400} /></div>
    }else if (typeof props.suffix === 'string') {
      return <div className={cx(styles.suffix)}>{props.suffix}</div>
    }
    return props.suffix
  }
  const renderPrefix = () => {
    if(props.prefix === 'search'){
      return <div className={cx(styles.prefix)}><SearchSvg color={colors.grey400} /></div>
    } else if (typeof props.prefix === 'string') {
      return <div className={cx(styles.prefix)}>{props.prefix}</div>
    }
    return props.prefix
  }
  const handleClear = () => {
    const formatted = props.format ? formatValue(formatValueByType(props.format!, '' as any  as InputValueType<T>) as InputValueType<T>) : formatValue('' as InputValueType<T>)
    helpers.setValue(formatted)
    props.onChange?.(formatted)
    setTimeout(() => {
      maskRef.current?.updateValue()
    }, 50)
    helpers.setValue(formatted)
  }
  return (
    <div className={classNames(styles.root, props.className, {
      [props.errorClassName as string]: showError,
    })} data-field={props.name}>
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

          {props.prefix && (
            renderPrefix()
          )}
          <input
            name={field.name}
            value={(props.format === 'decimal' && decimalStartTyping.current) ? undefined : `${parseValue(field.value) ?? ''}`}
            disabled={props.disabled}
            ref={props.format && ref as any}
            type={props.obscure ? (obscureShow ? 'text' : 'password') : props.type ?? 'text'}
            className={classNames({
              [styles.input]: true,
              [styles.inputError]: showError,
              [styles.inputFocused]: focused,
              [styles.withPrefix]: !!props.prefix,
              [styles.withClear]: props.resettable && !!field.value,
            })}
            {...!props.format ? {onChange: (e) => {

              const formatted = formatValue(e.currentTarget.value as InputValueType<T>)
              helpers.setValue(formatted)
              props.onChange?.(formatted)
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
              {obscureShow ? <EyeSvg className={styles.icon} color={colors.grey500}/>
              :
              <EyeCloseSvg color={colors.grey500}/>}

            </div>
          )}
          {props.resettable && !!field.value && <div className={classNames(styles.clear, {[styles.withSuffix]: !!props.suffix})} onClick={handleClear}><ClearSvg className={styles.clearIcon} color={colors.grey500}/></div>}
          {props.suffix && (
            renderSuffix()
          )}
        </div>
        <FieldError showError={showError}>{meta.error}</FieldError>
      </div>
    </div>
  )
}

