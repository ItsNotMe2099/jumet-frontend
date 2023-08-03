import styles from './index.module.scss'
import {ReactElement} from 'react'

interface Props{
  label: string
  value?: string | null | undefined | ReactElement

}

export default function DescField(props: Props) {
  return  (<div className={styles.root}>
    <div className={styles.label}>
      {props.label}
    </div>
    <div className={styles.value}>
      {props.value}
    </div>
  </div>)
}
