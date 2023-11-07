import styles from './index.module.scss'


interface Props {
  children?: React.ReactNode

}


export default function CenterLayout(props: Props) {
  return (
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {props.children}
          </div>
        </div>
    </div>
  )
}

