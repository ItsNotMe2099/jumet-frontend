import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  children: string
  className?: string
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

export default function Heading(props: Props) {

  return (
      <div className={classNames([styles.root, props.className])}>{props.children}</div>
  )
}

