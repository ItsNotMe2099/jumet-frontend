import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'


interface Props {
  title?: string
  text?: string
  actions: ReactElement | ReactElement[]

}

export default function EmptyStub(props: Props) {
  return (
    <div className={classNames(styles.root)}>
      {props.title && <div className={styles.title}>{props.title}</div>}
      {props.text && <div className={styles.text}>{props.text}</div>}

      {props.actions && <div className={styles.actions}>{props.actions}</div>}
    </div>
  )
}
