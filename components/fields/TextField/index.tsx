import styles from './index.module.scss'
import { FieldConfig, useField } from 'formik'
import classNames from 'classnames'
import { IField } from 'types/types'
import ErrorInput from 'components/fields/ErrorInput'
import { ChangeEvent } from 'react'

interface Props extends IField<string> {
  className?: string
  onChange?: (val: string) => void
  label?: string
  isNumbersOnly?: boolean
}

export default function TextField(props: Props) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props as FieldConfig)
  const showError = meta.touched && !!meta.error

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          {props.label ? <div className={styles.label}>
            {props.label}
          </div> : null}
          <input
            onInput=
            {props.isNumbersOnly ?
              (e: ChangeEvent<HTMLInputElement>) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }
              : undefined}
            {...field}
            onChange={(e) => {
              field.onChange(e)
              if (props.onChange) {
                props.onChange(e.currentTarget.value)
              }
            }}
            disabled={props.disabled}
            type={props.type}
            className={classNames({
              [styles.input]: true,
              [styles.inputError]: showError,
            })}
            placeholder={props.placeholder}
          />
        </div>
        <ErrorInput {...meta} />
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text',
}

