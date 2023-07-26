import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'

interface Props {
<<<<<<< HEAD
  children?: string
  className?: string
  showError: boolean
}

export default function FieldError(props: Props) {
  // const value = typeof props.children === 'string' ? props.children : isArray(props.children) ? props.children.filter(i => !!i)[0]['name'] : null : props.children

  if (props.showError && props.children) {
    return (
      <div className={classNames(styles.root, props.className)}>
        <div className={styles.text}>{props.children}</div>
      </div>
    )
=======
  showError?: boolean,
  className?: string
  children?: ReactElement | string | undefined
}

export default function FieldError(props: Props) {
  const { showError } = props
  if(showError) {
    return (<div className={classNames(styles.root, props.className)}>{props.children}</div>)
  }else{
    return (<></>)
>>>>>>> d41916a (start refactor profile)
  }
  return null
}

