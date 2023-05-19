import { ReactElement } from 'react'
import styles from './index.module.scss'


interface Props {
  children?: React.ReactNode
  title: string
  element?: () => ReactElement
}

export default function FilterComponent(props: Props) {

  return (
    <div className={styles.root}>
      {props.element ? props.element(): null}
      <div className={styles.title}>
        {props.title}
      </div>
      {props.children}
    </div>
  )
}
