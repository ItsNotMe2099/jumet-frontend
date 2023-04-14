import styles from './index.module.scss'


interface Props {
  title: string
}

export default function OrgCard(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.title}>
          {props.title}
        </div>
      </div>
    </div>
  )
}
