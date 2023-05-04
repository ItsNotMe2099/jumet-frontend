import styles from './index.module.scss'
import BuyerRegFillForm from './BuyerRegFillForm'

interface Props {

}


export default function BuyerRegFillPage(props: Props) {

  return (
    <div className={styles.root}>
        <BuyerRegFillForm />
    </div>
  )
}
