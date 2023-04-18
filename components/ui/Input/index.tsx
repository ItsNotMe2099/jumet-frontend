import styles from './index.module.scss'
import classNames from 'classnames'
import { ChangeEvent } from 'react'


interface Props {
  placeholder?: string
  label?: string
  isNumbersOnly?: boolean
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input(props: Props) {
  return (
    <div className={styles.root}>
      <input
        className={classNames(styles.input, props.className)}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onInput=
        {props.isNumbersOnly ? 
          (e: ChangeEvent<HTMLInputElement>) => 
          { e.target.value = e.target.value.replace(/[^0-9]/g, '') } : undefined}
      />
      {props.label ? <div className={styles.label}>{props.label}</div> : null}
    </div>
  )
}
