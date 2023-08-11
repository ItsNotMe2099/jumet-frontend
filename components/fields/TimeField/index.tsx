import styles from './index.module.scss'
import { IField } from 'types/types'
import { useField } from 'formik'
import classNames from 'classnames'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import {ReactElement} from 'react'
import FieldError from '@/components/fields/FieldError'

interface Props extends IField<string | null> {
  minuteStep?: number
  suffix?: 'clear' | 'arrow' | string | ReactElement
  prefix?: 'search' | string | ReactElement

}

export default function TimeField(props: Props) {
  const [wrapperRef, press, hover] = usePressAndHover()
  const [field, meta, helpers] = useField<string | null>(props as any)
  const showError = meta.touched && !!meta.error

  return (
    <div className={styles.root} data-field={props.name}>

      <div className={classNames({
        [styles.wrapper]: true,
        [styles.error]: showError,
        [styles.hover]: hover,
        [styles.press]: press,
      })} >
        {props.label && (
          <div className={styles.label}>
            {props.label}
          </div>
        )}
        <div className={classNames(styles.inputWrapper, {
          [styles.withLabel]: props.label,
          [styles.withPrefix]: !!props.prefix,
          [styles.withSuffix]: !!props.suffix,
          [styles.inputError]: showError,
        })} ref={wrapperRef}>
        <TimePicker
          showSecond={false}
          className={styles.timePicker}
          popupClassName={classNames({
            [styles.popup]: true,
          })}
          {...(field.value ? {value: moment(field.value, 'HH:mm:ss')} : {})}
          placeholder={props.placeholder ?? props.label ? `${props.label}` : ''}
          inputReadOnly
          onChange={(date) => {
            if (date) {
              helpers.setValue(`${date.format('HH:mm')}:00`)
            }else{
              helpers.setValue(null)
            }
          }}
          minuteStep={props.minuteStep ?? 1}
        />
        </div>
        <FieldError showError={showError}>{meta.error}</FieldError>
      </div>
    </div>
  )
}

