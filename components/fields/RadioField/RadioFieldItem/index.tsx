import styles from './index.module.scss'
import classNames from 'classnames'
import { RadioStyleType } from 'types/types'
import { ReactElement } from 'react'

interface Props<T> {
  value: T,
  isActive: boolean
  label?: string,
  className?: string
  disabled?: boolean
  description?: string
  children?: ReactElement | ReactElement[]
  onChange: (val: T) => void
  styleType: RadioStyleType

}
export default function RadioFieldItem<T>(props: Props<T>) {

  const handleClick = () => {
    if (props.disabled) {
      return
    }
    props.onChange(props.value)
  }
  return (
    <div className={classNames(styles.root, {
      [styles.styleTiles]: props.styleType === 'tile',
      [styles.active]: props.isActive,
      [styles.disabled]: props.disabled,
    }, props.className)} onClick={handleClick}>
      <div className={classNames(styles.radio, { [styles.active]: props.isActive })} />
      <div className={styles.infoWrapper}>
        {props.children ? props.children : <div className={styles.label}>{props.label}</div>}
        {props.description && <div className={styles.description}>{props.description}</div>}
      </div>

    </div>
  )
}
