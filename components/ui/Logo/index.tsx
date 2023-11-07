import styles from './index.module.scss'
import classNames from 'classnames'


interface Props {
  color?: string
}

export default function Logo(props: Props) {
  return (
    <div className={classNames(styles.root)} style={{...(props.color ? {color: props.color} : {})}}>
      jumet
    </div>
  )
}
