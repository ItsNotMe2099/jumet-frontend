import styles from './index.module.scss'
import { IField } from 'types/types'
import { useField } from 'formik'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import classNames from 'classnames'
import { format, parse } from 'date-fns'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import {ReactElement} from 'react'
import FieldError from '@/components/fields/FieldError'

interface Props extends IField<string> {
  maxDate?: Date
  minDate?: Date
  visibleYearSelector?: boolean
  excludeDates?: Date[]
  suffix?: 'clear' | 'arrow' | string | ReactElement
  prefix?: 'search' | string | ReactElement
}

export default function DateField(props: Props) {
  const [wrapperRef, press, hover] = usePressAndHover()
  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error
  return (
    <div className={styles.root} data-field={props.name}>
      <div className={styles.wrapper}>
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
          [styles.inputFocused]: false,
        })} ref={wrapperRef}>
        <DatePicker
          name={props.name}
          className={classNames({
            [styles.input]: true,
            [styles.withPrefix]: !!props.prefix,
            [styles.withSuffix]: !!props.suffix,
            [styles.error]: showError,
            [styles.hover]: hover,
            [styles.press]: press,
          })}
          locale={ru}
          selected={field.value ? parse(field.value, 'dd.MM.yyyy', new Date()) : null}
          dateFormat="dd.MM.yyyy"
          placeholderText={props.placeholder ?? (props.label ? `${props.label}` : '')}
          forceShowMonthNavigation={false}
          popperPlacement="bottom"
          showYearDropdown={props.visibleYearSelector}
          showMonthDropdown={props.visibleYearSelector}
          dropdownMode="select"
          maxDate={props.maxDate}
          minDate={props.minDate}
          excludeDates={props.excludeDates}
          onFocus={(e) => {
            e.target.blur()
          }}
          onChange={(date) => {
            if (date) {
              helpers.setValue(format(date, 'dd.MM.yyyy'))
            }
          }}
        />
        </div>

        <FieldError showError={showError}>{meta.error}</FieldError>
      </div>
    </div>
  )
}

