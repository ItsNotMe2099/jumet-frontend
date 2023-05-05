import { useAppContext } from '@/context/state'
import SellerRegForm from './Form'
import styles from './index.module.scss'


interface Props {

}

export default function Seller(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <SellerRegForm />
    </div>
  )
}
