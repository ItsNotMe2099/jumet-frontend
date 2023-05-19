import styles from './index.module.scss'

export type FormErrorValue = string[] | string | null
interface Props {
  error?: FormErrorValue
}
export default function FormError({ error }: Props) {
  if (!error) {
    return <></>
  }
  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {Array.isArray(error)
          ? error.map((error, index) => <div className={styles.item} key={index}>{error}</div>)
          : error}
      </div>


    </div>
  )
}
