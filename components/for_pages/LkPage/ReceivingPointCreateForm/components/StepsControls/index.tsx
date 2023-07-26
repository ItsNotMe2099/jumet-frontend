import Button from '@/components/ui/Button'
import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/StepsControls/index.module.scss'


interface Props {
  onBack?: () => void
}

export default function StepsControls(props: Props) {

  return (
    <div className={styles.root}>
      {props.onBack ? <Button onClick={props.onBack} type='button' className={styles.prev} styleType='large' color='grey'>
        Назад
      </Button> : null}
      <Button type='submit' className={styles.next} styleType='large' color='blue'>
        Далее
      </Button>
    </div>
  )
}
