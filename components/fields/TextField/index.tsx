import styles from './index.module.scss'
import { FieldConfig, useField } from 'formik'
import classNames from 'classnames'
import { IField } from 'types/types'
import FieldError from 'components/fields/FieldError'
import { ChangeEvent, useState } from 'react'
import { InputStyleType } from '@/types/enums'
import EyeSvg from '@/components/svg/EyeSvg'
import { colors } from '@/styles/variables'
import EyeCloseSvg from '@/components/svg/EyeCloseSvg'

interface Props extends IField<string> {
  className?: string
  onChange?: (val: string) => void
  label?: string
  isNumbersOnly?: boolean
  inputStyle?: InputStyleType
  sign?: string
  showError?: boolean
}

export default function TextField(props: Props) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props as FieldConfig)
  const showError = meta.touched && !!meta.error

  const [show, setShow] = useState<boolean>(false)

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        {props.label ? <div className={styles.label}>
          {props.label}
        </div> : null}
        <div className={styles.inputWrapper}>
          {props.sign ? <div className={styles.sign}>{props.sign}</div> : null}
          {props.inputStyle === InputStyleType.Password ?
            (show ? <EyeSvg onClick={() => setShow(false)} className={styles.icon} color={colors.grey500} />
              :
              <EyeCloseSvg onClick={() => setShow(true)} className={styles.icon} color={colors.grey500} />) : null}
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
            type={props.inputStyle === InputStyleType.Password ?
              (show ? 'text'
                :
                InputStyleType.Password) : props.type}
            className={classNames({
              [styles.input]: true,
              [styles.inputError]: showError,
            })}
            placeholder={props.placeholder}
          />
        </div>
        {props.showError && <FieldError {...meta} />}
      </div>
    </div >
  )
}

TextField.defaultProps = {
  type: 'text',
  showError: true
}

