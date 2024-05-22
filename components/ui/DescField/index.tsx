import styles from './index.module.scss'
import {ReactElement} from 'react'
import classNames from 'classnames'

interface Props{
  label: string
  value?: string | null | undefined | ReactElement
  type?: 'row' | 'column' | undefined

}

export default function DescField(props: Props) {
  return  (<div className={classNames(styles.root, styles[props.type ?? 'column'])}>
    <div className={styles.label}>
      {props.label}
    </div>
    <div className={styles.value}>
      {props.value}
    </div>
  </div>)
}
