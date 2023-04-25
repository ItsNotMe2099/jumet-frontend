import { LabelStyleType } from '@/types/enums'
import styles from './index.module.scss'
import classNames from 'classnames'
import { ChangeEvent } from 'react'


interface Props {
  placeholder?: string
  label?: string
  isNumbersOnly?: boolean
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  labelType?: LabelStyleType
}

export default function Input(props: Props) {
  return (
    <div className={styles.root}>
      {props.label ? <div className={classNames(styles.label, {[styles.static]: LabelStyleType.Static})}>{props.label}</div> : null}
      <input
        className={classNames(styles.input, props.className)}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onInput=
        {props.isNumbersOnly ?
          (e: ChangeEvent<HTMLInputElement>) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') } : undefined}
      />
    </div>
  )
}
