import styles from './index.module.scss'
import RegForm from './RegForm'

interface Props {

}


export default function RegPage(props: Props) {

  return (
    <div className={styles.root}>
        <RegForm />
    </div>
  )
}
