import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  error?: any,
  touched?: boolean,
  className?: string
}

export default function ErrorInput(props: Props) {
  const { error, touched } = props
  if(touched && !!error) {
    return (<div className={classNames(styles.root, props.className)}>{error}</div>)
  }else{
    return (<></>)
  }
}
