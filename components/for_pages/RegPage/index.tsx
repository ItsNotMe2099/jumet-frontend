import styles from './index.module.scss'
import { useAppContext } from '@/context/state'
import RegForm from './RegForm'

interface Props {

}


export default function RegPage(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
        <RegForm />
    </div>
  )
}
