import { ReactElement } from 'react'
import styles from './index.module.scss'


interface Props {
  children?: React.ReactNode
  title: string
  element?: ReactElement
}

export default function MainFilterSectionLayout(props: Props) {

  return (
    <div className={styles.root}>
      {props.element}
      <div className={styles.title}>
        {props.title}
      </div>
      {props.children}
    </div>
  )
}
