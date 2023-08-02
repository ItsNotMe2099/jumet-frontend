import styles from './index.module.scss'

interface Props{
  label: string
  value?: string | null | undefined
}

export default function DescField(props: Props) {
  return  (<div className={styles.root}>
    <div className={styles.label}>
      {props.label}
    </div>
    <div className={styles.value}>
      {props.value}
    </div>
  </div>)
}
