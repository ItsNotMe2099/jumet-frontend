import { ReactElement } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  icon: ReactElement
  text: string
  className?: string
}

export default function Item(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        {props.icon}
        <p>{props.text}</p>
      </div>
    </div>
  )
}
