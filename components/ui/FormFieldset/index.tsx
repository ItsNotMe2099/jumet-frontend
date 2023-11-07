import styles from './index.module.scss'
import {ReactElement} from 'react'

interface Props {
  title?: string
  children?: ReactElement | ReactElement[]
}

export default function FormFieldset(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.fields}>
        {props.children}
      </div>
    </div>
  )
}
