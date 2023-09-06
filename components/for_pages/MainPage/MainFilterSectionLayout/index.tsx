import { ReactElement } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'


interface Props {
  children?: ReactElement | ReactElement[]
  title: string
  preHeader?: ReactElement | null
  className?: string
}

export default function MainFilterSectionLayout(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      {props.preHeader}
      <div className={styles.title}>
        {props.title}
      </div>
      {props.children}
    </div>
  )
}
