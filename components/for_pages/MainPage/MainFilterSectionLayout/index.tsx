import { ReactElement } from 'react'
import styles from './index.module.scss'


interface Props {
  children?: ReactElement | ReactElement[]
  title: string
  preHeader?: ReactElement | null
}

export default function MainFilterSectionLayout(props: Props) {

  return (
    <div className={styles.root}>
      {props.preHeader}
      <div className={styles.title}>
        {props.title}
      </div>
      {props.children}
    </div>
  )
}
