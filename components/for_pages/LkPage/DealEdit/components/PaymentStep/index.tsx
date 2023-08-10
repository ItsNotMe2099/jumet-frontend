import WeighningResultCard from '../DeliveryStep/WeighingtResultCard'
import ReceiptCard from './ReceiptCard'
import ReviewCard from './ReviewCard'
import styles from './index.module.scss'



interface Props {
  id: number
}

export default function PaymentStep(props: Props) {

  return (
    <div className={styles.root}>
      <ReceiptCard />
      <ReviewCard />
      <WeighningResultCard id={props.id as number} />
    </div>
  )
}
