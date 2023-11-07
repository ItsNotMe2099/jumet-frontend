import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'


interface Props {
  className?: string
  children?: ReactElement | ReactElement[]
}

export default function PageModal(props: Props) {
  return (
    <div className={classNames(styles.root, props.className)}>
      {props.children}
    </div>
  )
}
